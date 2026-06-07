document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('contactStatus');

  if (!form) {
    return;
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(form);
    const name = formData.get('name')?.toString().trim();
    const email = formData.get('email')?.toString().trim();
    const message = formData.get('message')?.toString().trim();

    if (!name || !email || !message) {
      status.textContent = 'Please fill out all fields before sending.';
      return;
    }

    const subject = encodeURIComponent(`Contact from website: ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=246ab.designs@gmail.com&su=${subject}&body=${body}`;

    status.textContent = 'Opening Gmail in a new tab...';
    const newTab = window.open(gmailUrl, '_blank');
    if (!newTab) {
      status.textContent = 'Unable to open a new tab. Please try again or use your email client.';
      return;
    }

    form.reset();
    setTimeout(() => {
      status.textContent = '';
    }, 7000);
  });
});