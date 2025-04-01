document.addEventListener('DOMContentLoaded', function() {
    const card = document.querySelector('.perspective-card');
    
    card.addEventListener('mousemove', function(e) {
        const cardRect = card.getBoundingClientRect();
        const cardCenterX = cardRect.left + cardRect.width / 2;
        const cardCenterY = cardRect.top + cardRect.height / 2;
        
        // Calculate the mouse position relative to the center of the card
        const mouseX = e.clientX - cardCenterX;
        const mouseY = e.clientY - cardCenterY;
        
        // Calculate the rotation angle (max ±15 degrees)
        const rotateY = (mouseX / (cardRect.width / 2)) * 15;
        const rotateX = -(mouseY / (cardRect.height / 2)) * 15;
        
        // Apply the transformation
        card.querySelector('.card-content').style.transform = 
            `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });
    
    card.addEventListener('mouseleave', function() {
        // Reset the transformation when mouse leaves the card
        card.querySelector('.card-content').style.transform = 
            'rotateX(0) rotateY(0) translateZ(0)';
    });
});
