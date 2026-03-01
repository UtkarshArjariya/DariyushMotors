"use client"

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [activeTab, setActiveTab] = useState('vawt');
  const [isNavActive, setIsNavActive] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    // --- 2. Scroll Reveal & Progress Bars (Intersection Observer) --- 
    const revealElements = document.querySelectorAll('.reveal');
    const progressFills = document.querySelectorAll('.progress-fill');

    const scrollObserverParams = {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px"
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains('reveal')) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
          }
        }
      });
    }, scrollObserverParams);

    revealElements.forEach(el => scrollObserver.observe(el));

    const progressObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const fill = entry.target;
          const width = fill.getAttribute('data-width');
          fill.style.width = width;
          observer.unobserve(fill);
        }
      });
    }, { threshold: 0.5 });
    
    progressFills.forEach(fill => progressObserver.observe(fill));

    // --- 3. Sticky Navbar & Bottom CTA Bar --- 
    const header = document.querySelector('.header');
    const bottomBar = document.querySelector('.bottom-cta-bar');
    const heroSection = document.getElementById('hero');
    
    const handleScroll = () => {
      let scY = window.scrollY;
      if (scY > 80) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }

      if (heroSection) {
        if (scY > heroSection.offsetHeight) {
          bottomBar.classList.add('visible');
        } else {
          bottomBar.classList.remove('visible');
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);

    // --- 7. Clean Green Particle Background (Canvas) --- 
    const canvas = canvasRef.current;
    let animationFrameId;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      let particlesArray = [];

      const setCanvasSize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      
      setCanvasSize();
      window.addEventListener('resize', () => {
        setCanvasSize();
        initParticles();
      });

      class Particle {
        constructor(x, y, dx, dy, size, color) {
          this.x = x;
          this.y = y;
          this.dx = dx;
          this.dy = dy;
          this.size = size;
          this.color = color;
        }
        draw() {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
          ctx.fillStyle = this.color;
          ctx.fill();
        }
        update() {
          if (this.x > canvas.width || this.x < 0) this.dx = -this.dx;
          if (this.y > canvas.height || this.y < 0) this.dy = -this.dy;

          this.x += this.dx;
          this.y += this.dy - 0.2; // Upward breeze

          if (this.y < -10) {
            this.y = canvas.height + 10;
            this.x = Math.random() * canvas.width;
          }
          this.draw();
        }
      }

      function initParticles() {
        particlesArray = [];
        let density = window.innerWidth > 768 ? 20000 : 30000; 
        let numberOfParticles = (canvas.height * canvas.width) / density;

        for (let i = 0; i < numberOfParticles; i++) {
          let size = (Math.random() * 2.5) + 0.5;
          let x = Math.random() * canvas.width;
          let y = Math.random() * canvas.height;
          let dx = (Math.random() - 0.5) * 1;
          let dy = (Math.random() - 0.5) * 1;
          let color = 'rgba(46, 204, 113, 0.4)'; 
          particlesArray.push(new Particle(x, y, dx, dy, size, color));
        }
      }

      function connectParticles() {
        let maxDistance = 100;
        for (let a = 0; a < particlesArray.length; a++) {
          for (let b = a; b < particlesArray.length; b++) {
            let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) 
                       + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
            if (distance < (maxDistance * maxDistance)) {
              let opacity = 1 - (distance / (maxDistance * maxDistance));
              ctx.strokeStyle = `rgba(46, 204, 113, ${opacity * 0.15})`;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
              ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
              ctx.stroke();
            }
          }
        }
      }

      function animateParticles() {
        animationFrameId = requestAnimationFrame(animateParticles);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        connectParticles();
        for (let i = 0; i < particlesArray.length; i++) {
          particlesArray[i].update();
        }
      }

      initParticles();
      animateParticles();
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const toggleAccordion = (e) => {
    e.currentTarget.parentElement.classList.toggle('open');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    
    btn.innerHTML = 'Analyzing Specs... ⏳';
    btn.style.opacity = '0.8';
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = 'Request Received! ✔';
      btn.style.backgroundColor = '#111';
      btn.style.color = '#2ECC71';
      e.target.reset();
      
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.backgroundColor = '';
        btn.style.color = '';
        btn.style.opacity = '1';
        btn.disabled = false;
      }, 4000);
    }, 1500);
  };

  return (
    <>
      {/* Particle Background */}
      <canvas id="bg-canvas" ref={canvasRef}></canvas>

      {/* Top contact bar */}
      <div className="top-bar">
        <div className="container d-flex justify-between">
          <span className="top-bar-text">CIN: U27100MP2024PTC073691 | Support: +91 9685536795</span>
          <span className="top-bar-text">Email: Dariyushmotors@gmail.com</span>
        </div>
      </div>

      {/* Sticky Navbar */}
      <header className="header">
        <div className="container navbar">
          <Link href="#" className="logo">DARIYUSH<span>MOTORS</span></Link>
          <ul className={`nav-links ${isNavActive ? 'active' : ''}`}>
            <li><Link href="#about" onClick={() => setIsNavActive(false)}>Technology</Link></li>
            <li><Link href="#how-it-works" onClick={() => setIsNavActive(false)}>How It Works</Link></li>
            <li><Link href="#products" onClick={() => setIsNavActive(false)}>Products</Link></li>
            <li><Link href="#performance" onClick={() => setIsNavActive(false)}>Performance</Link></li>
            <li><Link href="#case-studies" onClick={() => setIsNavActive(false)}>Insights</Link></li>
          </ul>
          <div className="nav-actions">
            <Link href="#quote" className="btn btn-primary">Get a Quote</Link>
            <div className={`hamburger ${isNavActive ? 'active' : ''}`} onClick={() => setIsNavActive(!isNavActive)}>
              <span></span><span></span><span></span>
            </div>
          </div>
        </div>
      </header>

      {/* 1. HERO + VALUE PROPOSITION */}
      <section id="hero" className="hero-section parallax">
        <div className="container">
          <div className="hero-content reveal fade-up">
            <h1 className="headline">Real Renewable Power <span className="highlight-electric">Without Compromise</span></h1>
            <p className="subheadline">Urban-ready Vertical Axis Wind Turbines, Hybrid Systems & Clean Energy Solutions for Rooftops, Business, and Commercial Use.</p>
            <div className="btn-group">
              <Link href="#quote" className="btn btn-primary btn-lg shine">Request a Quote</Link>
              <Link href="#products" className="btn btn-secondary btn-lg">Explore Products</Link>
            </div>
          </div>
        </div>
        <Link href="#trust" className="scroll-down">
          <i className="arrow-down"></i>
        </Link>
      </section>

      {/* 2. TRUST & AUTHENTICITY BAR */}
      <section id="trust" className="trust-bar bg-dark">
        <div className="container">
          <div className="trust-grid reveal fade-up">
            <div className="trust-item"><span className="icon-check">✔</span> Company Incorporated 2024</div>
            <div className="trust-item"><span className="icon-check">✔</span> Hybrid System Certified</div>
            <div className="trust-item"><span className="icon-check">✔</span> Made for Urban India</div>
            <div className="trust-item"><span className="icon-check">✔</span> Low-Noise Certified</div>
          </div>
        </div>
      </section>

      {/* 3. ABOUT THE TECHNOLOGY */}
      <section id="about" className="section tech-section bg-light-gradient">
        <div className="container text-center reveal fade-up">
          <h2 className="section-title">Why Vertical Axis Wind Turbines?</h2>
          <p className="section-subtitle">Pioneering Decentralized Power Solutions in India</p>
          <div className="grid-4 mt-40">
            <div className="tech-card glass hover-lift">
              <div className="tech-icon animated-icon">🔄</div>
              <h3>Omnidirectional Wind Capture</h3>
              <p>Harnesses wind from any direction without pivoting mechanisms.</p>
            </div>
            <div className="tech-card glass hover-lift delay-1">
              <div className="tech-icon animated-icon">🛠</div>
              <h3>Low-Maintenance & Safety</h3>
              <p>Ground-level generators mean easier repairs and no lofty dangers.</p>
            </div>
            <div className="tech-card glass hover-lift delay-2">
              <div className="tech-icon animated-icon">🏙</div>
              <h3>Ideal for Urban Rooftops</h3>
              <p>Thrives in turbulent, low-altitude wind streams common in cities.</p>
            </div>
            <div className="tech-card glass hover-lift delay-3">
              <div className="tech-icon animated-icon">🌞</div>
              <h3>Hybrid Solar Integration</h3>
              <p>Perfectly pairs with solar to generate 24/7 sustainable power.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section id="how-it-works" className="section work-section">
        <div className="container text-center reveal fade-up">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">A seamless process for converting natural airflow into usable electricity.</p>
          <div className="infographic-flow mt-40">
            <div className="step-card">
              <div className="step-circle pulse">1</div>
              <h4>Wind Capture</h4>
              <p>Vertical blades catch multi-directional winds efficiently.</p>
            </div>
            <div className="step-arrow">➡</div>
            <div className="step-card">
              <div className="step-circle pulse delay-1">2</div>
              <h4>Rotor Rotation</h4>
              <p>Central axis spins smoothly with Low Noise Renewable Energy.</p>
            </div>
            <div className="step-arrow">➡</div>
            <div className="step-card">
              <div className="step-circle pulse delay-2">3</div>
              <h4>Power Generation</h4>
              <p>Direct-drive alternator reliably creates electricity.</p>
            </div>
            <div className="step-arrow">➡</div>
            <div className="step-card">
              <div className="step-circle pulse delay-3">4</div>
              <h4>Battery + Grid Supply</h4>
              <p>Store in Lithium batteries or export to the electrical grid.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. & 6. PRODUCTS */}
      <section id="products" className="section products-section bg-light-gradient">
        <div className="container reveal fade-up">
          <h2 className="section-title text-center">Engineered Product Portfolio</h2>
          <p className="section-subtitle text-center">Explore our specialized clean energy hardware.</p>

          <div className="product-tabs text-center mt-40">
            <button className={`tab-btn ${activeTab === 'vawt' ? 'active' : ''}`} onClick={() => setActiveTab('vawt')}>Vertical Axis Wind Turbines</button>
            <button className={`tab-btn ${activeTab === 'tulip' ? 'active' : ''}`} onClick={() => setActiveTab('tulip')}>Tulip Turbines</button>
            <button className={`tab-btn ${activeTab === 'solar' ? 'active' : ''}`} onClick={() => setActiveTab('solar')}>Solar Panels</button>
            <button className={`tab-btn ${activeTab === 'hybrid' ? 'active' : ''}`} onClick={() => setActiveTab('hybrid')}>Hybrid Controllers</button>
            <button className={`tab-btn ${activeTab === 'battery' ? 'active' : ''}`} onClick={() => setActiveTab('battery')}>Lithium Batteries</button>
          </div>

          <div className="product-content mt-40">
            {activeTab === 'vawt' && (
              <div className="tab-content active" id="vawt">
                <div className="grid-2">
                  <div className="prod-card glass">
                    <div className="prod-img img-vawt"></div>
                    <div className="prod-info">
                      <h3>3kW VAWT</h3>
                      <p className="tag-label">Urban Edge Series</p>
                      <ul className="spec-list">
                        <li><strong>Installation:</strong> Commercial Rooftops</li>
                        <li><strong>Noise Rating:</strong> {'<'} 40 dB (Whisper Quiet)</li>
                        <li><strong>Hybrid Comp:</strong> Yes (Solar + Grid)</li>
                      </ul>
                      <div className="accordion">
                        <div className="accordion-head" onClick={toggleAccordion}>View Technical Specs <span>+</span></div>
                        <div className="accordion-body">
                          <table>
                            <tbody>
                              <tr><td>Rated Power</td><td>3000 W</td></tr>
                              <tr><td>Start-up Wind</td><td>2.0 m/s</td></tr>
                              <tr><td>Survival Wind</td><td>45 m/s</td></tr>
                              <tr><td>Generator</td><td>3-Phase PMG</td></tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <Link href="#" className="btn btn-outline btn-block mt-20 download-btn">Download Datasheet</Link>
                    </div>
                  </div>
                  <div className="prod-card glass">
                    <div className="prod-img img-vawt5"></div>
                    <div className="prod-info">
                      <h3>5kW VAWT</h3>
                      <p className="tag-label">Industrial Series</p>
                      <ul className="spec-list">
                        <li><strong>Installation:</strong> Factories, Micro-grids</li>
                        <li><strong>Noise Rating:</strong> {'<'} 45 dB</li>
                        <li><strong>Hybrid Comp:</strong> Advanced Integration</li>
                      </ul>
                      <div className="accordion">
                        <div className="accordion-head" onClick={toggleAccordion}>View Technical Specs <span>+</span></div>
                        <div className="accordion-body">
                          <table>
                            <tbody>
                              <tr><td>Rated Power</td><td>5000 W</td></tr>
                              <tr><td>Start-up Wind</td><td>2.5 m/s</td></tr>
                              <tr><td>Survival Wind</td><td>50 m/s</td></tr>
                              <tr><td>Weight</td><td>280 Kg</td></tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <Link href="#" className="btn btn-outline btn-block mt-20 download-btn">Download Datasheet</Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'tulip' && (
              <div className="tab-content active" id="tulip">
                <div className="grid-3">
                  <div className="prod-card glass">
                    <div className="prod-info">
                      <h3>1kW Tulip Series</h3>
                      <p className="tag-label">Residential Range</p>
                      <p>Highly aesthetic, curved blade design perfect for homes.</p>
                    </div>
                  </div>
                  <div className="prod-card glass">
                    <div className="prod-info">
                      <h3>2kW Tulip Series</h3>
                      <p className="tag-label">Estate Range</p>
                      <p>Balancing power and beauty for gated communities.</p>
                    </div>
                  </div>
                  <div className="prod-card glass">
                    <div className="prod-info">
                      <h3>3kW Tulip Series</h3>
                      <p className="tag-label">Commercial Range</p>
                      <p>Architectural wind power for commercial facades.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'solar' && (
              <div className="tab-content active" id="solar">
                <div className="grid-2">
                  <div className="prod-card glass">
                    <div className="prod-img img-solar"></div>
                    <div className="prod-info">
                      <h3>Monocrystalline Solar Panels</h3>
                      <p>High-yield panels designed to integrate seamlessly with VAWT for a true Hybrid Solar + Wind System.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'hybrid' && (
              <div className="tab-content active" id="hybrid">
                <div className="grid-2">
                  <div className="prod-card glass">
                    <div className="prod-info">
                      <h3>Hybrid Controller (3kW/5kW)</h3>
                      <p>Smart controller managing inputs from both wind turbines and solar arrays, optimizing charge for batteries and grid feed-in.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'battery' && (
              <div className="tab-content active" id="battery">
                <div className="grid-2">
                  <div className="prod-card glass">
                    <div className="prod-info">
                      <h3>Custom Lithium Batteries</h3>
                      <p>High-density, modular LiFePO4 storage solutions for uninterrupted decentralized power.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 7. PERFORMANCE & BENEFITS */}
      <section id="performance" className="section performance-section text-light">
        <div className="container reveal fade-up">
          <h2 className="section-title text-center">Performance & Real-World Benefits</h2>
          <div className="grid-3 mt-40">
            <div className="perf-block">
              <h3 className="electric-txt">Energy Output Efficiency</h3>
              <p>Consistent power generation via Hybrid Solar + Wind Systems maximizing daily yield.</p>
              <div className="progress-container">
                <div className="progress-label"><span>VAWT vs Solar (Night)</span> <span>+85%</span></div>
                <div className="progress-bar"><div className="progress-fill" style={{width: '0%'}} data-width="85%"></div></div>
              </div>
              <div className="progress-container">
                <div className="progress-label"><span>Turbulent Wind Capture</span> <span>+40%</span></div>
                <div className="progress-bar"><div className="progress-fill" style={{width: '0%'}} data-width="40%"></div></div>
              </div>
            </div>
            <div className="perf-block">
              <h3 className="electric-txt">Cost Savings vs Conventional</h3>
              <p>Significantly reduce dependency on grid electricity and diesel backup generators.</p>
              <div className="progress-container">
                <div className="progress-label"><span>Grid Tariff Reduction</span> <span>~60%</span></div>
                <div className="progress-bar"><div className="progress-fill" style={{width: '0%'}} data-width="60%"></div></div>
              </div>
              <div className="progress-container">
                <div className="progress-label"><span>Diesel Generator Replacement</span> <span>~90%</span></div>
                <div className="progress-bar"><div className="progress-fill" style={{width: '0%'}} data-width="90%"></div></div>
              </div>
            </div>
            <div className="perf-block dark-glass text-center calculator-block">
              <h3>ROI Calculator Placeholder</h3>
              <p>On average, hybrid systems achieve payback within <strong>4 to 6 years</strong> for commercial setups.</p>
              <div className="roi-circle">5 Yr<br/>Payback</div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CASE STUDIES */}
      <section id="case-studies" className="section case-section bg-light-gradient">
        <div className="container text-center reveal fade-up">
          <h2 className="section-title">Customer Stories</h2>
          <div className="testimonial-slider mt-40">
            <div className="testimonial-slide active">
              <p className="quote-text">“Installed a 3kW VAWT on our commercial rooftop. Since integration, we’ve seen a 38% energy cost reduction in our monthly bills.”</p>
              <p className="quote-author">— Manufacturing Facility / Bhopal</p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. EDUCATION */}
      <section id="education" className="section edu-section">
        <div className="container reveal fade-up">
          <h2 className="section-title text-center">Knowledge Hub</h2>
          <div className="grid-4 mt-40">
            <Link href="#" className="edu-card glass hover-lift">
              <div className="edu-img" style={{background: "url('https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?q=80&w=400&auto=format&fit=crop') center/cover"}}></div>
              <div className="edu-body">
                <h4>What are Vertical Axis Wind Turbines?</h4>
                <span className="read-more">Read Guide →</span>
              </div>
            </Link>
            <Link href="#" className="edu-card glass hover-lift delay-1">
              <div className="edu-img" style={{background: "url('https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=400&auto=format&fit=crop') center/cover"}}></div>
              <div className="edu-body">
                <h4>VAWT + Solar Hybrid Explained</h4>
                <span className="read-more">Read Guide →</span>
              </div>
            </Link>
            <Link href="#" className="edu-card glass hover-lift delay-2">
              <div className="edu-img" style={{background: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=400&auto=format&fit=crop') center/cover"}}></div>
              <div className="edu-body">
                <h4>Rooftop Wind in Indian Cities</h4>
                <span className="read-more">Read Guide →</span>
              </div>
            </Link>
            <Link href="#" className="edu-card glass hover-lift delay-3">
              <div className="edu-img" style={{background: "url('https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=400&auto=format&fit=crop') center/cover"}}></div>
              <div className="edu-body">
                <h4>Financing & Gov Incentives</h4>
                <span className="read-more">Read Guide →</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 10. CONTACT */}
      <section id="quote" className="section lead-section">
        <div className="container">
          <div className="lead-grid reveal fade-up">
            <div className="lead-info">
              <h2 className="section-title text-light">Start Your Clean Energy Transformation</h2>
              <p className="text-light mt-20 mb-40">Connect with our engineering team to design the optimal power solution for your specific site constraints and energy needs.</p>
              
              <ul className="contact-list list-unstyled text-light" style={{listStyle: 'none'}}>
                <li><strong>Lead:</strong> Piyush Nimoda</li>
                <li><strong>Phone:</strong> +91 9685536795 / 7222948482</li>
                <li><strong>Email:</strong> Dariyushmotors@gmail.com</li>
                <li><strong>Head Office:</strong> Shiv Sadan, Jail Road, Vidisha, MP – 464001</li>
              </ul>
              <a href="https://wa.me/919685536795" target="_blank" rel="noopener noreferrer" className="btn btn-electric mt-40 whatsapp-btn"><i className="wa-icon"></i> Chat via WhatsApp</a>
            </div>
            
            <div className="lead-form-wrapper glass">
              <form id="contactForm" className="advanced-form" onSubmit={handleFormSubmit}>
                <div className="form-row">
                  <input type="text" id="name" placeholder="Full Name" required />
                  <input type="text" id="company" placeholder="Company Name" />
                </div>
                <div className="form-row">
                  <input type="email" id="email" placeholder="Business Email" required />
                  <input type="tel" id="phone" placeholder="Phone Number" required />
                </div>
                <div className="form-group">
                  <input type="text" id="location" placeholder="Installation Location / City" required />
                </div>
                <div className="form-row">
                  <select id="requirement" required defaultValue="">
                    <option value="" disabled>System Requirement</option>
                    <option value="VAWT">VAWT Only</option>
                    <option value="Hybrid">Hybrid (Solar + Wind)</option>
                    <option value="Battery">Battery Storage / Off-Grid</option>
                  </select>
                  <select id="budget" required defaultValue="">
                    <option value="" disabled>Budget Range</option>
                    <option value="Under 5 Lakhs">Under 5 Lakhs INR</option>
                    <option value="5-15 Lakhs">5 - 15 Lakhs INR</option>
                    <option value="15+ Lakhs">Over 15 Lakhs INR</option>
                  </select>
                </div>
                <div className="form-group upload-group">
                  <label htmlFor="fileUpload">Upload Specs / Roof Layout (Optional)</label>
                  <input type="file" id="fileUpload" accept=".pdf,.png,.jpg" />
                </div>
                <button type="submit" className="btn btn-primary btn-block btn-lg shine mt-20">Submit Request</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer bg-darker">
        <div className="container footer-content">
          <div className="footer-col brand">
            <Link href="#" className="logo text-light">DARIYUSH<span>MOTORS</span></Link>
            <p className="mt-20">Real Renewable Power Without Compromise. Empowering homes and industries with cutting edge decentralized energy.</p>
            <div className="social-links mt-20">
              <Link href="#">in</Link> <Link href="#">tw</Link> <Link href="#">fb</Link>
            </div>
          </div>
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul style={{listStyle: 'none'}}>
              <li><Link href="#about">About VAWT</Link></li>
              <li><Link href="#how-it-works">How It Works</Link></li>
              <li><Link href="#products">Products</Link></li>
              <li><Link href="#performance">Calculate ROI</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Legal & Address</h4>
            <p>CIN: U27100MP2024PTC073691 (Inc. 22/11/2024)</p>
            <p className="mt-10">Shiv Sadan, Jail Road,<br/>Vidisha, MP – 464001, India</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Dariyushmotors Pvt Ltd. All rights reserved.</p>
        </div>
      </footer>

      {/* DYNAMIC BOTTOM BAR */}
      <div className="bottom-cta-bar">
        <span>Ready To Cut Your Power Bills?</span>
        <div className="actions">
          <Link href="#quote" className="btn btn-primary btn-sm shine">Get a Quote</Link>
          <a href="https://wa.me/919685536795" target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">Talk to Expert</a>
        </div>
      </div>
    </>
  );
}
