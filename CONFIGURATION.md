# Portfolio Configuration Guide

## Quick Edit Variables

### Personal Information
Update in `index.html`:

```html
<!-- Hero Section -->
<h1>Shubham Jagadale</h1>
<p class="subtitle">Your Title Here</p>
<p class="hero-meta">
    <span>📧 <a href="mailto:your-email@domain.com">your-email@domain.com</a></span>
    <span>📱 <a href="tel:+91XXXXXXXXXX">+91 XXXXXXXXXX</a></span>
</p>
```

### Color Scheme
Edit in `styles.css`:

```css
:root {
    --primary: #0a0e27;        /* Main brand color */
    --accent: #00d4ff;         /* Highlight/CTA color */
    --text: #1a1a1a;           /* Body text */
    --bg: #ffffff;             /* Background */
    --text-light: #666;        /* Secondary text */
}
```

### Recommended Color Combinations

**Tech Professional (Current)**
- Primary: #0a0e27 (Dark Navy)
- Accent: #00d4ff (Cyan Blue)

**Modern Developer**
- Primary: #1a1a2e (Charcoal)
- Accent: #16c784 (Green)

**Corporate Professional**
- Primary: #003366 (Navy)
- Accent: #ff6b35 (Orange)

**Creative/Startup**
- Primary: #2d3436 (Dark)
- Accent: #a29bfe (Purple)

## Timeline Entry Template

```html
<div class="timeline-item">
    <div class="timeline-marker"></div>
    <div class="timeline-content">
        <h3>Your Job Title</h3>
        <p class="company">Company Name</p>
        <p class="date">Month Year - Present <span class="duration">(X months)</span></p>
        <p class="location">City, Country</p>
        <ul class="achievements">
            <li>Achievement 1 with metrics</li>
            <li>Achievement 2 with impact</li>
            <li>Achievement 3 with result</li>
        </ul>
    </div>
</div>
```

## Project Card Template

```html
<div class="project-card">
    <div class="project-header">
        <h3>Project Name</h3>
        <span class="project-tag">Technology/Category</span>
    </div>
    <p>Brief description of what was accomplished and business impact.</p>
    <div class="project-tech">Tech1 • Tech2 • Tech3</div>
</div>
```

## Best Practices

### Headlines
- ✅ "Architected 99% uptime Kubernetes infrastructure"
- ❌ "Worked on Kubernetes stuff"

### Descriptions
- ✅ "Reduced deployment time from 2 hours to 12 minutes"
- ❌ "Implemented deployment process"

### Skills Display
Show 6-10 top skills. Focus on:
- Current market demand
- Your strongest expertise
- What you want to do next

### Project Metrics
Include:
- Scale (e.g., 100M+ events/day)
- Impact (e.g., 60% reduction in downtime)
- Technology used
- Business outcome

## Contact Form Integration

### Option 1: Webhook Service (Recommended - Free)

```javascript
// In script.js, replace the setTimeout block:

setTimeout(() => {
    // Send to webhook
    fetch('https://your-webhook.webhook.cool/contact', {
        method: 'POST',
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (response.ok) {
            contactForm.reset();
            showFormMessage('Message sent successfully!', 'success');
        }
    })
    .catch(error => {
        showFormMessage('Error sending message. Please try again.', 'error');
    });
}, 1000);
```

**Free Services:**
- https://webhook.cool
- https://formspree.io
- https://getform.io
- https://formsubmit.co

### Option 2: EmailJS (No Backend)

```html
<!-- Add to HTML head -->
<script type="text/javascript" src="https://cdn.emailjs.com/sdk/2.11.0/email.min.js"></script>

<!-- In script.js -->
emailjs.init('YOUR_PUBLIC_KEY');

// Send email
emailjs.send('service_id', 'template_id', formData)
    .then(() => {
        showFormMessage('Email sent successfully!', 'success');
    });
```

### Option 3: Backend API

```javascript
// In script.js:
fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
})
```

## Analytics Setup

### Google Analytics 4

```html
<!-- Add to HTML head -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-YOUR-ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-YOUR-ID');
</script>
```

### Key Events to Track
- Form submission
- Navigation clicks
- Project card clicks
- External link clicks

## Favicon Setup

```html
<!-- Add to HTML head -->
<link rel="icon" type="image/png" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90' fill='%230a0e27' font-weight='bold'>SJ</text></svg>">
```

## Open Graph (Social Sharing)

```html
<!-- Add to HTML head -->
<meta property="og:title" content="Shubham Jagadale - MLOps & DevOps Engineer">
<meta property="og:description" content="Building resilient systems that scale. 6+ years of DevOps expertise.">
<meta property="og:image" content="https://your-domain.com/og-image.jpg">
<meta property="og:url" content="https://your-domain.com">
<meta name="twitter:card" content="summary_large_image">
```

## Mobile Testing

Use these tools:
- Chrome DevTools (F12)
- https://responsively.app
- https://mobiletest.me
- Physical device testing

## Performance Optimization Checklist

- [ ] Images optimized (< 100KB each)
- [ ] CSS minified (if modifying)
- [ ] JavaScript minified (if adding code)
- [ ] Caching headers configured
- [ ] GZIP compression enabled
- [ ] Lighthouse score > 90
- [ ] PageSpeed Insights green
- [ ] Fonts optimized (system fonts preferred)

## Deployment Commands

### Netlify
```bash
netlify deploy --prod --dir=.
```

### GitHub Pages
```bash
git add .
git commit -m "Update portfolio"
git push origin main
```

### FTP
```bash
# Upload all files to public_html/
# Use FileZilla or similar FTP client
```

## Monitoring & Maintenance

### Monthly Tasks
- [ ] Check form submissions
- [ ] Review analytics
- [ ] Update project metrics
- [ ] Check for broken links
- [ ] Test form functionality

### Quarterly Tasks
- [ ] Update experience (new projects)
- [ ] Refresh skills list
- [ ] Review and improve copy
- [ ] Check SEO metrics
- [ ] Update certifications

---

**Need Help?**
- Consult README.md for general information
- Check inline HTML comments for structure
- Review CSS variables for styling options
