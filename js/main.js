document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".info");
  let currentSection = null;
  let isAnimating = false;

  function handleScroll() {
    if (isAnimating) return;

    const scrollPosition = window.scrollY + window.innerHeight / 2;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const step = parseInt(section.dataset.step);
      const part = section.dataset.part;

      if (scrollPosition >= top && scrollPosition < top + height) {
        if (currentSection !== section) {
          // Remover clase active de todas las secciones
          sections.forEach((s) => s.classList.remove("active"));

          // Añadir clase active a la sección actual
          section.classList.add("active");

          // Actualizar sección actual
          currentSection = section;

          // Prevenir animaciones múltiples
          isAnimating = true;

          // Animar el dron con la parte específica
          window.animateDrone(step);

          // Permitir nueva animación después de completar
          setTimeout(() => {
            isAnimating = false;
          }, 2000);

          // Añadir clase para la línea animada
          section.classList.add("line-active");
        }
      }
    });
  }

  // Listener de scroll con throttling
  let scrollTimeout;
  window.addEventListener("scroll", () => {
    if (scrollTimeout) {
      window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(handleScroll);
  });

  // Activar primera sección al cargar
  setTimeout(() => {
    sections[0].classList.add("active");
    handleScroll();
  }, 100);
});
