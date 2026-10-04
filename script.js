document.addEventListener('DOMContentLoaded', function () {
  var hamburgerBtn = document.getElementById('hamburgerBtn');
  var drawer = document.getElementById('sideDrawer');
  var overlay = document.getElementById('drawerOverlay');
  var closeBtn = document.getElementById('drawerClose');

  function openDrawer() {
    drawer.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (hamburgerBtn) hamburgerBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (overlay) overlay.addEventListener('click', closeDrawer);
});

document.addEventListener('DOMContentLoaded', function () {
  if (typeof PRODUCTS === 'undefined') return;

  var input = document.getElementById('siteSearchInput');
  var results = document.getElementById('siteSearchResults');
  var wrap = document.getElementById('siteSearch');
  if (!input || !results) return;

  function runSearch() {
    var q = input.value.trim().toLowerCase();
    if (!q) { results.classList.remove('open'); results.innerHTML = ''; return; }

    var matches = Object.keys(PRODUCTS)
      .filter(function (key) {
        var p = PRODUCTS[key];
        return p.name.toLowerCase().indexOf(q) !== -1 ||
               p.category.toLowerCase().indexOf(q) !== -1;
      })
      .slice(0, 6);

    if (matches.length === 0) {
      results.innerHTML = '<div class="no-results">No products found</div>';
    } else {
      results.innerHTML = matches.map(function (key) {
        var p = PRODUCTS[key];
        return '<a href="product.html?id=' + key + '">' +
                 '<span>' + p.name + '</span><span>' + p.price + '</span>' +
               '</a>';
      }).join('');
    }
    results.classList.add('open');
  }

  input.addEventListener('input', runSearch);
  input.addEventListener('focus', runSearch);

  document.addEventListener('click', function (e) {
    if (wrap && !wrap.contains(e.target)) {
      results.classList.remove('open');
    }
  });
});
