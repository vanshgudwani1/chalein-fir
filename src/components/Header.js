import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <h2>Chalein Fir</h2>
        </Link>
      </div>
      <nav className={styles.nav}>
        <Link href="/" className={styles.navLink}>Home</Link>
        <Link href="#domestic" className={styles.navLink}>Domestic</Link>
        <Link href="#international" className={styles.navLink}>International</Link>
        <Link href="#contact" className={styles.navLink}>Contact Us</Link>
      </nav>
      <div className={styles.contactInfo}>
        <a href="tel:+919825096999" className={styles.phoneLink}>+91-98250 96999</a>
      </div>
    </header>
  );
}
