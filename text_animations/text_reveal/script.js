document.addEventListener('DOMContentLoaded', function() {
    const revealElements = document.querySelectorAll('.reveal-text');
    
    // Function to set up reveal elements
    function setupReveal() {
        revealElements.forEach((element, index) => {
            // Store original text
            const text = element.textContent;
            element.setAttribute('data-text', text);
            
            // Reset animation
            element.style.animation = 'none';
            
            // Add delay for each element
            const delay = index * 0.2;
            element.style.setProperty('--delay', `${delay}s`);
            
            // Remove any previously created spans
            element.querySelectorAll('span').forEach(span => span.remove());
            
            // Start the animation
            setTimeout(() => {
                element.style.animation = '';
            }, 10);
        });
    }
    
    // Initial setup
    setupReveal();
    
    // Replay button
    const replayBtn = document.getElementById('replay-btn');
    if (replayBtn) {
        replayBtn.addEventListener('click', function() {
            setupReveal();
        });
    }
});
