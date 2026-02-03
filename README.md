# Atlanta Metro Porta Potty Reviews

A comprehensive review site for porta potty rental companies in the Atlanta Metro area with a full admin panel for managing listings.

## Features

- **8 Metro Cities**: Atlanta, Alpharetta, Marietta, Roswell, Sandy Springs, Johns Creek, Duluth, Lawrenceville
- **Full Admin Panel**: Add, edit, and delete companies and cities
- **Persistent Storage**: Uses Vercel Blob for database storage
- **Responsive Design**: Works on desktop, tablet, and mobile
- **SEO Optimized**: Proper meta tags and semantic HTML
- **Search & Filter**: Find companies by city or search terms
- **Review Management**: Add and manage customer reviews for each company

## Deployment to Vercel

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

### Step 3: Set up Vercel Blob Storage

1. Go to your Vercel dashboard (https://vercel.com/dashboard)
2. Create a new project or select an existing one
3. Go to Storage tab
4. Create a new Blob Store
5. Copy the `BLOB_READ_WRITE_TOKEN` from the store settings

### Step 4: Deploy

From the project directory:

```bash
vercel
```

Follow the prompts:
- Set up and deploy: Yes
- Which scope: Select your account
- Link to existing project: No (or Yes if you created one)
- What's your project's name: atlanta-porta-potty-reviews
- In which directory is your code located: ./
- Want to override settings: No

### Step 5: Set Environment Variables

After deployment, set the Blob token:

```bash
vercel env add BLOB_READ_WRITE_TOKEN
```

Paste your `BLOB_READ_WRITE_TOKEN` when prompted.

Then redeploy:

```bash
vercel --prod
```

## Admin Panel Access

### Login Credentials (CHANGE THESE!)

- **Username**: admin
- **Password**: patriot2026

⚠️ **IMPORTANT**: After deploying, immediately change these credentials in the `index.html` file (search for "adminLogin" function).

### Accessing Admin Panel

1. Go to your site
2. Scroll to the bottom of the page
3. Click the tiny dot (•) in the footer
4. Login with admin credentials

### Admin Features

#### Manage Companies
- Add new companies
- Edit existing companies
- Delete companies
- Add/edit reviews for each company
- Filter companies by city

#### Manage Cities
- Add new cities
- Edit city names and slugs
- Delete cities (only if no companies assigned)

### Company Fields

- **Name**: Company name
- **City**: Which city the company serves
- **Phone**: Contact phone number
- **Location**: Service area description
- **Rating**: 1-5 star rating
- **Review Count**: Total number of reviews
- **Hours**: Operating hours (optional)
- **Website**: Company website URL (optional)
- **Badges**: Special badges (comma-separated, optional)
- **Services**: Services offered (comma-separated, required)
- **Reviews**: Customer testimonials with name, rating, and text

## File Structure

```
.
├── index.html          # Main site file
├── api/
│   └── data.js        # API endpoint for Vercel Blob
├── package.json       # Dependencies
├── vercel.json        # Vercel configuration
└── README.md          # This file
```

## How It Works

### Data Storage

All data is stored in Vercel Blob Storage as a JSON file. The structure is:

```json
{
  "cities": [
    {
      "id": "atlanta",
      "name": "Atlanta",
      "slug": "atlanta"
    }
  ],
  "companies": [
    {
      "id": "company-id",
      "name": "Company Name",
      "city": "atlanta",
      "rating": 5,
      "reviewCount": 127,
      "phone": "(678) 456-3488",
      "location": "Serving Atlanta",
      "hours": "Same Day Delivery",
      "website": "https://example.com",
      "badges": ["Veteran Owned"],
      "services": ["Service 1", "Service 2"],
      "reviews": [
        {
          "name": "John D.",
          "rating": 5,
          "text": "Great service!"
        }
      ]
    }
  ]
}
```

### API Endpoints

- **GET /api/data**: Retrieve all data
- **POST /api/data**: Save updated data

## Customization

### Changing Colors

The site uses blue color scheme matching Patriot Portables:
- Primary Blue: `#1a3a6b` and `#2c5aa0`
- Accent Red: `#dc143c`

To change colors, search for these hex codes in `index.html` and replace them.

### Changing Contact Information

Current contact info:
- **Phone**: (678) 456-3488
- **Email**: info@atlmetropp.com

Search for these in `index.html` to update.

### Adding Default Companies

Default companies are set in the `getDefaultData()` function in `index.html` and in the API endpoint `api/data.js`. You can edit these to pre-populate more companies.

## Security Notes

1. **Change Admin Password**: The default password is in plain text in the code. Change it immediately after deployment.
2. **Consider Better Auth**: For production, consider implementing proper authentication (JWT tokens, OAuth, etc.)
3. **Rate Limiting**: Consider adding rate limiting to the API endpoint
4. **HTTPS Only**: Vercel serves over HTTPS by default, but ensure all external resources use HTTPS too

## SEO Tips

1. Add your site to Google Search Console
2. Submit sitemap (you may want to generate one)
3. Add structured data (schema.org) for local businesses
4. Optimize meta descriptions for each city
5. Create city-specific landing pages with unique content
6. Build backlinks from local directories

## Support

For issues with:
- **Vercel Deployment**: Check Vercel documentation (https://vercel.com/docs)
- **Blob Storage**: Check Vercel Blob docs (https://vercel.com/docs/storage/vercel-blob)

## License

This project is provided as-is for Atlanta Metro Porta Potty Reviews.

---

**Built for Patriot Portables** | Atlanta Metro's Leading Porta Potty Review Site
