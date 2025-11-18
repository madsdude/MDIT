(() => {
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

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const statElements = Array.from(document.querySelectorAll('.stat-number'));

  const animateStat = (element) => {
    const target = Number(element.dataset.target || 0);
    const duration = Number(element.dataset.duration || 1100);
    const decimals = Number(element.dataset.decimals || 0);
    let start = null;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const value = target * progress;
      element.textContent = value.toFixed(decimals);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  };

  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
          observer.unobserve(entry.target);
          entry.target.querySelectorAll('.stat-number').forEach(animateStat);
        }
      });
    }, { threshold: 0.2 });

    revealElements.forEach((element) => observer.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add('reveal-visible'));
    statElements.forEach(animateStat);
  }
})();
