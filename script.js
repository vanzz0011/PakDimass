document.body.classList.add("loading");

const tabButtons = document.querySelectorAll(".tab-button");
const tabPanels = document.querySelectorAll(".tab-panel");

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.tab;

    tabButtons.forEach((item) => {
      item.classList.toggle("active", item === button);
      item.setAttribute("aria-selected", String(item === button));
    });

    tabPanels.forEach((panel) => {
      panel.classList.toggle("active", panel.id === target);
    });
  });
});

const reveals = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

reveals.forEach((item) => revealObserver.observe(item));

const counters = document.querySelectorAll("[data-counter]");

const animateCounter = (element) => {
  const target = Number(element.dataset.counter);
  let current = 0;
  const step = Math.max(1, Math.ceil(target / 40));

  const tick = () => {
    current += step;
    if (current >= target) {
      element.textContent = `${target}+`;
      return;
    }

    element.textContent = `${current}+`;
    requestAnimationFrame(tick);
  };

  tick();
};

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.7 }
);

counters.forEach((counter) => counterObserver.observe(counter));

const tiltCards = document.querySelectorAll(".tilt-card");

tiltCards.forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 10;
    const rotateX = ((y / rect.height) - 0.5) * -10;

    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

const nav = document.querySelector(".top-nav");
const menuToggle = document.querySelector(".menu-toggle");

menuToggle?.addEventListener("click", () => {
  nav?.classList.toggle("open");
});

const liveClock = document.getElementById("live-clock");

const updateClock = () => {
  if (!liveClock) return;

  const now = new Date();
  liveClock.textContent = now.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

updateClock();
setInterval(updateClock, 1000);

const testimonials = document.querySelectorAll(".testimonial-card");
let testimonialIndex = 0;

if (testimonials.length > 0) {
  setInterval(() => {
    testimonials[testimonialIndex].classList.remove("active");
    testimonialIndex = (testimonialIndex + 1) % testimonials.length;
    testimonials[testimonialIndex].classList.add("active");
  }, 3200);
}

const preloader = document.querySelector(".preloader");

window.addEventListener("load", () => {
  setTimeout(() => {
    preloader?.classList.add("hidden");
    document.body.classList.remove("loading");
  }, 900);
});

const cursorGlow = document.querySelector(".cursor-glow");

window.addEventListener("pointermove", (event) => {
  if (!cursorGlow) return;

  cursorGlow.style.left = `${event.clientX}px`;
  cursorGlow.style.top = `${event.clientY}px`;
});

const terminalOutput = document.getElementById("terminal-output");

if (terminalOutput) {
  const extraLines = [
    "> lint check complete.",
    "> motion system activated.",
    "> portfolio aesthetics optimized.",
    "> elite presentation ready.",
  ];

  let lineIndex = 0;

  setInterval(() => {
    const line = document.createElement("p");
    line.innerHTML = `<span>></span> ${extraLines[lineIndex]}`;
    terminalOutput.appendChild(line);
    lineIndex = (lineIndex + 1) % extraLines.length;

    if (terminalOutput.children.length > 9) {
      terminalOutput.removeChild(terminalOutput.children[0]);
    }
  }, 2200);
}

const canvas = document.querySelector(".particle-canvas");
const scrollProgress = document.querySelector(".scroll-progress");

if (canvas instanceof HTMLCanvasElement) {
  const context = canvas.getContext("2d");

  if (context) {
    const particles = [];
    const particleCount = 48;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particles.length = 0;

      for (let index = 0; index < particleCount; index += 1) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2.2 + 0.6,
          speedX: (Math.random() - 0.5) * 0.35,
          speedY: (Math.random() - 0.5) * 0.35,
        });
      }
    };

    const drawParticles = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fillStyle = "rgba(111, 224, 255, 0.65)";
        context.fill();

        for (let pair = index + 1; pair < particles.length; pair += 1) {
          const other = particles[pair];
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.hypot(dx, dy);

          if (distance < 120) {
            context.beginPath();
            context.moveTo(particle.x, particle.y);
            context.lineTo(other.x, other.y);
            context.strokeStyle = `rgba(59, 214, 198, ${0.12 - distance / 1000})`;
            context.stroke();
          }
        }
      });

      requestAnimationFrame(drawParticles);
    };

    resizeCanvas();
    createParticles();
    drawParticles();

    window.addEventListener("resize", () => {
      resizeCanvas();
      createParticles();
    });
  }
}

const updateScrollProgress = () => {
  if (!scrollProgress) return;

  const scrollTop = window.scrollY;
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
  scrollProgress.style.width = `${progress}%`;
};

updateScrollProgress();
window.addEventListener("scroll", updateScrollProgress, { passive: true });
