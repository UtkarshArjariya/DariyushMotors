"use client";

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { 
  Wind, 
  CheckCircle2, 
  Fan, 
  Move, 
  Settings, 
  Building2, 
  Sun, 
  RefreshCw, 
  Zap, 
  BatteryCharging, 
  Check, 
  Flower2, 
  Cpu, 
  MapPin, 
  Phone, 
  Mail, 
  Linkedin, 
  Twitter,
  FileDown
} from 'lucide-react';

export default function Home() {
  const [navBg, setNavBg] = useState('rgba(10, 31, 44, 0.7)');
  const [btnText, setBtnText] = useState('Send Inquiry');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    // Scroll listener for navbar
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setNavBg('rgba(10, 31, 44, 0.95)');
      } else {
        setNavBg('rgba(10, 31, 44, 0.7)');
      }
    };
    window.addEventListener('scroll', handleScroll);
    
    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    gsap.from('.hero-content > *', {
      y: 30,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: 'power3.out',
      delay: 0.2
    });

    gsap.from('.turbine-container', {
      scale: 0.9,
      opacity: 0,
      duration: 1.5,
      ease: 'power2.out',
      delay: 0.5
    });

    const fadeUpElements = document.querySelectorAll('.fade-up');
    fadeUpElements.forEach((el) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setBtnText('Sending...');
    
    setTimeout(() => {
      setBtnText('Message Sent!');
      setSubmitSuccess(true);
      e.target.reset();
      
      setTimeout(() => {
        setBtnText('Send Inquiry');
        setSubmitSuccess(false);
        setIsSubmitting(false);
      }, 3000);
    }, 1500);
  };

  return (
    <main>
      <nav 
        className="fixed w-full z-50 glass-nav border-b border-white/10 transition-all duration-300"
        style={{ background: navBg }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
              <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                <Wind className="text-primary w-5 h-5" />
              </div>
              <span className="font-bold text-xl tracking-tight text-white mix-blend-difference">Dariyush Motors</span>
            </div>
            <div className="hidden md:flex space-x-8 items-center">
              <a href="#about" className="text-sm font-medium text-gray-300 hover:text-accent transition-colors">About</a>
              <a href="#how-it-works" className="text-sm font-medium text-gray-300 hover:text-accent transition-colors">Technology</a>
              <a href="#products" className="text-sm font-medium text-gray-300 hover:text-accent transition-colors">Products</a>
              <a href="#contact" className="btn-primary">Get a Quote</a>
            </div>
          </div>
        </div>
      </nav>

      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-primary" id="hero">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-transparent z-10"></div>
          {/* Using next/image is better, but this matches original */}
          <img src="https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" alt="Wind Turbine" className="w-full h-full object-cover opacity-40" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full grid md:grid-cols-2 gap-12 items-center">
          <div className="hero-content">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel mb-6 border border-accent/30 text-accent text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
              Next-Gen Renewable Energy
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight tracking-tight mb-6">
              Power From <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-emerald-400">Every Direction.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-lg font-light leading-relaxed">
              Advanced Vertical Axis Wind Turbines built for Urban India. Resilient, omnidirectional, and designed for decentralized power.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-12">
              <a href="#contact" className="btn-primary text-lg px-8 py-4">Get a Quote</a>
              <a href="#products" className="glass-btn text-lg px-8 py-4 text-white">Explore Products</a>
              <a 
                href="https://files.dariyushmotors.com/Vertical-Wind-Turbines.pptx.pdf" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="glass-btn text-lg px-8 py-4 text-white flex items-center gap-2"
              >
                <FileDown className="w-5 h-5" /> Download Broucher
              </a>
            </div>
            
            <div className="flex gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-accent" /> Incorporated 2024</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-accent" /> Urban Conditions</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-accent" /> Hybrid Ready</div>
            </div>
          </div>
          
          <div className="relative h-[600px] hidden md:flex items-center justify-center turbine-container">
            <div className="absolute w-[400px] h-[400px] bg-accent/20 rounded-full blur-[100px]"></div>
            <div className="relative z-10 animate-spin-slow">
              <Fan className="w-64 h-64 text-accent/80 stroke-[0.5]" />
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-24 bg-surface relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16 fade-up">
            <h2 className="text-4xl font-bold text-secondary mb-6 tracking-tight">Engineering Decentralized Power for India’s Future</h2>
            <p className="text-xl text-gray-600 font-light">
              Dariyushmotors Pvt Ltd is a renewable energy company focused on Vertical Axis Wind Turbine (VAWT) technology designed for urban, rooftop, and low-wind environments.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="glass-card p-8 rounded-2xl bg-white fade-up hover:-translate-y-2 transition-transform duration-300">
              <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center mb-6">
                <Move className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-3 text-secondary">Omnidirectional</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Captures wind from any direction without needing yaw alignment mechanisms.</p>
            </div>
            <div className="glass-card p-8 rounded-2xl bg-white fade-up hover:-translate-y-2 transition-transform duration-300 delay-100">
              <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center mb-6">
                <Settings className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-3 text-secondary">Low Maintenance</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Generator is housed at the ground level, ensuring safe and easy accessibility.</p>
            </div>
            <div className="glass-card p-8 rounded-2xl bg-white fade-up hover:-translate-y-2 transition-transform duration-300 delay-200">
              <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center mb-6">
                <Building2 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-3 text-secondary">Urban Ready</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Performs exceptionally well in turbulent and unpredictable urban wind currents.</p>
            </div>
            <div className="glass-card p-8 rounded-2xl bg-white fade-up hover:-translate-y-2 transition-transform duration-300 delay-300">
              <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center mb-6">
                <Sun className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-3 text-secondary">Hybrid Designed</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Seamlessly integrates with solar panels for continuous power generation.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-24 bg-primary text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-20 fade-up">
            <h2 className="text-4xl font-bold mb-6">How It Works</h2>
            <p className="text-gray-300">Unlike traditional turbines, our VAWT does not require wind alignment. It captures wind from any direction, making it ideal for rooftops and urban landscapes.</p>
          </div>
          
          <div className="relative">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/10 hidden md:block -translate-y-1/2"></div>
            
            <div className="grid md:grid-cols-4 gap-12 relative z-10">
              <div className="text-center group fade-up">
                <div className="w-20 h-20 mx-auto bg-secondary rounded-full border border-white/20 flex items-center justify-center mb-6 relative group-hover:border-accent transition-colors duration-300">
                  <Wind className="w-8 h-8 text-accent" />
                  <div className="absolute -right-2 -top-2 w-6 h-6 bg-accent text-primary rounded-full text-xs font-bold flex items-center justify-center">1</div>
                </div>
                <h4 className="font-bold mb-2">Wind Capture</h4>
                <p className="text-sm text-gray-400">360° omnidirectional blades</p>
              </div>
              <div className="text-center group fade-up delay-100">
                <div className="w-20 h-20 mx-auto bg-secondary rounded-full border border-white/20 flex items-center justify-center mb-6 relative group-hover:border-accent transition-colors duration-300">
                  <RefreshCw className="w-8 h-8 text-accent" />
                  <div className="absolute -right-2 -top-2 w-6 h-6 bg-accent text-primary rounded-full text-xs font-bold flex items-center justify-center">2</div>
                </div>
                <h4 className="font-bold mb-2">Rotor Rotation</h4>
                <p className="text-sm text-gray-400">Vertical shaft spins smoothly</p>
              </div>
              <div className="text-center group fade-up delay-200">
                <div className="w-20 h-20 mx-auto bg-secondary rounded-full border border-white/20 flex items-center justify-center mb-6 relative group-hover:border-accent transition-colors duration-300">
                  <Zap className="w-8 h-8 text-accent" />
                  <div className="absolute -right-2 -top-2 w-6 h-6 bg-accent text-primary rounded-full text-xs font-bold flex items-center justify-center">3</div>
                </div>
                <h4 className="font-bold mb-2">Power Generation</h4>
                <p className="text-sm text-gray-400">Ground-level generator operation</p>
              </div>
              <div className="text-center group fade-up delay-300">
                <div className="w-20 h-20 mx-auto bg-secondary rounded-full border border-white/20 flex items-center justify-center mb-6 relative group-hover:border-accent transition-colors duration-300">
                  <BatteryCharging className="w-8 h-8 text-accent" />
                  <div className="absolute -right-2 -top-2 w-6 h-6 bg-accent text-primary rounded-full text-xs font-bold flex items-center justify-center">4</div>
                </div>
                <h4 className="font-bold mb-2">Storage / Grid</h4>
                <p className="text-sm text-gray-400">Energy storage or grid supply</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="products" className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-secondary mb-12 text-center fade-up">Our Solutions</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 fade-up group">
              <div className="h-48 bg-gray-50 rounded-xl mb-6 flex items-center justify-center relative overflow-hidden">
                <Fan className="w-16 h-16 text-primary/20 group-hover:text-accent transition-colors duration-300 group-hover:animate-spin-slow" />
              </div>
              <h3 className="text-xl font-bold text-secondary mb-2">3kW / 5kW VAWT</h3>
              <p className="text-gray-500 text-sm mb-6">High-efficiency vertical axis wind turbines ideal for commercial rooftops.</p>
              <ul className="space-y-2 mb-8">
                <li className="flex items-center text-sm text-gray-600 gap-2"><Check className="w-4 h-4 text-accent" /> Low noise profile</li>
                <li className="flex items-center text-sm text-gray-600 gap-2"><Check className="w-4 h-4 text-accent" /> Hybrid compatible</li>
              </ul>
              <button className="w-full py-3 rounded-lg border border-primary/10 text-primary font-medium hover:bg-primary hover:text-white transition-colors duration-300">View Details</button>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-accent/20 shadow-md relative hover:shadow-xl transition-all duration-300 fade-up delay-100 group">
              <div className="absolute -top-3 right-8 bg-accent text-primary text-xs font-bold px-3 py-1 rounded-full">Popular</div>
              <div className="h-48 bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl mb-6 flex items-center justify-center overflow-hidden">
                <Flower2 className="w-16 h-16 text-primary/20 group-hover:text-accent transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold text-secondary mb-2">Tulip Turbine (1-3kW)</h3>
              <p className="text-gray-500 text-sm mb-6">Aesthetic, bird-friendly design perfect for urban environments.</p>
              <ul className="space-y-2 mb-8">
                <li className="flex items-center text-sm text-gray-600 gap-2"><Check className="w-4 h-4 text-accent" /> Architectural integration</li>
                <li className="flex items-center text-sm text-gray-600 gap-2"><Check className="w-4 h-4 text-accent" /> Ultra-quiet operation</li>
              </ul>
              <button className="w-full py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors duration-300">View Details</button>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 fade-up delay-200 group">
              <div className="h-48 bg-gray-50 rounded-xl mb-6 flex items-center justify-center overflow-hidden">
                <Cpu className="w-16 h-16 text-primary/20 group-hover:text-accent transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold text-secondary mb-2">Hybrid Systems</h3>
              <p className="text-gray-500 text-sm mb-6">Controllers, solar panels, and custom lithium battery solutions.</p>
              <ul className="space-y-2 mb-8">
                <li className="flex items-center text-sm text-gray-600 gap-2"><Check className="w-4 h-4 text-accent" /> Smart energy management</li>
                <li className="flex items-center text-sm text-gray-600 gap-2"><Check className="w-4 h-4 text-accent" /> 24/7 power generation</li>
              </ul>
              <button className="w-full py-3 rounded-lg border border-primary/10 text-primary font-medium hover:bg-primary hover:text-white transition-colors duration-300">View Details</button>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-24 bg-secondary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/40 via-secondary to-secondary"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-16">
            <div className="fade-up">
              <h2 className="text-4xl font-bold mb-6">Start Generating Your Own Power.</h2>
              <p className="text-gray-400 mb-8 text-lg">Contact us to discuss your project requirements, get a quote, or learn more about our hybrid energy solutions.</p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Head Office</p>
                    <p className="font-medium">Shiv Sadan, Jail Road, Vidisha, MP – 464001</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Phone / WhatsApp</p>
                    <p className="font-medium">+91 9685536795 / 7222948482</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <p className="font-medium">Dariyushmotors@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-panel p-8 rounded-2xl fade-up delay-100">
              <form id="contact-form" className="space-y-4" onSubmit={handleContactSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="Name" required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-colors" />
                  <input type="text" placeholder="Company" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-colors" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input type="email" placeholder="Email" required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-colors" />
                  <input type="tel" placeholder="Phone" required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-colors" />
                </div>
                <select className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors appearance-none" defaultValue="">
                  <option value="" disabled>Required Capacity</option>
                  <option value="1kw">1kW System</option>
                  <option value="3kw">3kW System</option>
                  <option value="5kw">5kW System</option>
                  <option value="custom">Custom/Commercial</option>
                </select>
                <textarea placeholder="Message" rows={4} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-colors resize-none"></textarea>
                <button 
                  type="submit" 
                  className="w-full btn-primary py-4 font-bold text-lg"
                  disabled={isSubmitting}
                  style={submitSuccess ? { backgroundColor: '#10B981', color: 'white' } : {}}
                >
                  {btnText}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#051118] text-gray-400 py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                  <Wind className="text-primary w-5 h-5" />
                </div>
                <span className="font-bold text-xl tracking-tight text-white">Dariyush Motors</span>
              </div>
              <p className="text-sm mb-4 max-w-sm">A next-generation renewable energy manufacturer focused on practical urban deployment and decentralized power solutions.</p>
              <p className="text-xs text-gray-500">CIN: U27100MP2024PTC073691 | Inc: 22/11/2024</p>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#about" className="hover:text-accent transition-colors">About Us</a></li>
                <li><a href="#products" className="hover:text-accent transition-colors">Products</a></li>
                <li><a href="#how-it-works" className="hover:text-accent transition-colors">Technology</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Connect</h4>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent hover:text-primary transition-all"><Linkedin className="w-5 h-5" /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent hover:text-primary transition-all"><Twitter className="w-5 h-5" /></a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs">
            <p>&copy; 2026 Dariyushmotors Pvt Ltd. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
