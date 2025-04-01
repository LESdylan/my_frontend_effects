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

    // New preview functionality
    const previewSection = document.getElementById('previewSection');
    const previewWhiteboard = document.getElementById('previewWhiteboard');
    const viewCodeBtn = document.getElementById('viewCodeBtn');
    const closePreviewBtn = document.getElementById('closePreviewBtn');
    const previewCode = document.getElementById('previewCode');
    const codeDisplay = document.getElementById('codeDisplay');
    const codeTabs = document.querySelectorAll('.code-tab');
    
    let currentEffect = null;
    let effectResources = {
        html: '',
        css: '',
        js: ''
    };
    
    // Handle effect card clicks
    effectCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            const effectPath = this.getAttribute('data-effect');
            loadEffect(effectPath);
        });
    });
    
    // Improved loading function
    function loadEffect(effectPath) {
        currentEffect = effectPath;
        console.clear(); // Clear console to focus on current effect logs
        console.log(`Loading effect from: ${effectPath}`);
        
        // Show the preview section
        previewSection.style.display = 'block';
        
        // Update preview header with effect name
        const effectName = effectPath.split('/').pop().replace(/-/g, ' ');
        const previewHeader = document.querySelector('.preview-header h2');
        if (previewHeader) {
            previewHeader.textContent = effectName.charAt(0).toUpperCase() + effectName.slice(1) + ' Effect';
        }
        
        // Scroll to preview
        previewSection.scrollIntoView({ behavior: 'smooth' });
        
        // Show loading indicator
        previewWhiteboard.innerHTML = `
            <div class="loading-spinner">
                <i class="fas fa-spinner fa-spin fa-3x"></i>
                <p>Loading preview...</p>
            </div>
        `;
        
        // Load the HTML content with better error handling
        fetch(`${effectPath}/index.html`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load HTML (${response.status} ${response.statusText})`);
                }
                return response.text();
            })
            .then(html => {
                console.log(`HTML loaded successfully, size: ${html.length} bytes`);
                // Extract the demo part only
                const demoHTML = extractDemoContent(html);
                effectResources.html = demoHTML;
                
                // Load the CSS
                return fetch(`${effectPath}/styles.css`);
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load CSS (${response.status} ${response.statusText})`);
                }
                return response.text();
            })
            .then(css => {
                console.log(`CSS loaded successfully, size: ${css.length} bytes`);
                effectResources.css = css;
                
                // Load the JS
                return fetch(`${effectPath}/script.js`);
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load JS (${response.status} ${response.statusText})`);
                }
                return response.text();
            })
            .then(js => {
                console.log(`JS loaded successfully, size: ${js.length} bytes`);
                effectResources.js = js;
                
                // Render the preview
                renderPreview();
            })
            .catch(error => {
                console.error('Error loading effect:', error);
                previewWhiteboard.innerHTML = `
                    <div class="error-message">
                        <i class="fas fa-exclamation-triangle"></i>
                        <p>Failed to load effect: ${error.message}</p>
                        <button id="retry-btn" class="retry-button">Retry</button>
                    </div>
                `;
                
                // Add retry button functionality
                const retryBtn = document.getElementById('retry-btn');
                if (retryBtn) {
                    retryBtn.addEventListener('click', () => loadEffect(effectPath));
                }
            });
    }
    
    // Improved extraction function to remove code sections from preview
    function extractDemoContent(html) {
        // Create a temporary DOM element to parse the HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        
        // First, remove any code-section elements to avoid showing code in the preview
        const codeSections = tempDiv.querySelectorAll('.code-section');
        codeSections.forEach(section => section.remove());
        
        // Try to find the demo area
        const demoArea = tempDiv.querySelector('.demo-area');
        
        if (demoArea) {
            console.log('Demo area found:', demoArea.innerHTML.slice(0, 100) + '...');
            return demoArea.innerHTML;
        } else {
            // If no demo area is found, try to find the specific effect element
            console.warn('No .demo-area found in effect HTML, trying alternate content');
            
            // Try to find other common elements
            const possibleContainers = [
                tempDiv.querySelector('.gradient-wave-bg'),
                tempDiv.querySelector('.animated-pattern-bg'),
                tempDiv.querySelector('.flip-card'),
                tempDiv.querySelector('.glow-button'),
                tempDiv.querySelector('.typing-container'),
                tempDiv.querySelector('.carousel-slider'),
                tempDiv.querySelector('.perspective-card'),
                tempDiv.querySelector('.scene'),
                tempDiv.querySelector('.glitch-text')
            ];
            
            // Use the first found element or the innermost container as fallback
            for (const element of possibleContainers) {
                if (element) {
                    console.log('Found alternate element:', element.outerHTML.slice(0, 100) + '...');
                    return element.outerHTML;
                }
            }
            
            // Remove code sections from content
            const bodyContent = tempDiv.querySelector('body');
            if (bodyContent) {
                const codeElements = bodyContent.querySelectorAll('pre, code, .code-section');
                codeElements.forEach(el => el.remove());
                return bodyContent.innerHTML;
            }
            
            return tempDiv.innerHTML;
        }
    }
    
    // Improve button centering and preview styling
    function renderPreview() {
        // Create an iframe with improved settings
        const iframe = document.createElement('iframe');
        iframe.style.width = '100%';
        iframe.style.height = '400px';
        iframe.style.border = 'none';
        iframe.style.borderRadius = '8px';
        iframe.style.backgroundColor = '#ffffff';
        iframe.id = 'preview-iframe';
        
        // Clear the whiteboard and add the iframe
        previewWhiteboard.innerHTML = '';
        previewWhiteboard.appendChild(iframe);
        
        // Force a specific visible background
        previewWhiteboard.style.backgroundColor = '#ffffff';
        
        // Create a document in the iframe
        try {
            const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            
            // Create the HTML structure with better styles for centering and buttons
            iframeDoc.open();
            iframeDoc.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
                    <style>
                        /* Reset and base styles to ensure content is visible */
                        * {
                            margin: 0;
                            padding: 0;
                            box-sizing: border-box;
                        }
                        
                        body {
                            margin: 0;
                            padding: 0;
                            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            min-height: 100vh;
                            background-color: #f8f9fa;
                            overflow: auto;
                        }
                        
                        /* Container to center content */
                        .preview-container {
                            width: 100%;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            padding: 20px;
                        }
                        
                        /* Make sure content is visible */
                        .effect-container {
                            width: 100%;
                            max-width: 600px;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            justify-content: center;
                        }
                        
                        /* Improved button styling */
                        button {
                            margin: 5px auto;
                            display: block;
                        }
                        
                        /* Improved controls container */
                        .controls {
                            margin: 15px auto;
                            display: flex;
                            justify-content: center;
                            gap: 10px;
                            flex-wrap: wrap;
                        }
                        
                        /* Specific adjustments for certain effects */
                        .perspective-card, .flip-card, .carousel-slider, .cube-slider, .fade-slider {
                            margin: 0 auto;
                        }
                        
                        /* Add the actual effect styles */
                        ${effectResources.css}
                    </style>
                    
                    <!-- Load any needed external libraries -->
                    <script src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"></script>
                </head>
                <body>
                    <div class="preview-container">
                        <div class="effect-container">
                            ${effectResources.html}
                        </div>
                    </div>
                    
                    <script>
                        // Wrapper to avoid conflicts and ensure script runs
                        (function() {
                            document.addEventListener('DOMContentLoaded', function() {
                                console.log('Preview iframe loaded');
                            });
                            ${effectResources.js}
                        })();
                    </script>
                </body>
                </html>
            `);
            iframeDoc.close();
            
            console.log('Preview rendered with HTML size: ' + effectResources.html.length);
            
            // Add message if iframe appears empty
            setTimeout(() => {
                try {
                    const iframeBody = iframe.contentDocument.body;
                    if (iframeBody.offsetHeight < 10) {
                        console.warn('Iframe body has small height, content might be invisible');
                        previewWhiteboard.innerHTML += `
                            <div class="preview-note" style="position: absolute; bottom: 10px; right: 10px; 
                                    background: rgba(0,0,0,0.7); color: white; padding: 8px; border-radius: 4px;">
                                Content loaded but may be invisible. Try clicking "View Code" to see details.
                            </div>
                        `;
                    }
                } catch (e) {
                    console.error('Error checking iframe content:', e);
                }
            }, 1000);
        } catch (error) {
            console.error('Error rendering preview:', error);
            previewWhiteboard.innerHTML = `
                <div class="error-message">
                    <i class="fas fa-exclamation-triangle"></i>
                    <p>Error rendering preview: ${error.message}</p>
                    <button id="retry-btn" class="retry-button">Retry</button>
                </div>
            `;
            
            // Add retry button functionality
            const retryBtn = document.getElementById('retry-btn');
            if (retryBtn) {
                retryBtn.addEventListener('click', renderPreview);
            }
        }
        
        // Update the code display with the first tab (HTML)
        updateCodeDisplay('html');
    }
    
    // Handle view code button
    viewCodeBtn.addEventListener('click', function() {
        previewCode.style.display = previewCode.style.display === 'block' ? 'none' : 'block';
        viewCodeBtn.innerHTML = previewCode.style.display === 'block' ? 
            '<i class="fas fa-code-branch"></i> Hide Code' : 
            '<i class="fas fa-code"></i> View Code';
    });
    
    // Handle close preview button
    closePreviewBtn.addEventListener('click', function() {
        previewSection.style.display = 'none';
        previewCode.style.display = 'none';
        viewCodeBtn.innerHTML = '<i class="fas fa-code"></i> View Code';
    });
    
    // Handle code tabs
    codeTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabType = this.getAttribute('data-tab');
            
            // Update active tab
            codeTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Update code display
            updateCodeDisplay(tabType);
        });
    });
    
    // Update code display based on selected tab
    function updateCodeDisplay(tabType) {
        let code = '';
        
        switch(tabType) {
            case 'html':
                code = formatCode(effectResources.html);
                break;
            case 'css':
                code = formatCode(effectResources.css);
                break;
            case 'js':
                code = formatCode(effectResources.js);
                break;
        }
        
        codeDisplay.textContent = code;
    }
    
    // Format code for display
    function formatCode(code) {
        return code
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }
});
