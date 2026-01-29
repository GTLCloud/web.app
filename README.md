# Pauline Portfolio Website

A modern, responsive portfolio website for Pauline, showcasing her expertise as a Web Designer and French-English Translator.

## Features

- **Fully Responsive Design**: Mobile-first approach with breakpoints for mobile, tablet, and desktop
- **Modern UI/UX**: Clean, minimalist design with sophisticated typography and subtle animations
- **Accessibility**: WCAG 2.1 AA compliant with proper ARIA labels, keyboard navigation, and focus indicators
- **Performance Optimized**: Fast loading with optimized fonts, lazy loading support, and efficient CSS/JS
- **Portfolio Showcase**: Filterable portfolio section with modal views for project details
- **Contact Form**: Fully functional contact form with validation
- **Smooth Animations**: Scroll-triggered animations using Intersection Observer API

## Technology Stack

- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Modern CSS with custom properties, Grid, and Flexbox
- **Vanilla JavaScript**: No frameworks, pure JavaScript for optimal performance
- **Google Fonts**: Inter (sans-serif) and Playfair Display (serif)

## File Structure

```
pauline-portfolio/
├── index.html          # Main HTML structure
├── css/
│   ├── style.css       # Main stylesheet with CSS variables
│   └── animations.css  # Animation keyframes and transitions
├── js/
│   ├── main.js         # Navigation, forms, portfolio functionality
│   └── animations.js   # Scroll-triggered animations
├── assets/
│   └── images/         # Portfolio images and icons
└── README.md           # This file
```

## Getting Started

1. Clone or download this repository
2. Open `index.html` in a modern web browser
3. For local development, use a local server (recommended):
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js (http-server)
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```

## Customization

### Colors

Edit CSS variables in `css/style.css`:

```css
:root {
    --color-primary: #2c3e50;
    --color-accent: #d4af37;
    --color-background: #fafafa;
    /* ... */
}
```

### Typography

Fonts are loaded from Google Fonts. To change fonts, update the font link in `index.html` and the CSS variables in `css/style.css`.

### Content

Replace placeholder content in `index.html`:
- Hero section introduction
- About section bio and skills
- Portfolio items (add real project images and descriptions)
- Services descriptions
- Testimonials
- Contact information

### Portfolio Items

To add new portfolio items:
1. Add a new `<article>` element in the portfolio grid
2. Update the `portfolioData` object in `js/main.js` with project details
3. Add corresponding images to `assets/images/`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Considerations

- Fonts use `display=swap` for optimal loading
- CSS and JS files are minified-ready (minify for production)
- Images should be optimized (WebP format recommended with fallbacks)
- Consider using a CDN for fonts and assets in production

## Accessibility

The website includes:
- Semantic HTML5 elements
- ARIA labels and roles
- Keyboard navigation support
- Focus indicators
- Skip links
- Proper color contrast ratios (WCAG AA compliant)
- Screen reader friendly markup

## Deployment

1. Optimize images (compress and convert to WebP if possible)
2. Minify CSS and JavaScript files
3. Update contact form action URL (currently uses placeholder)
4. Update social media links
5. Add analytics tracking code if desired
6. Upload files to your web hosting service

## License

This project is created for Pauline's personal portfolio. All rights reserved.

## Contact

For questions or support, please contact Pauline through the contact form on the website.

