document.addEventListener('DOMContentLoaded', function() {
    const cube = document.querySelector('.cube');
    const buttons = document.querySelectorAll('.rotate-btn');
    
    // Set initial state
    cube.classList.add('show-front');
    
    // Add click event to buttons
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const direction = this.getAttribute('data-direction');
            
            // Remove all state classes
            cube.className = 'cube';
            
            // Add the appropriate state class
            cube.classList.add(`show-${direction}`);
        });
    });
});
