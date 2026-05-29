// Animación de los contadores de impacto ecológico
const counters = document.querySelectorAll('.counter');
const speed = 100; // Velocidad de la animación

const animateCounters = () => {
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            
            // Calcula el incremento
            const inc = target / speed;

            // Verifica si el contador ha llegado a su objetivo
            if (count < target) {
                // Suma el incremento y redondea
                counter.innerText = Math.ceil(count + inc);
                // Llama a la función de nuevo cada 20ms
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target;
            }
        };

        updateCount();
    });
}

// Ejecutar la animación solo cuando la sección de estadísticas sea visible (Intersection Observer)
const observerOptions = {
    root: null,
    threshold: 0.5 // Se activa cuando el 50% de la sección es visible
};

const statsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            // Dejar de observar una vez que la animación se ejecute
            observer.unobserve(entry.target); 
        }
    });
}, observerOptions);

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Opcional: Navegación suave para los enlaces del menú
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});