/**
 * ============================================================================
 * WEBDORA PRICING & PACKAGE CONFIGURATION
 * ============================================================================
 * All packages represent custom website development, not recurring SaaS subscriptions.
 * All pricing is configured in Indian Rupees (₹).
 * 
 * To set exact prices, replace the placeholder strings below:
 * e.g. prices: { standard: '₹ 25,000', retainer: '₹ 35,000' }
 * ============================================================================
 */

export const PRICING_CONFIG = {
  currency: '₹',
  disclaimer: 'All packages are scoped based on custom project requirements. Exact pricing and domain terms are confirmed upon final scope agreement. Domain costs are excluded unless confirmed.',
  
  // Package delivery options for toggle
  toggleOptions: [
    { id: 'standard', label: 'One-Time Build', description: 'Standard project delivery scope' },
    { id: 'retainer', label: 'Build + Care Support', description: 'Includes post-launch technical & SEO maintenance' },
  ],

  plans: [
    {
      id: 'basic',
      name: 'Basic',
      badge: 'Entry-Level Website',
      tagline: 'Simple business showcase website, portfolio, or landing page.',
      prices: {
        standard: '₹ [Custom Quote]',
        retainer: '₹ [Scope-Based]',
      },
      units: {
        standard: 'one-time project',
        retainer: 'build + monthly retainer',
      },
      description: 'Ideal for small ventures, freelancers, and independent professionals establishing a clean web presence.',
      highlights: [
        'UI/UX design & responsive layout',
        'Simple business showcase or landing page',
        'Portfolio & project display structure',
        'About, Services & Contact info sections',
        'Essential frontend interactions & animations',
        'Excluded: Custom domain, backend, login & database',
      ],
      // Explicit requirement: No Connect/Contact CTA button on Basic
      cta: null,
      popular: false,
    },
    {
      id: 'standard',
      name: 'Standard',
      badge: 'Most Popular',
      tagline: 'Enhanced website with customized layouts, motion polish & semantic SEO.',
      prices: {
        standard: '₹ [Custom Quote]',
        retainer: '₹ [Scope-Based]',
      },
      units: {
        standard: 'one-time project',
        retainer: 'build + monthly retainer',
      },
      description: 'A comprehensive upgrade from Basic for growing businesses that require tailored design and interactive polish.',
      highlights: [
        'Everything included in Basic',
        'Enhanced UI/UX design & elevated visual polish',
        'Customized page layouts & bespoke sections',
        'Additional frontend interactions & animations',
        'Improved responsive presentation across all devices',
        'Excluded: Custom domain, backend, login & database',
      ],
      cta: 'Select Standard',
      popular: true,
    },
    {
      id: 'premium',
      name: 'Premium',
      badge: 'Full Solution',
      tagline: 'Full-stack website solution with backend, authentication & dynamic workflows.',
      prices: {
        standard: '₹ [Custom Quote]',
        retainer: '₹ [Scope-Based]',
      },
      units: {
        standard: 'one-time project',
        retainer: 'build + monthly retainer',
      },
      description: 'Our highest-tier package for companies requiring dynamic functionality, user authentication, and databases.',
      highlights: [
        'Everything included in Standard',
        'Backend development & custom API integration',
        'User login and authentication functionality',
        'Database integration & data persistence',
        'Dynamic website features & content administration',
        'Custom domain setup assistance (terms to be confirmed)',
      ],
      cta: 'Select Premium',
      popular: false,
      goldHighlight: true,
    },
  ],

  // Comparison Table Feature Groups
  featureGroups: [
    {
      category: 'Website Scope & Architecture',
      features: [
        {
          name: 'Showcase Website (About, Services, Portfolio, Contact Info)',
          values: [true, true, true],
          description: 'Essential business showcase sections',
        },
        {
          name: 'Customized Page Layouts & Bespoke Sections',
          values: [false, true, true],
          description: 'Unique custom grid designs tailored to your brand',
        },
        {
          name: 'Dynamic Functional Modules & Workflows',
          values: [false, false, true],
          description: 'Interactive portals, dashboards, or custom application logic',
        },
      ],
    },
    {
      category: 'Design & Frontend Engineering',
      features: [
        {
          name: 'UI/UX Design Standards',
          values: ['Essential UI/UX', 'Enhanced Visual Polish', 'Full Bespoke Design System'],
        },
        {
          name: 'Responsive Across Mobile, Tablet & Desktop',
          values: [true, true, true],
        },
        {
          name: 'Kinetic Interactions & Frontend Animations',
          values: ['Essential', 'Enhanced Motion', 'Advanced Interactive Polish'],
        },
        {
          name: 'Design System & Component Library',
          values: [false, true, true],
        },
      ],
    },
    {
      category: 'Backend, Auth & Database Integration',
      features: [
        {
          name: 'Backend Architecture & API Integrations',
          values: [false, false, true],
          description: 'Server-side API routes and service orchestration',
        },
        {
          name: 'User Login & Authentication Systems',
          values: [false, false, true],
          description: 'Secure session handling and member access',
        },
        {
          name: 'Database Integration (Data Storage & Queries)',
          values: [false, false, true],
          description: 'Structured database persistence where required',
        },
        {
          name: 'Advanced Dynamic Features',
          values: [false, false, true],
          description: 'Dynamic content administration and client portal logic',
        },
      ],
    },
    {
      category: 'Domain & Launch Readiness',
      features: [
        {
          name: 'Custom Domain Registration or Domain Cost',
          values: [false, false, false],
          description: 'Domain costs are excluded across all tiers; registration terms must be confirmed before publishing',
        },
        {
          name: 'Custom Domain Setup Assistance',
          values: [false, false, true],
          description: 'DNS configuration & domain routing assistance for Premium',
        },
        {
          name: 'Production Deployment & Hosting Setup',
          values: [true, true, true],
        },
      ],
    },
    {
      category: 'Search Optimization & Performance',
      features: [
        {
          name: 'Search Engine Optimization (SEO)',
          values: ['Basic Meta Tags', 'Semantic On-Page SEO', 'Technical SEO & Schema Integration'],
          description: 'SEO offered as a specialized service alongside website engineering',
        },
        {
          name: 'Core Web Vitals Speed Profiling',
          values: ['Standard Baseline', 'High-Performance', 'Sub-Second Target'],
        },
      ],
    },
  ],
};
