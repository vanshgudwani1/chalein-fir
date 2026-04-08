import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.column}>
          <h3>Chalein Fir (Ajay Modi Travels)</h3>
          <p>Leading travel company with 45+ branches across India, specializing in domestic & international tours with 95% customer satisfaction.</p>
          <div className={styles.contact}>
            <p><strong>Phone:</strong> +91-98250 96999 | +91-98790 99946</p>
          </div>
        </div>
        
        <div className={styles.column}>
          <h4>Quick Links</h4>
          <Link href="/">Home</Link>
          <Link href="#weekend">Weekend Gateways</Link>
          <Link href="#about">About Us</Link>
          <Link href="#blogs">Blogs</Link>
          <Link href="#contact">Contact Us</Link>
        </div>
        
        <div className={styles.column}>
          <h4>Locations</h4>
          <p>Ahmedabad</p>
          <p>Vadodara</p>
          <p>Rajkot</p>
          <p>Surat</p>
          <p>Gandhinagar</p>
          <p>Mumbai</p>
        </div>
      </div>
      <div className={styles.bottomBar}>
        <p>© 2026 Chalein Fir (Ajay Modi Travels). All rights reserved. | Privacy Policy | Terms & Conditions</p>
      </div>
    </footer>
  );
}
