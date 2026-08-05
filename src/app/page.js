"use client";

import { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import {
  ArrowDown,
  ArrowUpRight,
  BatteryCharging,
  Building2,
  Check,
  FileDown,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Move,
  Phone,
  Settings,
  Sun,
  Twitter,
  Wind,
  X,
} from 'lucide-react';
import EnergyPathDiagram from './components/EnergyPathDiagram';
import TurbineDiagram from './components/TurbineDiagram';

const BROCHURE_URL = 'https://files.dariyushmotors.com/Vertical-Wind-Turbines.pptx.pdf';

const FEATURES = [
  {
    code: 'CAP-360',
    icon: Move,
    title: 'Omnidirectional',
    desc: 'Captures wind from any direction without needing yaw alignment mechanisms.',
  },
  {
    code: 'MNT-GL',
    icon: Settings,
    title: 'Low Maintenance',
    desc: 'Generator is housed at the ground level, ensuring safe and easy accessibility.',
  },
  {
    code: 'URB-01',
    icon: Building2,
    title: 'Urban Ready',
    desc: 'Performs exceptionally well in turbulent and unpredictable urban wind currents.',
  },
  {
    code: 'HYB-SW',
    icon: Sun,
    title: 'Hybrid Designed',
    desc: 'Seamlessly integrates with solar panels for continuous power generation.',
  },
];

const PRODUCTS = [
  {
    index: '01',
    category: 'Commercial rooftop',
    title: '3kW / 5kW VAWT',
    desc: 'High-efficiency vertical axis wind turbines ideal for commercial rooftops.',
    features: ['Low noise profile', 'Hybrid compatible'],
    capacity: '3 / 5',
    unit: 'kW',
  },
  {
    index: '02',
    category: 'Urban integration',
    title: 'Tulip Turbine (1-3kW)',
    desc: 'Aesthetic, bird-friendly design perfect for urban environments.',
    features: ['Architectural integration', 'Ultra-quiet operation'],
    capacity: '1–3',
    unit: 'kW',
  },
  {
    index: '03',
    category: 'Integrated energy',
    title: 'Hybrid Systems',
    desc: 'Controllers, solar panels, and custom lithium battery solutions.',
    features: ['Smart energy management', '24/7 power generation'],
    capacity: 'W+S',
    unit: 'HYBRID',
  },
];

const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#how-it-works', label: 'Technology' },
  { href: '#products', label: 'Products' },
];

function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <span />
      <span />
    </span>
  );
}

