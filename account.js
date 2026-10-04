/* Muheva — favourites + customer login
   Favourites are saved in the visitor's own browser (localStorage).
   Login uses Firebase Authentication; see firebase-config.js. */
(function () {
  'use strict';

  var GUEST_KEY = 'muheva_favs_guest';
  var currentUser = null;      // { uid, name, email } when logged in
  var auth = null;             // Firebase auth object once loaded
  var authState = 'off';       // 'off' (not configured) | 'loading' | 'ready' | 'failed'
  var readyQueue = [];         // callbacks waiting for authState to settle
  var mode = 'login';          // popup mode: 'login' | 'signup'

  /* ---------- favourites storage ---------- */

  function storageKey() {
    return currentUser ? 'muheva_favs_' + currentUser.uid : GUEST_KEY;
  }
  function readList(key) {
    try {
      var v = JSON.parse(localStorage.getItem(key) || '[]');
      return Array.isArray(v) ? v : [];
    } catch (e) { return []; }
  }
  function writeList(key, list) {
    try { localStorage.setItem(key, JSON.stringify(list)); } catch (e) { /* private mode etc. */ }
  }
  function getFavs() {
    var list = readList(storageKey());
    if (typeof PRODUCTS === 'undefined') return list;
    return list.filter(function (k) { return PRODUCTS[k]; });
  }
  function has(id) { return getFavs().indexOf(id) !== -1; }
  function toggle(id) {
    var list = readList(storageKey());
    var i = list.indexOf(id);
    if (i === -1) list.push(id); else list.splice(i, 1);
    writeList(storageKey(), list);
    refreshUI();
    return i === -1;
  }
  function mergeGuestIntoUser(uid) {
    var guest = readList(GUEST_KEY);
    if (!guest.length) return;
    var key = 'muheva_favs_' + uid;
    var mine = readList(key);
    guest.forEach(function (k) { if (mine.indexOf(k) === -1) mine.push(k); });
    writeList(key, mine);
    writeList(GUEST_KEY, []);
  }

  /* ---------- favourites UI ---------- */

  function idFromHref(href) {
    var m = /[?&]id=([^&#]+)/.exec(href || '');
    return m ? decodeURIComponent(m[1]) : null;
  }

  function cardHtml(key) {
    var p = PRODUCTS[key];
    var img = (p.images && p.images[0]) || p.image || '';
    var tag = p.tag ? '<span class="product-tag">' + p.tag + '</span>' : '';
    var strike = p.oldPrice ? '<span class="strike">' + p.oldPrice + '</span>' : '';
    return '<a class="product-card" href="product.html?id=' + encodeURIComponent(key) + '">' +
             '<div class="product-thumb">' + tag + '<img src="' + img + '" alt="' + p.name + '"></div>' +
             '<div class="product-name">' + p.name + '</div>' +
             '<div class="product-price">' + strike + p.price + '</div>' +
           '</a>';
  }

  function decorateCards() {
    var cards = document.querySelectorAll('.product-card');
    cards.forEach(function (card) {
      var thumb = card.querySelector('.product-thumb');
      if (!thumb || thumb.querySelector('.fav-btn')) return;
      var id = idFromHref(card.getAttribute('href'));
      if (!id) return;
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'fav-btn';
      btn.setAttribute('data-id', id);
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        toggle(id);
      });
      thumb.appendChild(btn);
    });
  }

  function renderFavPage() {
    var grid = document.getElementById('favGrid');
    var empty = document.getElementById('favEmpty');
    if (!grid || typeof PRODUCTS === 'undefined') return;
    var favs = getFavs();
    grid.innerHTML = favs.map(cardHtml).join('');
    if (empty) empty.style.display = favs.length ? 'none' : 'block';
    decorateCards();
  }

  function syncButtons() {
    var favs = getFavs();
    document.querySelectorAll('.fav-btn').forEach(function (b) {
      var on = favs.indexOf(b.getAttribute('data-id')) !== -1;
      b.classList.toggle('active', on);
      b.textContent = on ? '\u2665' : '\u2661';
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
      b.setAttribute('aria-label', on ? 'Remove from favourites' : 'Add to favourites');
    });
    var badge = document.getElementById('favCount');
    if (badge) {
      badge.textContent = favs.length ? String(favs.length) : '';
      badge.style.display = favs.length ? 'inline-flex' : 'none';
    }
    var d = document.getElementById('detailFavBtn');
    if (d) {
      var isOn = favs.indexOf(d.getAttribute('data-id')) !== -1;
      d.classList.toggle('active', isOn);
      d.textContent = isOn ? '\u2665 Saved to favourites' : '\u2661 Add to favourites';
      d.setAttribute('aria-pressed', isOn ? 'true' : 'false');
    }
  }

  function refreshUI() {
    renderFavPage();   // only does anything on favourites.html
    decorateCards();
    syncButtons();
  }

  function addDetailButton() {
    if (typeof PRODUCTS === 'undefined') return;
    var priceEl = document.querySelector('.product-detail-price');
    if (!priceEl || document.getElementById('detailFavBtn')) return;
    var raw = new URLSearchParams(window.location.search).get('id') || '';
    var target = raw.trim().toLowerCase();
    var key = Object.keys(PRODUCTS).filter(function (k) { return k.toLowerCase() === target; })[0];
    if (!key) return;
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.id = 'detailFavBtn';
    btn.className = 'fav-detail-btn';
    btn.setAttribute('data-id', key);
    btn.addEventListener('click', function () { toggle(key); });
    priceEl.parentNode.insertBefore(btn, priceEl.nextSibling);
  }

  /* ---------- login: helpers ---------- */

  var ERRORS = {
    'auth/invalid-email': 'That email address doesn\u2019t look right.',
    'auth/missing-password': 'Please enter your password.',
    'auth/invalid-credential': 'Email or password is incorrect.',
    'auth/wrong-password': 'Email or password is incorrect.',
    'auth/user-not-found': 'Email or password is incorrect.',
    'auth/email-already-in-use': 'An account with this email already exists. Try logging in.',
    'auth/weak-password': 'Please choose a password with at least 6 characters.',
    'auth/too-many-requests': 'Too many attempts. Please wait a few minutes and try again.',
    'auth/network-request-failed': 'Network problem. Please check your connection and try again.',
    'auth/popup-closed-by-user': 'The Google window was closed before finishing.',
    'auth/cancelled-popup-request': 'The Google window was closed before finishing.',
    'auth/popup-blocked': 'Your browser blocked the Google window. Please allow pop-ups and try again.',
    'auth/unauthorized-domain': 'This website address has not been approved for login yet.',
    'auth/operation-not-allowed': 'This sign-in method has not been switched on yet.'
  };

  function isConfigured() {
    var c = window.MUHEVA_FIREBASE_CONFIG;
    return !!(c && c.apiKey && c.projectId && c.apiKey.indexOf('PASTE') === -1 && c.projectId.indexOf('PASTE') === -1);
  }

  function loadScript(src, done, fail) {
    var s = document.createElement('script');
    s.src = src;
    s.onload = done;
    s.onerror = fail;
    document.head.appendChild(s);
  }

  function flushReadyQueue() {
    var q = readyQueue;
    readyQueue = [];
    q.forEach(function (cb) { cb(authState, auth); });
  }

  function onAuthReady(cb) {
    if (authState === 'ready' || authState === 'failed' || authState === 'off') {
      cb(authState, auth);
    } else {
      readyQueue.push(cb);
    }
  }

  function initAuth() {
    if (!isConfigured()) { authState = 'off'; flushReadyQueue(); return; }
    authState = 'loading';
    var base = 'https://www.gstatic.com/firebasejs/10.12.2/';
    function fail() { authState = 'failed'; flushReadyQueue(); }
    loadScript(base + 'firebase-app-compat.js', function () {
      loadScript(base + 'firebase-auth-compat.js', function () {
        try {
          firebase.initializeApp(window.MUHEVA_FIREBASE_CONFIG);
          auth = firebase.auth();
          authState = 'ready';
          auth.onAuthStateChanged(onUser);
          flushReadyQueue();
        } catch (e) { fail(); }
      }, fail);
    }, fail);
  }

  function onUser(user) {
    currentUser = user ? { uid: user.uid, name: user.displayName || '', email: user.email || '' } : null;
    if (currentUser) mergeGuestIntoUser(currentUser.uid);
    renderAccount();
    refreshUI();
  }

  /* ---------- login: UI ---------- */

  function el(id) { return document.getElementById(id); }

  function buildModal() {
    if (el('authModal')) return;
    var wrap = document.createElement('div');
    wrap.innerHTML =
      '<div class="auth-overlay" id="authOverlay"></div>' +
      '<div class="auth-modal" id="authModal" role="dialog" aria-modal="true" aria-labelledby="authTitle">' +
        '<button type="button" class="auth-close" id="authClose" aria-label="Close">&times;</button>' +
        '<h3 id="authTitle">Welcome back</h3>' +
        '<div class="auth-tabs">' +
          '<button type="button" class="auth-tab active" data-mode="login">Log in</button>' +
          '<button type="button" class="auth-tab" data-mode="signup">Sign up</button>' +
        '</div>' +
        '<div class="auth-msg" id="authMsg" role="status"></div>' +
        '<div class="auth-field" id="authNameWrap" style="display:none;"><label for="authName">Name</label>' +
          '<input id="authName" type="text" autocomplete="name"></div>' +
        '<div class="auth-field"><label for="authEmail">Email</label>' +
          '<input id="authEmail" type="email" autocomplete="email"></div>' +
        '<div class="auth-field"><label for="authPassword">Password</label>' +
          '<input id="authPassword" type="password" autocomplete="current-password"></div>' +
        '<button type="button" class="auth-submit" id="authSubmit">Log in</button>' +
        '<button type="button" class="auth-link" id="authForgot">Forgot password?</button>' +
        '<div class="auth-divider"><span>or</span></div>' +
        '<button type="button" class="auth-google" id="authGoogle">Continue with Google</button>' +
      '</div>';
    while (wrap.firstChild) document.body.appendChild(wrap.firstChild);

    el('authClose').addEventListener('click', closeModal);
    el('authOverlay').addEventListener('click', closeModal);
    el('authSubmit').addEventListener('click', submit);
    el('authForgot').addEventListener('click', forgot);
    el('authGoogle').addEventListener('click', google);
    document.querySelectorAll('.auth-tab').forEach(function (t) {
      t.addEventListener('click', function () { setMode(t.getAttribute('data-mode')); });
    });
    ['authName', 'authEmail', 'authPassword'].forEach(function (id) {
      el(id).addEventListener('keydown', function (e) { if (e.key === 'Enter') submit(); });
    });
  }

  function setMode(m) {
    mode = m;
    var signup = m === 'signup';
    el('authTitle').textContent = signup ? 'Create your account' : 'Welcome back';
    el('authSubmit').textContent = signup ? 'Create account' : 'Log in';
    el('authNameWrap').style.display = signup ? 'block' : 'none';
    el('authForgot').style.display = signup ? 'none' : 'block';
    el('authPassword').setAttribute('autocomplete', signup ? 'new-password' : 'current-password');
    document.querySelectorAll('.auth-tab').forEach(function (t) {
      t.classList.toggle('active', t.getAttribute('data-mode') === m);
    });
    showMsg('', '');
    showAvailability();
  }

  function showMsg(text, kind) {
    var m = el('authMsg');
    if (!m) return;
    m.textContent = text;
    m.className = 'auth-msg' + (text ? ' show ' + (kind || 'error') : '');
  }

  function showAvailability() {
    if (authState === 'off') {
      showMsg('Login is not switched on for this website yet. Please check back soon.', 'info');
    } else if (authState === 'failed') {
      showMsg('Login could not load. Please check your connection and refresh the page.', 'error');
    } else if (authState === 'loading') {
      showMsg('Login is still loading\u2026 please try again in a moment.', 'info');
    }
  }

  function ready() {
    if (authState === 'ready' && auth) return true;
    showAvailability();
    return false;
  }

  function openModal() {
    buildModal();
    setMode('login');
    el('authOverlay').classList.add('open');
    el('authModal').classList.add('open');
    document.body.style.overflow = 'hidden';
    el('authEmail').focus();
  }
  function closeModal() {
    if (!el('authModal')) return;
    el('authOverlay').classList.remove('open');
    el('authModal').classList.remove('open');
    document.body.style.overflow = '';
    el('authPassword').value = '';
  }

  function showError(e) {
    var code = e && e.code;
    showMsg(ERRORS[code] || 'Something went wrong. Please try again.', 'error');
  }

  function setBusy(b) {
    ['authSubmit', 'authGoogle', 'authForgot'].forEach(function (id) { el(id).disabled = b; });
  }

  function submit() {
    if (!ready()) return;
    var email = el('authEmail').value.trim();
    var pass = el('authPassword').value;
    var name = el('authName').value.trim();
    if (!email || !pass) { showMsg('Please enter your email and password.', 'error'); return; }
    if (mode === 'signup' && pass.length < 6) { showMsg(ERRORS['auth/weak-password'], 'error'); return; }
    showMsg('', '');
    setBusy(true);
    var p = mode === 'signup'
      ? auth.createUserWithEmailAndPassword(email, pass).then(function (cred) {
          return name ? cred.user.updateProfile({ displayName: name }) : null;
        })
      : auth.signInWithEmailAndPassword(email, pass);
    p.then(function () {
      if (currentUser && auth.currentUser) currentUser.name = auth.currentUser.displayName || '';
      renderAccount();
      closeModal();
    }).catch(showError).then(function () { setBusy(false); });
  }

  function forgot() {
    if (!ready()) return;
    var email = el('authEmail').value.trim();
    if (!email) { showMsg('Type your email above first, then tap "Forgot password?".', 'error'); return; }
    setBusy(true);
    auth.sendPasswordResetEmail(email).then(function () {
      showMsg('If that email has an account, a password reset link is on its way. Check your spam folder too.', 'success');
    }).catch(showError).then(function () { setBusy(false); });
  }

  function google() {
    if (!ready()) return;
    setBusy(true);
    auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(closeModal)
      .catch(showError)
      .then(function () { setBusy(false); });
  }

  /* ---------- header account button + menu ---------- */

  function renderAccount() {
    var btn = el('accountBtn');
    var menu = el('accountMenu');
    if (!btn || !menu) return;
    menu.innerHTML = '';
    menu.classList.remove('open');
    if (currentUser) {
      var label = currentUser.name || currentUser.email || 'Account';
      btn.textContent = label.charAt(0).toUpperCase();
      btn.classList.add('signed-in');
      btn.setAttribute('aria-label', 'Account menu');

      var who = document.createElement('div');
      who.className = 'account-who';
      who.textContent = currentUser.name || currentUser.email;
      menu.appendChild(who);
      if (currentUser.name && currentUser.email) {
        var mail = document.createElement('div');
        mail.className = 'account-mail';
        mail.textContent = currentUser.email;
        menu.appendChild(mail);
      }
      var fav = document.createElement('a');
      fav.href = 'favourites.html';
      fav.textContent = 'My favourites';
      menu.appendChild(fav);
      var out = document.createElement('button');
      out.type = 'button';
      out.textContent = 'Log out';
      out.addEventListener('click', function () { if (auth) auth.signOut(); });
      menu.appendChild(out);
    } else {
      btn.textContent = '\uD83D\uDC64';
      btn.classList.remove('signed-in');
      btn.setAttribute('aria-label', 'Log in or sign up');
    }
  }

  function onAccountClick() {
    if (currentUser) {
      el('accountMenu').classList.toggle('open');
    } else {
      openModal();
    }
  }

  /* ---------- start ---------- */

  document.addEventListener('DOMContentLoaded', function () {
    addDetailButton();
    refreshUI();
    renderAccount();

    var accountBtn = el('accountBtn');
    if (accountBtn) accountBtn.addEventListener('click', onAccountClick);

    document.addEventListener('click', function (e) {
      var menu = el('accountMenu');
      var wrap = accountBtn && accountBtn.parentNode;
      if (menu && wrap && !wrap.contains(e.target)) menu.classList.remove('open');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closeModal();
        var menu = el('accountMenu');
        if (menu) menu.classList.remove('open');
      }
    });

    initAuth();
  });

  // small hook so the logic can be tested without a browser
  window.MuhevaAccount = {
    getFavs: getFavs, has: has, toggle: toggle, cardHtml: cardHtml, _onUser: onUser,
    getAuth: function () { return auth; },
    getAuthState: function () { return authState; },
    getCurrentUser: function () { return currentUser; },
    onAuthReady: onAuthReady
  };
})();
