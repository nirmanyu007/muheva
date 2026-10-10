/* Muheva — order popup flow
   Runs before "Order on WhatsApp" / "Order on Instagram":
     Step 1 (only if no size picked yet): choose a size
     Step 2: delivery details
   Delivery details are saved in the visitor's own browser so they
   don't have to retype them next time they order. */
(function () {
  'use strict';

  var built = false;
  var state = null;           // set fresh each time start() is called

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
            '</div>' +
          '</div>' +

          '<div class="order-field"><label for="ofAddress">Address</label>' +
            '<textarea id="ofAddress" rows="3" autocomplete="street-address"></textarea></div>' +

          '<div class="order-field order-field-small"><label for="ofPincode">Pincode</label>' +
            '<input id="ofPincode" type="text" inputmode="numeric" maxlength="6" autocomplete="postal-code"></div>' +

          '<button type="button" class="order-continue-btn" id="ofContinue">Continue to order</button>' +
        '</div>' +
      '</div>';
    while (wrap.firstChild) document.body.appendChild(wrap.firstChild);

    el('orderFlowClose').addEventListener('click', close);
    el('orderFlowOverlay').addEventListener('click', close);
    el('ofContinue').addEventListener('click', submitDetails);
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

  /* ---------- step 2: delivery details ---------- */

  function renderDetailsStep() {
    var p = loadProfile();
    el('ofName').value = p.name || '';
    el('ofEmail').value = p.email || '';
    el('ofPhone').value = p.phone || '';
    el('ofAddress').value = p.address || '';
    el('ofPincode').value = p.pincode || '';
    showMsg('', '');
  }

  function showMsg(text, kind) {
    var m = el('orderMsg');
    m.textContent = text;
    m.className = 'order-msg' + (text ? ' show ' + (kind || 'error') : '');
  }

  function tenDigitPhone() {
    return el('ofPhone').value.replace(/\D/g, '');
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

    var details = {
      name: name, email: email, phone: phone, address: address, pincode: pincode,
      phoneVerified: false, size: state.size
    };
    saveProfile(details);
    var onDone = state.onDone;
    close();
    onDone(details);
  }

  /* ---------- public entry point ---------- */

  function start(product, preselectedSize, onDone) {
    build();
    state = { product: product, size: preselectedSize || null, onDone: onDone, phoneVerified: false };
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