export default function Home() {
  const pageRef = useRef(null);
  const [navScrolled, setNavScrolled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setNavScrolled(window.scrollY > 24);
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setIsMobileMenuOpen(false);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    gsap.registerPlugin(ScrollTrigger);
    const animationContext = gsap.context(() => {
      const media = gsap.matchMedia();
      media.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.hero-copy > *', {
          y: 24,
          opacity: 0,
          duration: 0.75,
          stagger: 0.09,
          ease: 'power2.out',
        });
        gsap.from('.turbine-figure', {
          opacity: 0,
          scale: 0.98,
          duration: 1,
          delay: 0.2,
          ease: 'power2.out',
        });
        gsap.utils.toArray('.reveal').forEach((element) => {
          gsap.from(element, {
            scrollTrigger: { trigger: element, start: 'top 88%', once: true },
            y: 22,
            opacity: 0,
            duration: 0.7,
            ease: 'power2.out',
          });
        });
      });
      return () => media.revert();
    }, pageRef);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
      animationContext.revert();
    };
  }, []);

  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), []);

  const handleContactSubmit = useCallback((event) => {
    event.preventDefault();
    setIsSubmitting(true);

    window.setTimeout(() => {
      event.target.reset();
      setSubmitSuccess(true);
      setIsSubmitting(false);
      window.setTimeout(() => setSubmitSuccess(false), 3000);
    }, 900);
  }, []);

  return (
    <main ref={pageRef}>
      <nav className={`site-nav ${navScrolled ? 'site-nav-scrolled' : ''}`} aria-label="Primary navigation">
        <div className="site-container nav-inner">
          <a href="#hero" className="brand" aria-label="Dariyush Motors, back to top">
            <BrandMark />
            <span className="brand-name">Dariyush Motors</span>
            <span className="brand-division">Vertical Wind Systems</span>
          </a>

          <div className="desktop-nav">
            {NAV_LINKS.map(({ href, label }) => <a key={href} href={href}>{label}</a>)}
            <a href="#contact" className="button button-compact">Project enquiry <ArrowUpRight size={15} /></a>
          </div>

          <button
            type="button"
            className="menu-button"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div id="mobile-navigation" className="mobile-nav">
            {NAV_LINKS.map(({ href, label }) => <a key={href} href={href} onClick={closeMobileMenu}>{label}</a>)}
            <a href="#contact" onClick={closeMobileMenu}>Project enquiry <ArrowUpRight size={16} /></a>
          </div>
        )}
      </nav>

      <section id="hero" className="hero-section">
        <div className="hero-grid site-container">
          <div className="hero-copy">
            <p className="eyebrow"><span>VAWT / India</span> Decentralised renewable energy</p>
            <h1>Wind does not arrive in one direction.</h1>
            <p className="hero-lead">
              Vertical Axis Wind Turbines engineered for urban rooftops, turbulent airflow, and low-wind environments.
            </p>
            <div className="hero-actions">
              <a href="#contact" className="button">Get a quote <ArrowUpRight size={18} /></a>
              <a href={BROCHURE_URL} target="_blank" rel="noopener noreferrer" className="text-link">
                <FileDown size={17} /> Download brochure
              </a>
            </div>
            <dl className="hero-facts">
              <div><dt>Capture</dt><dd>Omnidirectional</dd></div>
              <div><dt>Deployment</dt><dd>Urban / Rooftop</dd></div>
              <div><dt>System</dt><dd>Solar-hybrid ready</dd></div>
            </dl>
          </div>
          <div className="hero-diagram-wrap">
            <TurbineDiagram />
          </div>
        </div>
        <a className="hero-scroll" href="#about" aria-label="Scroll to company overview">
          <span>System overview</span><ArrowDown size={17} />
        </a>
      </section>

      <section id="about" className="section section-concrete">
        <div className="site-container">
          <header className="section-header reveal">
            <p className="section-index">01 / Operating principle</p>
            <div>
              <h2>Built for complex urban airflow.</h2>
              <p>Dariyushmotors Pvt Ltd is a renewable energy company focused on Vertical Axis Wind Turbine (VAWT) technology designed for urban, rooftop, and low-wind environments.</p>
            </div>
          </header>

          <div className="feature-register reveal">
            {FEATURES.map(({ code, icon: Icon, title, desc }) => (
              <article className="feature-row" key={code}>
                <span className="feature-code">{code}</span>
                <span className="feature-icon" aria-hidden="true"><Icon size={25} strokeWidth={1.5} /></span>
                <h3>{title}</h3>
                <p>{desc}</p>
              </article>
            ))}
          </div>

          <div className="urban-context reveal">
            <div className="roofline" aria-hidden="true">
              <span className="building building-a" />
              <span className="building building-b" />
              <span className="building building-c" />
              <span className="mini-turbine"><i /><b /></span>
              <span className="wind-line wind-line-one" />
              <span className="wind-line wind-line-two" />
            </div>
            <div className="urban-context-copy">
              <span className="technical-label">Deployment condition / URBAN</span>
              <p>Vertical geometry accepts changing wind direction without a yaw mechanism, while the generator remains accessible at ground level.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="section section-carbon">
        <div className="site-container">
          <header className="section-header section-header-light reveal">
            <p className="section-index">02 / Energy path</p>
            <div>
              <h2>One connected system.</h2>
              <p>Wind is converted through a direct mechanical and electrical sequence, with solar input available for hybrid generation.</p>
            </div>
          </header>
          <div className="reveal"><EnergyPathDiagram /></div>
        </div>
      </section>

      <section id="products" className="section section-products">
        <div className="site-container">
          <header className="section-header reveal">
            <p className="section-index">03 / System configurations</p>
            <div>
              <h2>Equipment for distributed generation.</h2>
              <p>Three configurations for rooftop wind generation, urban integration, and combined renewable-energy systems.</p>
            </div>
          </header>

          <div className="product-register reveal">
            {PRODUCTS.map(({ index, category, title, desc, features, capacity, unit }) => (
              <article className="product-row" key={title}>
                <div className="product-id"><span>{index}</span><small>{category}</small></div>
                <div className="product-capacity" aria-label={`${capacity} ${unit}`}><strong>{capacity}</strong><span>{unit}</span></div>
                <div className="product-description"><h3>{title}</h3><p>{desc}</p></div>
                <ul>{features.map((feature) => <li key={feature}><Check size={15} />{feature}</li>)}</ul>
                <button type="button" className="product-action">View details <ArrowUpRight size={17} /></button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="section section-contact">
        <div className="site-container contact-grid">
          <div className="contact-intro reveal">
            <p className="section-index">04 / Project enquiry</p>
            <h2>Plan a distributed energy system.</h2>
            <p>Contact us to discuss your project requirements, get a quote, or learn more about our hybrid energy solutions.</p>

            <address className="contact-details">
              <a href="https://maps.google.com/?q=Shiv+Sadan+Jail+Road+Vidisha+Madhya+Pradesh+464001" target="_blank" rel="noopener noreferrer">
                <MapPin size={20} /><span><small>Head office</small>Shiv Sadan, Jail Road, Vidisha, MP – 464001</span>
              </a>
              <a href="tel:+919685536795"><Phone size={20} /><span><small>Phone / WhatsApp</small>+91 9685536795 / 7222948482</span></a>
              <a href="mailto:Dariyushmotors@gmail.com"><Mail size={20} /><span><small>Email</small>Dariyushmotors@gmail.com</span></a>
            </address>
          </div>

          <div className="enquiry-panel reveal">
            <div className="panel-heading"><span>Project intake form</span><span>DM / 04</span></div>
            <form onSubmit={handleContactSubmit}>
              <div className="form-row">
                <label><span>Name *</span><input type="text" name="name" autoComplete="name" required /></label>
                <label><span>Company</span><input type="text" name="company" autoComplete="organization" /></label>
              </div>
              <div className="form-row">
                <label><span>Email *</span><input type="email" name="email" autoComplete="email" required /></label>
                <label><span>Phone *</span><input type="tel" name="phone" autoComplete="tel" required /></label>
              </div>
              <label>
                <span>Required capacity</span>
                <select name="capacity" defaultValue="">
                  <option value="" disabled>Select system capacity</option>
                  <option value="1kw">1kW System</option>
                  <option value="3kw">3kW System</option>
                  <option value="5kw">5kW System</option>
                  <option value="custom">Custom/Commercial</option>
                </select>
              </label>
              <label><span>Project notes</span><textarea name="message" rows={4} /></label>
              <button type="submit" className="button form-submit" disabled={isSubmitting} aria-live="polite">
                {isSubmitting ? 'Sending…' : submitSuccess ? 'Message sent' : 'Send enquiry'}
                {submitSuccess ? <Check size={18} /> : <ArrowUpRight size={18} />}
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="site-container">
          <div className="footer-main">
            <div>
              <a href="#hero" className="brand brand-footer"><BrandMark /><span className="brand-name">Dariyush Motors</span></a>
              <p>A next-generation renewable energy manufacturer focused on practical urban deployment and decentralized power solutions.</p>
            </div>
            <div className="footer-links">
              <div><span>Navigate</span>{NAV_LINKS.map(({ href, label }) => <a key={href} href={href}>{label}</a>)}</div>
              <div><span>Connect</span><a href="#" aria-label="Dariyush Motors on LinkedIn"><Linkedin size={17} /> LinkedIn</a><a href="#" aria-label="Dariyush Motors on Twitter"><Twitter size={17} /> Twitter</a></div>
            </div>
          </div>
          <div className="footer-legal">
            <p>© 2026 Dariyushmotors Pvt Ltd. All rights reserved.</p>
            <p>CIN: U27100MP2024PTC073691 <span /> Incorporated: 22/11/2024</p>
            <div><a href="#">Privacy Policy</a><a href="#">Terms of Service</a></div>
          </div>
        </div>
      </footer>
    </main>
  );
}
