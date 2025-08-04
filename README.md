# Christine Valmy Chat Interface

A modern React-based chat interface for Christine Valmy, the original beauty school in New York. This WordPress plugin provides an interactive chat experience with AI integration capabilities.

## 🚀 Features

- **Modern React Interface**: Clean, responsive chat UI
- **WordPress Integration**: Seamless plugin integration
- **Custom Fonts**: Sweet Sans fonts with Poppins fallback
- **Live Development**: Hot reloading without rebuilding
- **AI Ready**: Prepared for n8n + Vertex AI integration
- **CSS Variables**: Maintainable design system
- **Responsive Design**: Works on all devices

## 🎨 Design System

### Colors
- **Primary**: Christine Valmy Green (#006747)
- **Secondary**: Light Sage (#BFCEC2)
- **Accent**: Warm Cream (#FFECD5)

### Typography
- **Primary Font**: Sweet Sans
- **Secondary Font**: Sweet Sans SC (Small Caps)
- **Fallback**: Poppins (Google Fonts)

## 📦 Installation

### Prerequisites
- WordPress site
- Node.js (v14 or higher)
- npm or yarn

### Setup
1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/christine-valmy-test.git
   cd christine-valmy-test
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Activate WordPress plugin**
   - Copy the plugin folder to `wp-content/plugins/`
   - Activate "Christine Valmy Test" in WordPress admin

4. **Add to your page**
   - Use shortcode: `[christine_valmy_test]`

## 🛠️ Development

### Live Development (Recommended)
```bash
# Start React dev server
npm start

# Make changes to files in src/
# Changes appear instantly in WordPress!
```

### Production Build
```bash
# Build for production
npm run build

# Set CVT_DEV_MODE = false in christine-valmy-test.php
```

## 📁 Project Structure

```
christine-valmy-test/
├── src/
│   ├── App.js              # Main React component
│   ├── App.css             # Component styles
│   ├── variables.css       # CSS variables & design tokens
│   ├── fonts.css           # Font definitions
│   ├── index.js            # WordPress integration
│   └── fonts/              # Custom font files
│       ├── Sweet - SweetSans-Regular.otf
│       └── Sweet - SweetSans-SC.otf
├── christine-valmy-test.php # WordPress plugin
├── package.json
├── .gitignore
└── README.md
```

## 🔧 Configuration

### Development Mode
The plugin supports live development:
- `CVT_DEV_MODE = true` - Loads from React dev server
- `CVT_DEV_MODE = false` - Loads built files

### Environment Variables
Create `.env` file for production:
```env
REACT_APP_N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/chat
```

## 🤖 AI Integration

This project is prepared for AI integration:

1. **n8n Workflow**: Set up webhook endpoint
2. **Google Cloud Vertex AI**: Configure for responses
3. **React Integration**: Already implemented in App.js

See `N8N_SETUP.md` for detailed integration guide.

## 🎯 Usage

### WordPress Shortcode
```php
[christine_valmy_test]
```

### Customization
- **Colors**: Edit `src/variables.css`
- **Styles**: Edit `src/App.css`
- **Logic**: Edit `src/App.js`
- **Fonts**: Edit `src/fonts.css`

## 🚀 Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Set production mode**
   - Set `CVT_DEV_MODE = false` in PHP file

3. **Upload to WordPress**
   - Upload plugin folder to `wp-content/plugins/`
   - Activate plugin

## 🐛 Troubleshooting

### Development Issues
- Ensure `npm start` is running
- Check browser console for errors
- Verify `CVT_DEV_MODE = true`

### Font Issues
- Verify font files exist in `src/fonts/`
- Check font paths in `src/fonts.css`

### WordPress Issues
- Ensure plugin is activated
- Check shortcode is properly added
- Verify file permissions

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is proprietary to Christine Valmy.

## 🏢 About Christine Valmy

Christine Valmy is the original beauty school in New York, established in 1963. This chat interface represents the modern digital presence of this iconic institution.

## 📞 Support

For support or questions, please contact the development team.

---

**Built with ❤️ for Christine Valmy** 