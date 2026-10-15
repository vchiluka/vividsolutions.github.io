(function () {
  // Mobile navigation
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Mark the current page in the navigation
  var here = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('.nav a, .foot-grid a').forEach(function (a) {
    var href = (a.getAttribute('href') || '').split('#')[0].toLowerCase();
    if (href && href === here && a.closest('.nav')) a.setAttribute('aria-current', 'page');
  });

  // Copy buttons
  document.querySelectorAll('[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var text = btn.getAttribute('data-copy');
      var done = function () { var old = btn.textContent; btn.textContent = 'Copied'; setTimeout(function () { btn.textContent = old; }, 1600); };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () { fallback(); });
      } else { fallback(); }
      function fallback() {
        var target = btn.previousElementSibling;
        if (target) {
          var range = document.createRange(); range.selectNodeContents(target);
          var sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(range);
          btn.textContent = 'Selected';
          setTimeout(function () { btn.textContent = 'Copy'; }, 1600);
        }
      }
    });
  });

  // Contact form: compose a message the visitor can send from their own mail client
  var form = document.getElementById('inquiry-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var f = new FormData(form);
      var lines = [
        'Organization: ' + (f.get('org') || ''),
        'Organization type: ' + (f.get('type') || ''),
        'Name: ' + (f.get('name') || ''),
        'Email: ' + (f.get('email') || ''),
        'Area of interest: ' + (f.get('interest') || ''),
        '',
        f.get('message') || ''
      ];
      var body = lines.join('\n');
      var subject = 'Inquiry from ' + (f.get('org') || 'a prospective client');
      var out = document.getElementById('form-result');
      var pre = document.getElementById('form-body');
      var link = document.getElementById('form-mailto');
      var copyBtn = document.getElementById('form-copy');
      if (pre) pre.textContent = 'To: healthcare@solvivid.com\nSubject: ' + subject + '\n\n' + body;
      if (link) link.href = 'mailto:healthcare@solvivid.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      if (copyBtn) copyBtn.setAttribute('data-copy', 'To: healthcare@solvivid.com\nSubject: ' + subject + '\n\n' + body);
      if (out) { out.hidden = false; out.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }
    });
    var copyBtn = document.getElementById('form-copy');
    if (copyBtn) copyBtn.addEventListener('click', function () {
      var text = copyBtn.getAttribute('data-copy') || '';
      var done = function () { copyBtn.textContent = 'Copied'; setTimeout(function () { copyBtn.textContent = 'Copy message'; }, 1600); };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, function () {});
    });
  }
})();
