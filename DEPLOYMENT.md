# CodeCritic AI - Netlify Deployment Guide

## 🚀 Quick Deploy to Netlify

### Option 1: Deploy from GitHub (Recommended)

1. **Connect to Netlify**
   - Go to [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Choose GitHub and select `CodeCritic-AI` repository

2. **Build Settings**
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/.next`
   - **Functions directory**: `netlify/functions`

3. **Environment Variables**
   Add these environment variables in Netlify dashboard:
   ```
   GOOGLE_API_KEY=your_google_gemini_api_key_here
   NODE_VERSION=18
   ```

4. **Deploy**
   - Click "Deploy site"
   - Wait for build to complete
   - Your site will be live at `https://your-site-name.netlify.app`

### Option 2: Netlify CLI Deploy

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**
   ```bash
   netlify login
   ```

3. **Build and Deploy**
   ```bash
   # Install dependencies
   npm run install:all
   
   # Build frontend
   cd frontend && npm run build && cd ..
   
   # Deploy to Netlify
   netlify deploy --prod --dir=frontend/.next --functions=netlify/functions
   ```

## ⚙️ Configuration Files

### netlify.toml
```toml
[build]
  base = "frontend"
  publish = "frontend/.next"
  command = "npm run build"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[functions]
  directory = "netlify/functions"
  node_bundler = "esbuild"
```

## 🔧 API Endpoints

After deployment, your API will be available at:
- **Health Check**: `https://your-site.netlify.app/api/health`
- **Code Analysis**: `https://your-site.netlify.app/api/analyze`

## 🌐 Environment Variables

Required environment variables for production:
- `GOOGLE_API_KEY`: Your Google Gemini Pro API key

## 📝 Post-Deployment Checklist

- [ ] Verify API endpoints are working
- [ ] Test code analysis functionality
- [ ] Update resume points with live URL
- [ ] Configure custom domain (optional)
- [ ] Set up monitoring (optional)

## 🔗 URLs to Update

After successful deployment, update:
1. **README.md**: Add live demo link
2. **RESUME_POINTS.md**: Replace `[deployment-url]` with actual URL
3. **GitHub repository**: Add website URL in repository settings

## 🐛 Troubleshooting

### Build Fails
- Check Node.js version (should be 18+)
- Verify all dependencies are in package.json
- Check build logs in Netlify dashboard

### API Not Working
- Verify `GOOGLE_API_KEY` environment variable is set
- Check function logs in Netlify dashboard
- Ensure CORS headers are properly configured

### Frontend Not Loading
- Check if build directory is correct (`frontend/.next`)
- Verify redirects in netlify.toml
- Check for client-side routing issues