// Smooth scroll for indicators
document.querySelector('.scroll-indicator').addEventListener('click', function () {
    window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
    });
});

// Page indicators functionality
const dots = document.querySelectorAll('.page-dot');
dots.forEach((dot, index) => {
    dot.addEventListener('click', function () {
        dots.forEach(d => d.classList.remove('active'));
        this.classList.add('active');
    });
});

// Add hover effect to hero images
const heroImages = document.querySelectorAll('.hero-image');
heroImages.forEach(img => {
    img.addEventListener('mouseenter', function () {
        this.style.transform = 'scale(1.05)';
        this.style.transition = 'transform 0.3s ease';
    });
    img.addEventListener('mouseleave', function () {
        if (!this.classList.contains('hero-image:nth-child(2)')) {
            this.style.transform = 'scale(1)';
        }
    });
});