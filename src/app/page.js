"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./page.module.css";
import Scene from "@/components/Scene";

export default function Home() {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Select all sections to animate
    const sections = gsap.utils.toArray(`.${styles.section}`);

    sections.forEach((section, index) => {
      const textContent = section.querySelector(`.${styles.textContent}`);
      const visualContent = section.querySelector(`.${styles.visualContent}`);
      
      const isLeft = index % 2 === 0;

      // Reset initial styles for animation
      gsap.set(textContent, { opacity: 0, x: isLeft ? -100 : 100 });
      gsap.set(visualContent, { opacity: 0, x: isLeft ? 100 : -100, scale: 0.8 });

      // Create scroll trigger for each section
      ScrollTrigger.create({
        trigger: section,
        start: "top 60%", // When top of section hits 60% of viewport
        end: "bottom 20%",
        onEnter: () => {
          gsap.to(textContent, { opacity: 1, x: 0, duration: 1, ease: "power3.out" });
          gsap.to(visualContent, { opacity: 1, x: 0, scale: 1, duration: 1, ease: "power3.out", delay: 0.2 });
        },
        onLeaveBack: () => {
          gsap.to(textContent, { opacity: 0, x: isLeft ? -100 : 100, duration: 0.5 });
          gsap.to(visualContent, { opacity: 0, x: isLeft ? 100 : -100, scale: 0.8, duration: 0.5 });
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <main className={styles.container} ref={containerRef}>
      <Scene />

      {/* Section 1: Hero */}
      <section id="home" className={`${styles.section} ${styles.sectionLeft}`}>
        <div className={styles.textContent}>
          <h1 className={styles.heading}>Chalein Fir!</h1>
          <p className={styles.paragraph}>
            Preparing your journey... A stunning land of mountains, gardens, and natural beauty that offers peace, adventure, and unforgettable experiences.
          </p>
          <button className={styles.button}>Start Exploring</button>
        </div>
        <div className={styles.visualContent}>
          <div className={styles.placeholderImage}>Wander</div>
        </div>
      </section>

      {/* Section 2: Domestic */}
      <section id="domestic" className={`${styles.section} ${styles.sectionRight}`}>
        <div className={styles.textContent}>
          <h2 className={styles.heading}>Domestic Destinations</h2>
          <p className={styles.paragraph}>
            Handpicked luxury experiences at the most sought-after destinations across Incredible India. Choose your perfect travel style and explore curated packages tailored just for you.
          </p>
          <button className={styles.button}>View Domestic</button>
        </div>
        <div className={styles.visualContent}>
          <div className={styles.placeholderImage}>India</div>
        </div>
      </section>

      {/* Section 3: International */}
      <section id="international" className={`${styles.section} ${styles.sectionLeft}`}>
        <div className={styles.textContent}>
          <h2 className={styles.heading}>Global Getaways</h2>
          <p className={styles.paragraph}>
            Explore the world with exclusive international packages and handpicked luxury experiences at the world's most sought-after international destinations.
          </p>
          <button className={styles.button}>See International</button>
        </div>
        <div className={styles.visualContent}>
          <div className={styles.placeholderImage}>Global</div>
        </div>
      </section>

      {/* Section 4: Contact/Testimonial */}
      <section id="contact" className={`${styles.section} ${styles.sectionRight}`}>
        <div className={styles.textContent}>
          <h2 className={styles.heading}>Travel Your Way</h2>
          <p className={styles.paragraph}>
            Trusted by 50,000+ happy families with a 95% satisfaction rate. We have a Pan-India presence with 40+ branches to support your 24/7 safe and secure journey.
          </p>
          <button className={styles.button}>Contact Us</button>
        </div>
        <div className={styles.visualContent}>
          <div className={styles.placeholderImage}>Trust</div>
        </div>
      </section>
    </main>
  );
}
