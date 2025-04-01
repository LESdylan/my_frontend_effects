<?php
// Load effect data from configuration
$effectsData = json_decode(file_get_contents('config/effects.json'), true);
$categories = $effectsData['categories'];

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
    
    <main class="effects-grid">
        <?php foreach ($categories as $category): ?>
        <div class="category">
            <div class="category-header">
                <i class="<?php echo $category['icon']; ?>"></i>
                <h2><?php echo $category['name']; ?></h2>
            </div>
            <div class="effects-list">
                <?php foreach ($category['effects'] as $effect): ?>
                <?php include 'templates/effect-card.php'; ?>
                <?php endforeach; ?>
            </div>
        </div>
        <?php endforeach; ?>
    </main>

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
