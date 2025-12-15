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

/* Calculator Logic */
(() => {
  const locSlider = document.getElementById('locations-slider');
  const userSlider = document.getElementById('users-slider');
  const locVal = document.getElementById('locations-val');
  const userVal = document.getElementById('users-val');
  const totalPriceEl = document.getElementById('total-price');
  const savingsEl = document.getElementById('savings-amount');

  if (!locSlider || !userSlider) return;

  const calculate = () => {
    const locations = parseInt(locSlider.value);
    const users = parseInt(userSlider.value);

    // Update labels
    locVal.textContent = locations;
    userVal.textContent = users;

    // Pricing Model (Example)
    // Base per location: 2500 DKK
    // Per user: 50 DKK
    const basePerLocation = 2500;
    const pricePerUser = 50;

    const monthlyPrice = (locations * basePerLocation) + (users * pricePerUser);

    // Traditional IT estimated cost (1.4x factor + hidden costs)
    const traditionalCost = monthlyPrice * 1.4;
    const savings = traditionalCost - monthlyPrice;

    // Format numbers
    const format = (num) => num.toLocaleString('da-DK');

    // Animate or set text
    totalPriceEl.textContent = format(monthlyPrice);
    savingsEl.textContent = format(Math.round(savings));
  };

  locSlider.addEventListener('input', calculate);
  userSlider.addEventListener('input', calculate);

  // Initialize
  calculate();
})();

/* Button Interaction Logic */
(() => {
  const contactSection = document.getElementById('contact');
  const messageInput = document.getElementById('message');
  const nameInput = document.getElementById('name');

  // Handle Package Buttons
  document.querySelectorAll('[data-action="contact"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const subject = btn.dataset.subject;

      // Scroll to contact
      contactSection.scrollIntoView({ behavior: 'smooth' });

      // Pre-fill message
      if (messageInput) {
        messageInput.value = `Hej Mads,\n\nJeg er interesseret i at høre mere om ${subject}.\n\nVenlig hilsen,`;
        // Trigger a visual 'flash' or focus
        messageInput.focus();
        // Move cursor to end isn't standard in all browsers but focus helps
      }
    });
  });

  // Handle Calculator CTA
  const calcCta = document.getElementById('calc-cta');
  if (calcCta) {
    calcCta.addEventListener('click', (e) => {
      // Allow default scroll anchor behavior, but add message
      // Or prevent default if we want custom scroll logic
      // Anchors usually handle scroll nicely if scroll-behavior is smooth in CSS

      const loc = document.getElementById('locations-val').textContent;
      const users = document.getElementById('users-val').textContent;
      const price = document.getElementById('total-price').textContent;

      if (messageInput) {
        messageInput.value = `Hej Mads,\n\nJeg har brugt din beregner og ser en estimeret pris på ${price} DKK/md for ${loc} lokationer og ${users} medarbejdere.\n\nLad os tage en snak om detaljerne.`;

        // Use timeout to ensure scroll happens first (if using default anchor)
        // or just focus immediately
        setTimeout(() => {
           messageInput.focus();
        }, 500);
      }
    });
  }
})();

/* Dashboard Widget Logic moved to dashboard.js */
