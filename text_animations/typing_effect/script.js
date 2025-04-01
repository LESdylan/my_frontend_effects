document.addEventListener('DOMContentLoaded', function() {
    // Restart typing animation when it completes
    const typingText = document.querySelector('.typing-text');
    
    if (typingText) {
        typingText.addEventListener('animationend', function(e) {
            if (e.animationName === 'typing') {
                setTimeout(() => {
                    this.style.animation = 'none';
                    setTimeout(() => {
                        this.style.animation = 'typing 3.5s steps(30, end), blink-caret 0.75s step-end infinite';
                    }, 10);
                }, 2000);
            }
        });
    }
});
