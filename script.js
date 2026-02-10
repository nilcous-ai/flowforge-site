(function () {
  // Set year
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Mobile menu
  var btn = document.getElementById('menuBtn');
  var nav = document.getElementById('mobileNav');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      var expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      nav.hidden = expanded;
      btn.textContent = expanded ? 'Menu' : 'Close';
    });
    // Close menu when clicking a link
    nav.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function () {
        btn.setAttribute('aria-expanded', 'false');
        nav.hidden = true;
        btn.textContent = 'Menu';
      });
    });
  }

  // Contact form -> mailto
  var form = document.getElementById('auditForm');
  var prefill = document.getElementById('prefillLink');
  function buildMailto(data) {
    var to = 'hello@flowforge.ai';
    var subject = 'Free AI Workflow Audit';
    var body =
      'Hi FlowForge AI,\n\n' +
      'Name: ' + (data.name || '') + '\n' +
      'Email: ' + (data.email || '') + '\n' +
      'Company: ' + (data.company || '') + '\n' +
      'Website: ' + (data.website || '') + '\n' +
      'Current tools (CRM, email, forms, calendar): ' + (data.tools || '') + '\n\n' +
      'Workflow to automate (describe the pain):\n' + (data.workflow || '') + '\n\n' +
      'Thanks!';
    var href = 'mailto:' + encodeURIComponent(to) +
      '?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(body);
    return href;
  }

  function currentFormData() {
    var fd = new FormData(form);
    return {
      name: fd.get('name'),
      email: fd.get('email'),
      company: fd.get('company'),
      website: fd.get('website'),
      tools: fd.get('tools'),
      workflow: fd.get('workflow'),
    };
  }

  if (form) {
    form.addEventListener('input', function () {
      if (!prefill) return;
      var href = buildMailto(currentFormData());
      prefill.setAttribute('href', href);
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var href = buildMailto(currentFormData());
      window.location.href = href;
    });
  }
})();
