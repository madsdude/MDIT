const yearElement = document.getElementById('year');
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

const contactForm = document.getElementById('contact-form');
const statusElement = document.getElementById('form-status');

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const name = formData.get('name');

    if (statusElement) {
      statusElement.textContent = 'Sender besked...';
    }

    // Simulerer en kort netværksanmodning
    setTimeout(() => {
      if (statusElement) {
        const message = name ? `Tak ${name}! Jeg vender tilbage inden for 24 timer.` :
          'Tak for din besked! Jeg vender tilbage inden for 24 timer.';
        statusElement.textContent = message;
      }
      contactForm.reset();
    }, 900);
  });
}

const briefButton = document.getElementById('download-brief');
if (briefButton) {
  briefButton.addEventListener('click', () => {
    const brief = `MDIT Network Brief\n\n` +
      `• Fokus på Network as a Service og automatisering\n` +
      `• KPI'er: SLA, compliance og tidsbesparelse\n` +
      `• Kontakt: kontakt@madsdit.dk / +45 22 55 77 88`;

    const blob = new Blob([brief], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'MDIT-naas-brief.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  });
}
