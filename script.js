document.addEventListener('DOMContentLoaded', function() {
    // Animate categories on scroll
    const categories = document.querySelectorAll('.category');
    
    // Initial animation for effect cards when they appear
    const effectCards = document.querySelectorAll('.effect-card');
    
    effectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 * index);
    });
    
    // Create an intersection observer for fade-in animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observe each category
    categories.forEach(category => {
        observer.observe(category);
    });
    
    // Randomly generate new cubes for background animation
    function createCube() {
        const backgroundAnimation = document.querySelector('.background-animation');
        const cube = document.createElement('div');
        cube.classList.add('cube');
        
        // Random position
        cube.style.left = Math.random() * 100 + 'vw';
        cube.style.top = Math.random() * 100 + 'vh';
        
        // Random animation duration
        const duration = 10 + Math.random() * 20;
        cube.style.animationDuration = duration + 's';
        
        backgroundAnimation.appendChild(cube);
        
        // Remove the cube after animation completes
        setTimeout(() => {
            cube.remove();
            createCube();
        }, duration * 1000);
    }
    
    // Create initial cubes
    for (let i = 0; i < 3; i++) {
        setTimeout(createCube, i * 3000);
    }
    
    // Add hover effects to category headers
    const categoryHeaders = document.querySelectorAll('.category-header');
    
    categoryHeaders.forEach(header => {
        header.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            icon.style.transform = 'scale(1.2) rotate(10deg)';
            icon.style.transition = 'transform 0.3s ease';
        });
        
        header.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });
});
