# 🚀 Deployment Guide

## Building for Production

### Build the App

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

### Preview the Build

```bash
npm run preview
```

Test the production build locally before deploying.

---

## Deployment Options

### 1. 🎯 Vercel (Recommended)

**Why Vercel?**
- Free tier available
- Automatic HTTPS
- Global CDN
- Zero configuration for Vite apps

**Steps**:

1. Install Vercel CLI (optional):
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Follow the prompts

**Or use the Vercel website**:
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Vercel auto-detects Vite
4. Click "Deploy"

### Configuration File
Already included: `vercel.json`

---

### 2. 🌐 Netlify

**Steps**:

1. Go to [netlify.com](https://netlify.com)
2. Drag and drop the `dist` folder
3. Or connect your GitHub repository

**Build Settings**:
- Build command: `npm run build`
- Publish directory: `dist`

---

### 3. 📦 GitHub Pages

**Steps**:

1. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Add to `package.json`:
   ```json
   {
     "homepage": "https://yourusername.github.io/electricians-spellbook",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. Update `vite.config.ts`:
   ```typescript
   export default defineConfig({
     base: '/electricians-spellbook/',
     // ... rest of config
   })
   ```

4. Deploy:
   ```bash
   npm run deploy
   ```

---

### 4. 🔥 Firebase Hosting

**Steps**:

1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Login:
   ```bash
   firebase login
   ```

3. Initialize:
   ```bash
   firebase init hosting
   ```

4. Configure:
   - Public directory: `dist`
   - Single-page app: Yes
   - GitHub integration: Optional

5. Deploy:
   ```bash
   npm run build
   firebase deploy
   ```

---

### 5. 📁 Static File Server

For simple hosting on any server:

1. Build the app:
   ```bash
   npm run build
   ```

2. Upload the `dist` folder to your server

3. Configure server to serve `index.html` for all routes

**Apache (.htaccess)**:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

**Nginx**:
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

---

## Environment Considerations

### Data Persistence
- All data is stored in browser LocalStorage
- No backend required
- Each user's data is local to their browser

### Security
- No sensitive data transmitted
- All calculations done client-side
- HTTPS recommended for production

### Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES2020+ JavaScript features
- CSS Grid and Flexbox

---

## Optimization Tips

### 1. Enable Compression
Most hosts enable this by default, but ensure gzip/brotli is enabled.

### 2. Cache Static Assets
Configure long cache times for JS/CSS files.

### 3. CDN
Use a CDN for faster global delivery (Vercel/Netlify include this).

### 4. Image Optimization
If adding photos feature, compress images before storing.

### 5. Progressive Web App (PWA)
Consider adding service worker for offline support:

```bash
npm install vite-plugin-pwa
```

Update `vite.config.ts`:
```typescript
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: "The Electrician's Spellbook",
        short_name: 'Spellbook',
        theme_color: '#2D1B4E',
        icons: [/* your icons */]
      }
    })
  ]
})
```

---

## Post-Deployment Checklist

- [ ] Test all calculators with real values
- [ ] Create and edit quests
- [ ] Add materials to vault
- [ ] Start/stop timer
- [ ] Add locations
- [ ] Search and filter features
- [ ] Mobile responsiveness
- [ ] Browser back/forward navigation
- [ ] Data persistence (refresh page)
- [ ] All links work
- [ ] No console errors

---

## Backup & Data Export

**Important**: Since data is stored locally, remind users to:

1. **Browser Backup**: Don't clear browser data
2. **Export Feature** (Future): Implement JSON export
3. **Cloud Sync** (Future): Optional feature for multi-device

**Manual Backup (Current)**:
1. Open DevTools (F12)
2. Application → LocalStorage
3. Copy the data
4. Save to file

---

## Custom Domain

### Vercel
1. Go to project settings
2. Add custom domain
3. Update DNS records as instructed

### Netlify
1. Domain settings
2. Add custom domain
3. Configure DNS

### GitHub Pages
1. Add `CNAME` file to `public` folder
2. Redeploy

---

## Troubleshooting Deployment

**Blank Page**:
- Check base URL in `vite.config.ts`
- Verify routing configuration
- Check browser console for errors

**Assets Not Loading**:
- Verify base path configuration
- Check network tab for 404s
- Ensure correct public directory

**Routing Issues**:
- Configure server for SPA
- Check `.htaccess` or nginx config
- Verify React Router basename

---

## Monitoring

Consider adding:
- Google Analytics
- Sentry for error tracking
- Performance monitoring

Example for Google Analytics:
```typescript
// Add to main.tsx or App.tsx
import ReactGA from 'react-ga4'

ReactGA.initialize('YOUR-GA-ID')
```

---

## Updates & Maintenance

**To Update**:
1. Make changes
2. Test locally with `npm run dev`
3. Build with `npm run build`
4. Preview with `npm run preview`
5. Deploy using chosen method

**Version Control**:
- Tag releases in git
- Keep changelog
- Test before deploying

---

*"It does not do to dwell on dreams and forget to live."* - Albus Dumbledore

But do deploy your code to production! ⚡✨

