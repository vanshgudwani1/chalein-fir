"use client";
import Link from 'next/link';
import { useState } from 'react';
import styles from './Header.module.css';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <h2>Chalein Fir</h2>
        </Link>
      </div>

      <nav className={`${styles.nav} ${isOpen ? styles.navOpen : ''}`}>
        <Link href="/" className={styles.navLink} onClick={() => setIsOpen(false)}>Home</Link>
        <Link href="#domestic" className={styles.navLink} onClick={() => setIsOpen(false)}>Domestic</Link>
        <Link href="#international" className={styles.navLink} onClick={() => setIsOpen(false)}>International</Link>
        <Link href="#contact" className={styles.navLink} onClick={() => setIsOpen(false)}>Contact Us</Link>
      </nav>

      <div className={styles.contactInfo}>
        <a href="tel:+919825096999" className={styles.phoneLink}>+91-98250 96999</a>
      </div>

      <button className={styles.hamburger} onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
        <span className={`${styles.bar} ${isOpen ? styles.bar1 : ''}`}></span>
        <span className={`${styles.bar} ${isOpen ? styles.bar2 : ''}`}></span>
        <span className={`${styles.bar} ${isOpen ? styles.bar3 : ''}`}></span>
      </button>
    </header>
  );
}
