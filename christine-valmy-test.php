<?php
/*
Plugin Name: Christine Valmy Test
Description: Chat interface for the original beauty school in New York, Christine Valmy.
Version: 1.0.0
Author: Sentry Skin
*/

// Security check
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('CVT_PLUGIN_URL', plugin_dir_url(__FILE__));
define('CVT_PLUGIN_PATH', plugin_dir_path(__FILE__));
define('CVT_PLUGIN_VERSION', '1.0.0');

// Development mode - set to true for live development
define('CVT_DEV_MODE', true);
define('CVT_DEV_SERVER_URL', 'http://localhost:3000');

// Add menu to WordPress admin
function cvt_add_menu() {
    add_menu_page(
        'Christine Valmy Test', 
        'CVT Test', 
        'manage_options',
        'christine-valmy-test',
        'cvt_settings_page',
        'dashicons-admin-generic',
        30
    );
}
add_action('admin_menu', 'cvt_add_menu');

// Create settings page
function cvt_settings_page() {
    ?>
    <div class="wrap">
        <h2>Christine Valmy Test Settings</h2>
        <p>This plugin adds a React interface to your frontend pages.</p>
        <h3>How to use:</h3>
        <ol>
            <li>Add the shortcode <code>[christine_valmy_test]</code> to any page or post</li>
            <li>The React interface will appear on the frontend</li>
            <li>Visitors can interact with the form and save data</li>
        </ol>
        <h3>Shortcode:</h3>
        <code>[christine_valmy_test]</code>
        
        <?php if (CVT_DEV_MODE): ?>
        <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; margin-top: 20px; border-radius: 4px;">
            <h4>🚀 Development Mode Active</h4>
            <p>Make sure your React dev server is running:</p>
            <code>npm start</code>
            <p>Changes will be visible instantly without rebuilding!</p>
        </div>
        <?php endif; ?>
    </div>
    <?php
}

// Get asset filenames from manifest
function cvt_get_asset_files() {
    $manifest_path = CVT_PLUGIN_PATH . 'build/asset-manifest.json';
    if (file_exists($manifest_path)) {
        $manifest = json_decode(file_get_contents($manifest_path), true);
        if ($manifest && isset($manifest['files'])) {
            return array(
                'js' => str_replace('./', '', $manifest['files']['main.js']),
                'css' => str_replace('./', '', $manifest['files']['main.css'])
            );
        }
    }
    // Fallback to default filenames
    return array(
        'js' => 'static/js/main.js',
        'css' => 'static/css/main.css'
    );
}

// Add shortcode for frontend
function cvt_shortcode() {
    ob_start();
    ?>
    <div id="cvt-frontend-app"></div>
    <script>
        // WordPress AJAX data for React app
        window.cvtAjax = {
            ajaxurl: '<?php echo admin_url('admin-ajax.php'); ?>',
            nonce: '<?php echo wp_create_nonce('cvt_nonce'); ?>',
            pluginUrl: '<?php echo CVT_PLUGIN_URL; ?>',
            logoUrl: '<?php echo CVT_PLUGIN_URL; ?>public/images/logos/cv logo round.svg'
        };
        
        <?php if (CVT_DEV_MODE): ?>
        // Development mode - load from React dev server
        const script = document.createElement('script');
        script.src = '<?php echo CVT_DEV_SERVER_URL; ?>/static/js/bundle.js';
        script.onload = function() {
            console.log('React dev server loaded successfully');
        };
        script.onerror = function() {
            console.error('Failed to load React dev server. Make sure npm start is running.');
            // Fallback to built files if dev server is not available
            loadProductionFiles();
        };
        document.head.appendChild(script);
        
        // Load CSS from dev server
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = '<?php echo CVT_DEV_SERVER_URL; ?>/static/css/main.css';
        document.head.appendChild(link);
        
        <?php else: ?>
        // Production mode - load built files
        loadProductionFiles();
        <?php endif; ?>
        
        function loadProductionFiles() {
            <?php 
            $assets = cvt_get_asset_files();
            ?>
            const script = document.createElement('script');
            script.src = '<?php echo CVT_PLUGIN_URL; ?>build/<?php echo $assets['js']; ?>';
            script.onload = function() {
                // Initialize frontend app
                if (window.CVTApp) {
                    window.CVTApp.initFrontend();
                }
            };
            document.head.appendChild(script);
            
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = '<?php echo CVT_PLUGIN_URL; ?>build/<?php echo $assets['css']; ?>';
            document.head.appendChild(link);
        }
    </script>
    <?php
    return ob_get_clean();
}
add_shortcode('christine_valmy_test', 'cvt_shortcode');

// AJAX handlers
function cvt_ajax_handler() {
    check_ajax_referer('cvt_nonce', 'nonce');
    
    $action = sanitize_text_field($_POST['action']);
    
    switch ($action) {
        case 'cvt_save_data':
            $data = sanitize_text_field($_POST['data']);
            update_option('cvt_saved_data', $data);
            wp_send_json_success('Data saved successfully');
            break;
            
        case 'cvt_get_data':
            $data = get_option('cvt_saved_data', '');
            wp_send_json_success($data);
            break;
            
        default:
            wp_send_json_error('Invalid action');
    }
}
add_action('wp_ajax_cvt_ajax_handler', 'cvt_ajax_handler');

// Activation hook
function cvt_activate() {
    // Create necessary database tables or options
    add_option('cvt_saved_data', '');
}
register_activation_hook(__FILE__, 'cvt_activate');

// Deactivation hook
function cvt_deactivate() {
    // Cleanup if needed
}
register_deactivation_hook(__FILE__, 'cvt_deactivate'); 