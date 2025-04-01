<iframe id="effectIframe" style="width: 100%; height: 400px; border: none; border-radius: 8px;"></iframe>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const iframe = document.getElementById('effectIframe');
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    
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
                
                .effect-container {
                    width: 100%;
                    max-width: 600px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 20px;
                }
                
                /* Effect-specific styles */
                <?php echo $cssContent; ?>
            </style>
        </head>
        <body>
            <div class="effect-container">
                <?php echo $htmlContent; ?>
            </div>
            
            <script>
                <?php echo $jsContent; ?>
            </script>
        </body>
        </html>
    `);
    iframeDoc.close();
});
</script>
