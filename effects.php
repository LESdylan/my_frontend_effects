<?php
// Check if category and effect are provided
if (!isset($_GET['category']) || !isset($_GET['effect'])) {
    header('Location: index.php');
    exit;
}

$category = $_GET['category'];
$effectId = $_GET['effect'];

// Load effect data from configuration
$effectsData = json_decode(file_get_contents('config/effects.json'), true);
$categories = $effectsData['categories'];

// Find the requested category and effect
$currentCategory = null;
$currentEffect = null;

foreach ($categories as $cat) {
    if ($cat['id'] === $category) {
        $currentCategory = $cat;
        foreach ($cat['effects'] as $eff) {
            if ($eff['id'] === $effectId) {
                $currentEffect = $eff;
                break 2;
            }
        }
    }
}

// If not found, redirect to homepage
if (!$currentCategory || !$currentEffect) {
    header('Location: index.php');
    exit;
}

// Get file paths
$htmlPath = "effects/{$category}/{$effectId}/demo.html";
$cssPath = "effects/{$category}/{$effectId}/style.css";
$jsPath = "effects/{$category}/{$effectId}/script.js";

// Read file contents
$htmlContent = file_exists($htmlPath) ? file_get_contents($htmlPath) : '';
$cssContent = file_exists($cssPath) ? file_get_contents($cssPath) : '';
$jsContent = file_exists($jsPath) ? file_get_contents($jsPath) : '';

// Include page header
include 'templates/header.php';
?>

<div class="background-animation">
    <div class="cube"></div>
    <div class="cube"></div>
    <div class="cube"></div>
    <div class="cube"></div>
    <div class="cube"></div>
</div>

<div class="main-wrapper">
    <header>
        <div class="logo">
            <div class="logo-icon"><i class="fas fa-code"></i></div>
            <h1>Frontend <span>Effects</span></h1>
        </div>
        <p class="tagline">A showcase of beautiful CSS and JavaScript effects for your web projects</p>
        <div class="header-shape"></div>
    </header>
    
    <a href="index.php" class="back-link">← Back to Main Page</a>
    
    <section class="preview-section" style="display: block;">
        <div class="preview-container">
            <div class="preview-header">
                <h2><?php echo $currentEffect['name']; ?></h2>
                <div class="preview-controls">
                    <button id="viewCodeBtn"><i class="fas fa-code"></i> View Code</button>
                    <a href="index.php" class="close-btn"><i class="fas fa-times"></i></a>
                </div>
            </div>
            
            <div class="preview-whiteboard" id="previewWhiteboard">
                <?php include 'templates/effect-demo.php'; ?>
            </div>
            
            <div class="preview-code" id="previewCode">
                <div class="code-tabs">
                    <button class="code-tab active" data-tab="html">HTML</button>
                    <button class="code-tab" data-tab="css">CSS</button>
                    <button class="code-tab" data-tab="js">JavaScript</button>
                </div>
                <div class="code-content">
                    <pre><code id="codeDisplay"><?php echo htmlspecialchars($htmlContent); ?></code></pre>
                </div>
            </div>
        </div>
    </section>
    
    <footer>
        <div class="footer-content">
            <p>Created with <i class="fas fa-heart pulse"></i> for web developers</p>
            <div class="social-links">
                <a href="#"><i class="fab fa-github"></i></a>
                <a href="#"><i class="fab fa-twitter"></i></a>
                <a href="#"><i class="fab fa-codepen"></i></a>
            </div>
        </div>
    </footer>
</div>

<?php include 'templates/footer.php'; ?>
