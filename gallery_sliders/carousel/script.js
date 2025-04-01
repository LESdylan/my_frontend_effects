document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.carousel-slider');
    const track = slider.querySelector('.carousel-track');
    const slides = slider.querySelectorAll('.carousel-slide');
    const dots = slider.querySelectorAll('.dot');
    const prevBtn = slider.querySelector('.prev');
    const nextBtn = slider.querySelector('.next');
    
    const slideWidth = slider.clientWidth;
    let currentIndex = 0;
    
    // Initialize
    updateCarousel();
    
    // Next button
    nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
    });
    
    // Previous button
    prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateCarousel();
    });
    
    // Dot navigation
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            currentIndex = parseInt(this.getAttribute('data-index'));
            updateCarousel();
        });
    });
    
    // Update carousel position and dots
    function updateCarousel() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update active dot
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    // Auto slide
    setInterval(function() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
    }, 6000);
    
    // Touch events for mobile swipe
    let startX, moveX, initialPosition;
    let isDragging = false;
    
    track.addEventListener('touchstart', dragStart);
    track.addEventListener('touchmove', dragMove);
    track.addEventListener('touchend', dragEnd);
    
    function dragStart(e) {
        startX = e.touches[0].clientX;
        initialPosition = -currentIndex * 100;
        isDragging = true;
    }
    
    function dragMove(e) {
        if (!isDragging) return;
        moveX = e.touches[0].clientX;
        const diffX = (moveX - startX) / slider.clientWidth * 100;
        track.style.transform = `translateX(${initialPosition + diffX}%)`;
        track.style.transition = 'none';
    }
    
    function dragEnd() {
        isDragging = false;
        const threshold = 20; // Percentage of slide width to consider a swipe
        
        if (moveX && Math.abs(moveX - startX) / slider.clientWidth * 100 > threshold) {
            if (moveX > startX) {
                // Swipe right -> previous
                currentIndex = Math.max(0, currentIndex - 1);
            } else {
                // Swipe left -> next
                currentIndex = Math.min(slides.length - 1, currentIndex + 1);
            }
        }
        
        track.style.transition = 'transform 0.5s ease';
        updateCarousel();
        moveX = null;
    }
});
