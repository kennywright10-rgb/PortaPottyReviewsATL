# Step-by-Step Deployment Guide

## Quick Start Checklist

- [ ] Install Node.js and npm
- [ ] Install Vercel CLI
- [ ] Create Vercel account
- [ ] Set up Blob Storage
- [ ] Deploy site
- [ ] Configure environment variables
- [ ] Test admin panel
- [ ] Change admin password
- [ ] Add your companies

---

## Detailed Instructions

### Prerequisites

1. **Install Node.js** (if not already installed)
   - Download from: https://nodejs.org/
   - Choose LTS version
   - Verify installation: `node --version` and `npm --version`

2. **Create Vercel Account**
   - Go to: https://vercel.com/signup
   - Sign up with GitHub, GitLab, or Bitbucket (recommended) or email

### Step 1: Install Vercel CLI

Open your terminal/command prompt and run:

```bash
npm install -g vercel
```

Verify installation:
```bash
vercel --version
```

### Step 2: Prepare Your Project

1. Download/extract your project files to a folder
2. Open terminal in that folder
3. Verify these files exist:
   - `index.html`
   - `package.json`
   - `vercel.json`
   - `api/data.js`

### Step 3: Login to Vercel

```bash
vercel login
```

This will open a browser window. Click "Continue" to authenticate.

### Step 4: Initial Deploy

From your project directory:

```bash
vercel
```

Answer the prompts:

**Set up and deploy?** → Yes  
**Which scope?** → Select your account  
**Link to existing project?** → No  
**What's your project's name?** → `atlanta-porta-potty-reviews` (or your choice)  
**In which directory is your code located?** → `./`  
**Want to modify these settings?** → No  

Vercel will deploy your site and give you a preview URL like:
`https://atlanta-porta-potty-reviews-xxxxx.vercel.app`

### Step 5: Set Up Blob Storage

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Select your project: `atlanta-porta-potty-reviews`
3. Click on the "Storage" tab
4. Click "Create Database"
5. Choose "Blob"
6. Click "Continue"
7. Name it: `portapotty-data`
8. Click "Create"

### Step 6: Get Your Blob Token

1. In the Blob Storage dashboard, you'll see connection details
2. Copy the `BLOB_READ_WRITE_TOKEN` value
3. Keep this secure - you'll need it in the next step

### Step 7: Add Environment Variable

**Option A: Via CLI (Recommended)**

```bash
vercel env add BLOB_READ_WRITE_TOKEN
```

When prompted:
- **Value**: Paste your token
- **Environments**: Select all (Production, Preview, Development)

**Option B: Via Dashboard**

1. Go to your project settings
2. Click "Environment Variables"
3. Add new variable:
   - **Name**: `BLOB_READ_WRITE_TOKEN`
   - **Value**: Your token
   - **Environments**: Check all boxes
4. Click "Save"

### Step 8: Deploy to Production

```bash
vercel --prod
```

Your site will be live at: `https://atlanta-porta-potty-reviews.vercel.app`

### Step 9: Set Up Custom Domain (Optional)

1. In Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add your domain (e.g., `atlmetropp.com`)
4. Follow DNS instructions to point your domain to Vercel
5. Vercel will automatically provision SSL certificate

Common DNS providers:
- **GoDaddy**: Add CNAME record
- **Cloudflare**: Add CNAME record (turn off proxy initially)
- **Namecheap**: Add CNAME record

### Step 10: Test Your Site

1. Visit your deployed URL
2. Browse cities and companies
3. Scroll to bottom, click the dot (•) to access admin
4. Login with:
   - Username: `admin`
   - Password: `patriot2026`

### Step 11: Secure Your Admin Panel

**CRITICAL: Change the admin password immediately!**

1. Download your `index.html` file from your project
2. Search for this function: `async function adminLogin()`
3. Find this line:
   ```javascript
   if (username === 'admin' && password === 'patriot2026') {
   ```
4. Change `'admin'` and `'patriot2026'` to your secure credentials
5. Save the file
6. Redeploy:
   ```bash
   vercel --prod
   ```

**Better Security (Recommended):**
Consider implementing:
- Environment variables for credentials
- JWT tokens
- OAuth authentication
- Two-factor authentication

### Step 12: Add Your Content

1. Access admin panel (click dot in footer)
2. Login with your credentials
3. Add cities if needed
4. Add companies:
   - Click "Add New Company"
   - Fill in all required fields
   - Add reviews
   - Save

---

## Troubleshooting

### Problem: "BLOB_READ_WRITE_TOKEN is not defined"

**Solution:**
1. Make sure you added the environment variable
2. Redeploy after adding environment variables
3. Check that the token is correct in Vercel dashboard

### Problem: Admin panel doesn't save data

**Solution:**
1. Check browser console for errors (F12)
2. Verify Blob token is set correctly
3. Make sure you're using the production URL, not preview URL
4. Check Vercel function logs in dashboard

### Problem: Can't access admin panel

**Solution:**
1. Clear browser cache
2. Try different browser
3. Check that you're clicking the small dot in the footer
4. Verify site is fully deployed

### Problem: Data not persisting

**Solution:**
1. Verify Blob storage is created
2. Check environment variable is set
3. Look at Vercel function logs
4. Try recreating the Blob store

### Problem: 500 error on API calls

**Solution:**
1. Check Vercel function logs
2. Verify API route is deployed: visit `your-url.com/api/data`
3. Make sure `@vercel/blob` package is installed
4. Redeploy with `vercel --prod`

---

## Updating Your Site

### Update Content (via Admin Panel)
1. Login to admin panel
2. Make changes
3. Changes are live immediately

### Update Code
1. Edit files locally
2. Run `vercel --prod` to deploy changes
3. Wait for deployment to complete

### Check Deployment Status
```bash
vercel ls
```

### View Logs
```bash
vercel logs
```

Or view in Vercel dashboard under "Logs" tab

---

## Maintenance

### Regular Backups

There's no automatic backup for Vercel Blob. To backup your data:

1. Access admin panel
2. Open browser console (F12)
3. Run: 
   ```javascript
   fetch('/api/data').then(r => r.json()).then(data => {
     console.log(JSON.stringify(data, null, 2));
   });
   ```
4. Copy the JSON output and save to a file

### Monitoring

- Check Vercel Analytics in dashboard
- Monitor function execution times
- Watch for error rates

### Security Updates

- Regularly update dependencies:
  ```bash
  npm update
  vercel --prod
  ```
- Change admin password periodically
- Monitor access logs

---

## Common Commands

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod

# View deployments
vercel ls

# View logs
vercel logs

# Remove deployment
vercel rm [deployment-url]

# View project info
vercel inspect

# Link to existing project
vercel link

# Pull environment variables
vercel env pull
```

---

## Getting Help

### Vercel Support
- Documentation: https://vercel.com/docs
- Community: https://github.com/vercel/vercel/discussions
- Support: support@vercel.com (for paid plans)

### Project-Specific Issues
- Check browser console for errors
- Check Vercel function logs
- Verify environment variables are set
- Ensure Blob storage is properly configured

---

## Next Steps After Deployment

1. **Add Content**: Use admin panel to add all your companies
2. **SEO**: Submit to Google Search Console
3. **Analytics**: Set up Vercel Analytics or Google Analytics
4. **Custom Domain**: Point your domain to Vercel
5. **Social Media**: Share your site
6. **Backlinks**: Get listed in local directories
7. **Updates**: Regularly add new reviews and companies

---

**Congratulations! Your site is now live! 🎉**

Visit your admin panel and start adding companies to make your review site complete.
