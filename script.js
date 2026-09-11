// Dynamic Script for Zhuoli Yang's Portfolio Website

document.addEventListener('DOMContentLoaded', () => {
  // ==================== 1. DARK MODE TOGGLE ====================
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIconSun = document.getElementById('theme-icon-sun');
  const themeIconMoon = document.getElementById('theme-icon-moon');

  function applyTheme(isDark) {
    if (isDark) {
      document.documentElement.classList.add('dark');
      if (themeIconSun) themeIconSun.classList.remove('hidden');
      if (themeIconMoon) themeIconMoon.classList.add('hidden');
      localStorage.setItem('zy_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      if (themeIconSun) themeIconSun.classList.add('hidden');
      if (themeIconMoon) themeIconMoon.classList.remove('hidden');
      localStorage.setItem('zy_theme', 'light');
    }
  }

  const savedTheme = localStorage.getItem('zy_theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(savedTheme === 'dark' || (!savedTheme && prefersDark));

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      applyTheme(!document.documentElement.classList.contains('dark'));
    });
  }

  // ==================== 2. READING PROGRESS BAR & BACK TO TOP ====================
  const progressBar = document.getElementById('scroll-progress');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    
    if (progressBar) {
      progressBar.style.width = scrollPercent + '%';
    }

    if (backToTopBtn) {
      if (scrollTop > 350) {
        backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
        backToTopBtn.classList.add('opacity-100');
      } else {
        backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
        backToTopBtn.classList.remove('opacity-100');
      }
    }
  }, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ==================== 3. BIOLOGICAL PARTICLE CANVAS (HERO) ====================
  const canvas = document.getElementById('bio-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = canvas.parentElement.offsetWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight);
    let particles = [];
    const particleCount = Math.min(Math.floor(width / 22), 45);

    let mouse = { x: null, y: null, radius: 120 };

    window.addEventListener('resize', () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    });

    canvas.parentElement.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });

    canvas.parentElement.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.7;
        this.vy = (Math.random() - 0.5) * 0.7;
        this.radius = Math.random() * 2 + 1.2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx = -this.vx;
        if (this.y < 0 || this.y > height) this.vy = -this.vy;

        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const angle = Math.atan2(dy, dx);
            this.x -= Math.cos(angle) * 1.5;
            this.y -= Math.sin(angle) * 1.5;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = document.documentElement.classList.contains('dark')
          ? 'rgba(52, 211, 153, 0.45)'
          : 'rgba(5, 150, 105, 0.35)';
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 90) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            const alpha = (1 - dist / 90) * 0.22;
            ctx.strokeStyle = document.documentElement.classList.contains('dark')
              ? `rgba(52, 211, 153, ${alpha})`
              : `rgba(5, 150, 105, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(animateParticles);
    }

    animateParticles();
  }

  // ==================== 4. DYNAMIC TYPEWRITER EFFECT ====================
  const typewriterTarget = document.getElementById('typewriter-text');
  if (typewriterTarget) {
    const phrases = [
      'Molecular Mechanism.',
      'Biomechanical Function.',
      'Ecological Balance.',
      'Osteological Kinematics.'
    ];
    let phraseIndex = 0;
    let charIndex = phrases[0].length;
    let isDeleting = true;
    let speed = 90;

    function typeLoop() {
      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        charIndex--;
        typewriterTarget.textContent = currentPhrase.substring(0, charIndex);
        speed = 45;
      } else {
        charIndex++;
        typewriterTarget.textContent = currentPhrase.substring(0, charIndex);
        speed = 85;
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        speed = 2200; // Pause at full word
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        speed = 400; // Pause before typing new word
      }

      setTimeout(typeLoop, speed);
    }

    setTimeout(typeLoop, 2500);
  }

  // ==================== 5. NUMBER COUNTING ANIMATION ====================
  const countElements = document.querySelectorAll('[data-counter-target]');
  let hasAnimatedCounters = false;

  function runCounters() {
    countElements.forEach(el => {
      const target = parseFloat(el.getAttribute('data-counter-target'));
      const isFloat = el.getAttribute('data-counter-target').includes('.');
      const duration = 1400;
      const startTime = performance.now();

      function update(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // easeOutExpo
        const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const current = ease * target;

        el.textContent = isFloat ? current.toFixed(1) : Math.floor(current);

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          el.textContent = isFloat ? target.toFixed(1) : target;
        }
      }

      requestAnimationFrame(update);
    });
  }

  const statsRibbon = document.getElementById('stats-ribbon');
  if (statsRibbon) {
    const counterObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !hasAnimatedCounters) {
        hasAnimatedCounters = true;
        runCounters();
        counterObserver.disconnect();
      }
    }, { threshold: 0.3 });
    counterObserver.observe(statsRibbon);
  }

  // ==================== 6. SCROLL REVEAL ANIMATIONS ====================
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealElements.forEach(el => revealObserver.observe(el));

  // ==================== 7. INTERACTIVE MOUSE GLOW ON CARDS ====================
  document.querySelectorAll('.interactive-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // ==================== 8. MOBILE MENU TOGGLE ====================
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // ==================== 9. PROJECT FILTER BUTTONS ====================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active', 'bg-emerald-600', 'text-white'));
      btn.classList.add('active', 'bg-emerald-600', 'text-white');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category.includes(filter)) {
          card.style.display = 'block';
          card.classList.add('fade-in');
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ==================== 10. MODAL DEEP DIVE SYSTEM ====================
  const modal = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalCategory = document.getElementById('modal-category');
  const modalContent = document.getElementById('modal-body');
  const closeModalBtn = document.getElementById('modal-close-btn');

  const projectDetails = {
    'tigerfish': {
      title: 'Hydrocynus goliath: Skeletal Articulation & Biomechanical Analysis',
      category: 'Comparative Anatomy & Osteology',
      content: `
        <div class="space-y-4 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
          <p><strong>Methodological Premise:</strong> Articulating a delicate fish skeleton forgives no guesswork. While video demonstrations suggested sodium hydroxide (NaOH) for lipid stripping, they omit critical concentration and duration parameters. An overtreatment would dissolve delicate osteological landmarks.</p>
          
          <div class="p-4 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
            <h4 class="font-semibold text-emerald-800 dark:text-emerald-300 mb-1">Preliminary Controlled Trial</h4>
            <p class="text-xs">Prior to working on the primary <em>Hydrocynus goliath</em> specimen, a controlled trial was conducted on a common crucian carp (<em>Carassius carassius</em>). By testing serial dilutions of NaOH and soaking intervals, an optimal threshold was calibrated to effectively saponify remaining fats without compromising bone density or suture integrity.</p>
          </div>

          <p><strong>Kinematics & Articulation:</strong> Once soft tissues were cleaned, individual bones had lost their original relative coordinates. By cross-referencing adjacent known articular facets (analogous to topological induction in mathematics), each unfamiliar vertebra was reconstructed based on the specific degree of motion it permits.</p>

          <p><strong>Key Insight:</strong> The transition from descriptive taxonomy to functional morphology: examining not merely the appearance of bones, but their mechanical adaptation to predatory apex kinematics in torrential river systems.</p>
        </div>
      `
    },
    'vivarium': {
      title: 'Long-Term Vivarium Ecology & Differential Pathology',
      category: 'Husbandry & Applied Ethology',
      content: `
        <div class="space-y-4 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
          <p><strong>Ecosystem Management:</strong> Maintained controlled closed habitats over multiple years spanning reptiles, arachnids, scorpions, and aquatic fauna. Inspired by classical naturalists including J.-H. Fabre (<em>Souvenirs Entomologiques</em>).</p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 my-2">
            <div class="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-lg border border-slate-200 dark:border-slate-700">
              <span class="text-xs font-bold text-amber-600 dark:text-amber-400 block mb-1">Parasitic Presentation (e.g. Ichthyophthirius)</span>
              <p class="text-xs">Identified by cutaneous white trophonts; triggered by acute thermal shifts or unquarantined vectors. Addressed via stepwise thermal escalation (accelerating parasite lifecycle) and targeted water treatment.</p>
            </div>
            <div class="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-lg border border-slate-200 dark:border-slate-700">
              <span class="text-xs font-bold text-rose-600 dark:text-rose-400 block mb-1">Bacterial & Metabolic Ailments</span>
              <p class="text-xs">Characterized by sluggish motility and abdominal distension; tied to nitrate accumulation or feed spoilage. Treated through feed restriction, bio-filtration renewal, and substrate siphon flushing rather than chemical shock.</p>
            </div>
          </div>

          <p><strong>Literature Synthesis:</strong> Cross-referenced academic husbandry literature and veterinary care guides in both English and Chinese to establish rigorous quarantine and biological safety protocols.</p>
        </div>
      `
    },
    'biomechanics': {
      title: 'Orthopteran Saltatorial Biomechanics & Elastic Energy Storage',
      category: 'Biomechanics & Molecular Curiosity',
      content: `
        <div class="space-y-4 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
          <p><strong>Core Scientific Question:</strong> How does an organism jump tens of times its body length without shattering micro-skeletal junctions? The power output of an orthopteran jump vastly exceeds direct muscle contraction velocity, necessitating elastic mechanical storage (semi-lunar processes and resilin proteins).</p>
          <p><strong>Bridging Micro to Macro:</strong> Exploring how physical resilience is encoded at the molecular level: the arrangement of chitin fibrils, the structural elasticity of proteins, and how mutations in these macromolecules propagate into macroscopic mechanical failures.</p>
          <p><strong>Aspirations:</strong> Looking forward to applying advanced biophysical and molecular assays (e.g., cryo-EM, mass spectrometry, CRISPR mutagenesis) during undergraduate studies to quantitatively probe these structure-function relationships.</p>
        </div>
      `
    }
  };

  document.querySelectorAll('.open-modal-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-project');
      const details = projectDetails[id];
      if (details && modal) {
        modalTitle.textContent = details.title;
        modalCategory.textContent = details.category;
        modalContent.innerHTML = details.content;
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (closeModalBtn && modal) {
    closeModalBtn.addEventListener('click', () => {
      modal.classList.add('hidden');
      document.body.style.overflow = 'auto';
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
      }
    });
  }

  // ==================== 11. COPY EMAIL TOAST ====================
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const toast = document.getElementById('copy-toast');

  if (copyEmailBtn && toast) {
    copyEmailBtn.addEventListener('click', () => {
      const email = 'yangzhuoli2009@163.com';
      navigator.clipboard.writeText(email).then(() => {
        toast.classList.remove('opacity-0', 'pointer-events-none');
        toast.classList.add('opacity-100');
        setTimeout(() => {
          toast.classList.remove('opacity-100');
          toast.classList.add('opacity-0', 'pointer-events-none');
        }, 2200);
      });
    });
  }

  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }
});
