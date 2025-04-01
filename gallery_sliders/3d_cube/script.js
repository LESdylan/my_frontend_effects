document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.cube-slider');
    const cube = slider.querySelector('.cube');
    const dots = slider.querySelectorAll('.dot');
    const prevBtn = slider.querySelector('.prev');
    const nextBtn = slider.querySelector('.next');
    let currentFace = 0;
    let rotations = [0, 180, 90, -90]; // Front, back, right, left
    
    // Initialize the first slide
    showFace(currentFace);
    
    // Next/previous controls
    prevBtn.addEventListener('click', function() {
        currentFace = (currentFace - 1 + rotations.length) % rotations.length;
        showFace(currentFace);
    });
    
    nextBtn.addEventListener('click', function() {
        currentFace = (currentFace + 1) % rotations.length;
        showFace(currentFace);
    });
    
    // Dots controls
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const faceIndex = parseInt(this.getAttribute('data-index'));
            showFace(faceIndex);
            currentFace = faceIndex;
        });
    });
    
    function showFace(index) {
        // Update cube rotation
        let rotation = rotations[index];
        cube.style.transform = `rotateY(${-rotation}deg)`;
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Add active class to current dot
        dots[index].classList.add('active');
    }
    
    // Auto rotate
    setInterval(function() {
        currentFace = (currentFace + 1) % rotations.length;
        showFace(currentFace);
    }, 7000);
});
