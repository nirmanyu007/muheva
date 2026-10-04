/* Muheva — order popup flow
   Runs before "Order on WhatsApp" / "Order on Instagram":
     Step 1 (only if no size picked yet): choose a size
     Step 2: delivery details + phone verification
   Delivery details are saved in the visitor's own browser so they
   don't have to retype them next time they order. */
(function () {
  'use strict';

  var built = false;
  var state = null;           // set fresh each time start() is called
  var recaptcha = null;       // created once, reused

  /* ---------- saved delivery details ---------- */

  function profileKey() {
    var acc = window.MuhevaAccount;
    var user = acc && acc.getCurrentUser && acc.getCurrentUser();
    return 'muheva_profile_' + (user ? user.uid : 'guest');
  }
  function loadProfile() {
    try {
      var v = JSON.parse(localStorage.getItem(profileKey()) || '{}');
      return (v && typeof v === 'object') ? v : {};
    } catch (e) { return {}; }
  }
  function saveProfile(p) {
    try { localStorage.setItem(profileKey(), JSON.stringify(p)); } catch (e) { /* private mode etc. */ }
  }

  /* ---------- building the modal (once) ---------- */

  function el(id) { return document.getElementById(id); }

  function build() {
    if (built) return;
    built = true;
    var wrap = document.createElement('div');
    wrap.innerHTML =
      '<div class="order-overlay" id="orderFlowOverlay"></div>' +
      '<div class="order-modal" id="orderFlowModal" role="dialog" aria-modal="true">' +
        '<button type="button" class="order-flow-close" id="orderFlowClose" aria-label="Close">&times;</button>' +

        '<div class="order-step" id="orderStepSize">' +
          '<h3>Select a size</h3>' +
          '<p class="order-step-sub" id="orderSizeProductName"></p>' +
          '<div class="order-size-options" id="orderSizeOptions"></div>' +
        '</div>' +

        '<div class="order-step" id="orderStepDetails">' +
          '<h3>Delivery details</h3>' +
          '<p class="order-step-sub">So we can confirm sizing and get this to the right address.</p>' +
          '<div class="order-msg" id="orderMsg" role="status"></div>' +

          '<div class="order-field"><label for="ofName">Full name</label>' +
            '<input id="ofName" type="text" autocomplete="name"></div>' +

          '<div class="order-field"><label for="ofEmail">Email</label>' +
            '<input id="ofEmail" type="email" autocomplete="email"></div>' +

          '<div class="order-field"><label for="ofPhone">Phone number</label>' +
            '<div class="order-phone-row">' +
              '<span class="order-phone-prefix">+91</span>' +
              '<input id="ofPhone" type="tel" inputmode="numeric" maxlength="10" autocomplete="tel-national">' +
              '<button type="button" class="order-verify-btn" id="ofSendOtp">Verify</button>' +
            '</div>' +
            '<div class="order-otp-row" id="ofOtpRow" style="display:none;">' +
              '<input id="ofOtp" type="text" inputmode="numeric" maxlength="6" placeholder="6-digit code">' +
              '<button type="button" class="order-verify-btn" id="ofCheckOtp">Confirm</button>' +
            '</div>' +
            '<div class="order-phone-status" id="ofPhoneStatus"></div>' +
          '</div>' +

          '<div class="order-field"><label for="ofAddress">Address</label>' +
            '<textarea id="ofAddress" rows="3" autocomplete="street-address"></textarea></div>' +

          '<div class="order-field order-field-small"><label for="ofPincode">Pincode</label>' +
            '<input id="ofPincode" type="text" inputmode="numeric" maxlength="6" autocomplete="postal-code"></div>' +

          '<button type="button" class="order-continue-btn" id="ofContinue">Continue to order</button>' +
          '<div id="recaptcha-container"></div>' +
        '</div>' +
      '</div>';
    while (wrap.firstChild) document.body.appendChild(wrap.firstChild);

    el('orderFlowClose').addEventListener('click', close);
    el('orderFlowOverlay').addEventListener('click', close);
    el('ofSendOtp').addEventListener('click', sendOtp);
    el('ofCheckOtp').addEventListener('click', checkOtp);
    el('ofContinue').addEventListener('click', submitDetails);
    el('ofPhone').addEventListener('input', function () {
      // phone number changed after verifying -> verification no longer applies
      if (state) state.phoneVerified = false;
      renderPhoneStatus();
    });
  }

  function open(step) {
    el('orderFlowOverlay').classList.add('open');
    el('orderFlowModal').classList.add('open');
    document.body.style.overflow = 'hidden';
    showStep(step);
  }
  function close() {
    if (!el('orderFlowModal')) return;
    el('orderFlowOverlay').classList.remove('open');
    el('orderFlowModal').classList.remove('open');
    document.body.style.overflow = '';
    state = null;
  }
  function showStep(step) {
    el('orderStepSize').classList.toggle('active', step === 'size');
    el('orderStepDetails').classList.toggle('active', step === 'details');
  }

  /* ---------- step 1: size ---------- */

  function renderSizeStep() {
    el('orderSizeProductName').textContent = state.product.name + ' \u2014 ' + state.product.price;
    var box = el('orderSizeOptions');
    box.innerHTML = '';
    state.product.size.forEach(function (s) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'size-btn';
      b.textContent = s;
      b.addEventListener('click', function () {
        state.size = s;
        goToDetails();
      });
      box.appendChild(b);
    });
  }

  function goToDetails() {
    renderDetailsStep();
    showStep('details');
  }

  /* ---------- step 2: delivery details + phone verification ---------- */

  function renderDetailsStep() {
    var p = loadProfile();
    el('ofName').value = p.name || '';
    el('ofEmail').value = p.email || '';
    el('ofPhone').value = p.phone || '';
    el('ofAddress').value = p.address || '';
    el('ofPincode').value = p.pincode || '';
    state.phoneVerified = !!(p.phone && p.phoneVerified && p.phone === el('ofPhone').value);
    el('ofOtpRow').style.display = 'none';
    el('ofOtp').value = '';
    showMsg('', '');
    renderPhoneStatus();

    var acc = window.MuhevaAccount;
    if (acc && acc.onAuthReady) {
      acc.onAuthReady(function (authState) {
        if (authState === 'off') {
          showMsg('Phone verification isn\u2019t switched on for this site yet \u2014 you can still place your order without it.', 'info');
        } else if (authState === 'failed') {
          showMsg('Phone verification couldn\u2019t load. You can still place your order without it.', 'info');
        }
      });
    }
  }

  function renderPhoneStatus() {
    var statusEl = el('ofPhoneStatus');
    if (!statusEl) return;
    statusEl.textContent = state.phoneVerified ? '\u2713 Phone verified' : '';
    statusEl.className = 'order-phone-status' + (state.phoneVerified ? ' verified' : '');
  }

  function showMsg(text, kind) {
    var m = el('orderMsg');
    m.textContent = text;
    m.className = 'order-msg' + (text ? ' show ' + (kind || 'error') : '');
  }

  function setBusy(b) {
    ['ofSendOtp', 'ofCheckOtp', 'ofContinue'].forEach(function (id) { el(id).disabled = b; });
  }

  function tenDigitPhone() {
    return el('ofPhone').value.replace(/\D/g, '');
  }

  var OTP_ERRORS = {
    'auth/invalid-phone-number': 'That doesn\u2019t look like a valid 10-digit number.',
    'auth/too-many-requests': 'Too many attempts. Please wait a while and try again.',
    'auth/invalid-verification-code': 'That code doesn\u2019t match. Please check and try again.',
    'auth/code-expired': 'That code expired. Please request a new one.',
    'auth/provider-already-linked': null, // treated as already-verified, not an error
    'auth/network-request-failed': 'Network problem. Please check your connection and try again.'
  };

  function sendOtp() {
    var acc = window.MuhevaAccount;
    var authState = acc && acc.getAuthState && acc.getAuthState();
    var auth = acc && acc.getAuth && acc.getAuth();
    if (authState !== 'ready' || !auth) {
      showMsg('Phone verification isn\u2019t switched on for this site yet \u2014 you can still place your order without it.', 'info');
      return;
    }
    var digits = tenDigitPhone();
    if (digits.length !== 10) {
      showMsg('Please enter a 10-digit phone number.', 'error');
      return;
    }
    showMsg('', '');
    setBusy(true);
    try {
      if (!recaptcha) {
        recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha-container', { size: 'invisible' }, auth);
      }
      var phone = '+91' + digits;
      var starter = auth.currentUser
        ? function () { return auth.currentUser.linkWithPhoneNumber(phone, recaptcha); }
        : function () { return auth.signInWithPhoneNumber(phone, recaptcha); };
      starter().then(function (confirmationResult) {
        state.confirmationResult = confirmationResult;
        el('ofOtpRow').style.display = 'flex';
        showMsg('We sent a 6-digit code to +91 ' + digits + '.', 'success');
      }).catch(function (e) {
        if (e && e.code === 'auth/provider-already-linked') {
          state.phoneVerified = true;
          renderPhoneStatus();
          showMsg('This phone number is already verified on your account.', 'success');
        } else {
          showMsg((OTP_ERRORS[e && e.code]) || 'Couldn\u2019t send the code. Please try again.', 'error');
        }
      }).then(function () { setBusy(false); });
    } catch (e) {
      setBusy(false);
      showMsg('Couldn\u2019t start phone verification. Please try again.', 'error');
    }
  }

  function checkOtp() {
    if (!state.confirmationResult) return;
    var code = el('ofOtp').value.trim();
    if (!code) { showMsg('Please enter the 6-digit code.', 'error'); return; }
    showMsg('', '');
    setBusy(true);
    state.confirmationResult.confirm(code).then(function () {
      state.phoneVerified = true;
      el('ofOtpRow').style.display = 'none';
      renderPhoneStatus();
      showMsg('Phone verified.', 'success');
    }).catch(function (e) {
      showMsg((OTP_ERRORS[e && e.code]) || 'Couldn\u2019t verify that code. Please try again.', 'error');
    }).then(function () { setBusy(false); });
  }

  function submitDetails() {
    var name = el('ofName').value.trim();
    var email = el('ofEmail').value.trim();
    var phone = tenDigitPhone();
    var address = el('ofAddress').value.trim();
    var pincode = el('ofPincode').value.trim();

    if (!name || !email || phone.length !== 10 || !address || !/^\d{6}$/.test(pincode)) {
      showMsg('Please fill in your name, email, a 10-digit phone number, address and 6-digit pincode.', 'error');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showMsg('Please enter a valid email address.', 'error');
      return;
    }
    var acc = window.MuhevaAccount;
    var authState = acc && acc.getAuthState && acc.getAuthState();
    if (authState === 'ready' && !state.phoneVerified) {
      showMsg('Please verify your phone number before continuing.', 'error');
      return;
    }

    var details = {
      name: name, email: email, phone: phone, address: address, pincode: pincode,
      phoneVerified: !!state.phoneVerified, size: state.size
    };
    saveProfile(details);
    var onDone = state.onDone;
    close();
    onDone(details);
  }

  /* ---------- public entry point ---------- */

  function start(product, preselectedSize, onDone) {
    build();
    state = { product: product, size: preselectedSize || null, onDone: onDone, confirmationResult: null, phoneVerified: false };
    if (product.size && product.size.length && !state.size) {
      renderSizeStep();
      open('size');
    } else {
      goToDetails();
      open('details');
    }
  }

  window.MuhevaCheckout = { start: start };
})();
