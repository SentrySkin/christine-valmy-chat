# Development Setup Guide

## 🚀 Live Development (No Rebuilding Required!)

### Step 1: Start React Development Server
```bash
cd /c/xampp/htdocs/wordpress/wp-content/plugins/christine-valmy-test
npm start
```

This will start the React dev server on `http://localhost:3000`

### Step 2: WordPress Plugin is Already Configured
The WordPress plugin (`christine-valmy-test.php`) is set to development mode:
- `CVT_DEV_MODE = true`
- It will load files directly from the React dev server
- Changes are visible instantly!

### Step 3: Test in WordPress
1. Go to your WordPress site
2. Add the shortcode `[christine_valmy_test]` to any page/post
3. View the page - you should see your React app
4. Make changes to any React files (App.js, App.css, variables.css, etc.)
5. Changes appear instantly without rebuilding!

## 🔧 How It Works

### Development Mode
- WordPress plugin loads React files from `http://localhost:3000`
- Hot reloading works automatically
- No need to run `npm run build`

### Production Mode
To switch to production:
1. Set `CVT_DEV_MODE = false` in `christine-valmy-test.php`
2. Run `npm run build`
3. WordPress will load built files from `build/` directory

## 📁 File Structure
```
christine-valmy-test/
├── src/
│   ├── App.js          ← Edit this for React logic
│   ├── App.css         ← Edit this for styles
│   ├── variables.css   ← Edit this for design tokens
│   ├── index.js        ← WordPress integration
│   └── fonts/          ← Custom fonts
├── christine-valmy-test.php  ← WordPress plugin
└── package.json
```

## 🎨 Making Changes

### CSS Changes
- Edit `src/variables.css` for colors, fonts, spacing
- Edit `src/App.css` for component styles
- Changes appear instantly in WordPress

### React Changes
- Edit `src/App.js` for component logic
- Hot reloading works automatically
- No page refresh needed

### Font Changes
- Fonts are loaded from `src/fonts/`
- Update `src/vonts.css` for font configurations
- Changes apply immediately

## 🐛 Troubleshooting

### React App Not Loading
1. Make sure `npm start` is running
2. Check browser console for errors
3. Verify `CVT_DEV_MODE = true` in PHP file

### Fonts Not Loading
1. Check font file paths in `src/vonts.css`
2. Verify font files exist in `src/fonts/`
3. Check browser network tab for 404 errors

### WordPress Integration Issues
1. Make sure shortcode `[christine_valmy_test]` is added to page
2. Check WordPress debug log
3. Verify plugin is activated

## 🚀 Quick Start Commands

```bash
# Start development server
npm start

# Build for production (when ready to deploy)
npm run build

# Stop development server
Ctrl + C
```

## 📝 Notes
- Development mode loads from `localhost:3000`
- Production mode loads from `build/` directory
- Hot reloading works in development mode
- WordPress integration is automatic
- No rebuilding required during development! 