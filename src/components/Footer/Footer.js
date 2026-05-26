"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FiMapPin, FiPhone, FiMail, FiArrowRight,
  FiFacebook, FiTwitter, FiInstagram, FiYoutube, FiLinkedin
} from "react-icons/fi";
import styles from "./Footer.module.css";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Courses Offered", href: "/courses" },
  { label: "Departments", href: "/departments" },
  { label: "Admissions", href: "/admissions" },
  { label: "Apply Online", href: "/apply" },
];

const moreLinks = [
  { label: "News & Events", href: "/news" },
  { label: "Gallery", href: "/gallery" },
  { label: "Student Life", href: "/student-life" },
  { label: "Staff Directory", href: "/staff" },
  { label: "Contact Us", href: "/contact" },
  { label: "FAQ", href: "/faq" },
];

const socials = [
  { icon: FiFacebook, href: "#", label: "Facebook" },
  { icon: FiTwitter, href: "#", label: "Twitter" },
  { icon: FiInstagram, href: "#", label: "Instagram" },
  { icon: FiYoutube, href: "#", label: "YouTube" },
  { icon: FiLinkedin, href: "#", label: "LinkedIn" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(""); }
  };

  return (
    <footer className={styles.footer}>
      {/* Top Wave */}
      <div className={styles.wave}>
        <svg viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none">
          <path d="M0,60 C360,0 1080,0 1440,60 L1440,0 L0,0 Z" fill="#0d2460" />
        </svg>
      </div>

      <div className={styles.main}>
        <div className={`${styles.grid} container`}>
          {/* Brand */}
          <div className={styles.brand}>
            <div className={styles.logoRow}>
              <div className={styles.logoImgWrap}>
                <Image src="/logo.png" alt="St John's Logo" width={64} height={64} />
              </div>
              <div>
                <p className={styles.brandName}>St John's</p>
                <p className={styles.brandSub}>Teachers Training College</p>
              </div>
            </div>
            <p className={styles.brandDesc}>
              Inspiring teachers and empowering minds since 1985. We are committed to training
              quality, competent, and Christ-centered educators for Kenya and beyond.
            </p>
            <div className={styles.socials}>
              {socials.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} aria-label={label} className={styles.socialLink} target="_blank" rel="noopener noreferrer">
                  <Icon />
                </a>
              ))}
            </div>
            <div className={styles.motto}>
              <span>"Inspiring teachers, Empowering minds"</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Quick Links</h4>
            <ul className={styles.linkList}>
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={styles.footerLink}>
                    <FiArrowRight className={styles.linkArrow} /> {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More Links */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Explore More</h4>
            <ul className={styles.linkList}>
              {moreLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={styles.footerLink}>
                    <FiArrowRight className={styles.linkArrow} /> {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Get in Touch</h4>
            <div className={styles.contactList}>
              <div className={styles.contactItem}>
                <FiMapPin className={styles.contactIcon} />
                <span>P.O. Box 1234, Nairobi, Kenya<br />Off Thika Road, Ruiru</span>
              </div>
              <div className={styles.contactItem}>
                <FiPhone className={styles.contactIcon} />
                <a href="tel:+254712345678" className={styles.contactLink}>+254 712 345 678</a>
              </div>
              <div className={styles.contactItem}>
                <FiMail className={styles.contactIcon} />
                <a href="mailto:info@stjohnstc.ac.ke" className={styles.contactLink}>info@stjohnstc.ac.ke</a>
              </div>
            </div>

            <h4 className={styles.colTitle} style={{ marginTop: "24px" }}>Newsletter</h4>
            {subscribed ? (
              <p className={styles.successMsg}>Thank you for subscribing!</p>
            ) : (
              <form onSubmit={handleSubscribe} className={styles.newsletter}>
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.newsletterInput}
                  required
                />
                <button type="submit" className={styles.newsletterBtn}>
                  <FiArrowRight />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Map */}
        <div className={`${styles.mapSection} container`}>
          <div className={styles.mapWrap}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.226025085!2d36.9666!3d-1.1483!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f3f9b5c5e59c7%3A0x1234567890abcdef!2sRuiru%2C%20Kenya!5e0!3m2!1sen!2ske!4v1700000000000!5m2!1sen!2ske"
              width="100%"
              height="220"
              style={{ border: 0, borderRadius: "12px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="St John's College Location"
            />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={styles.bottom}>
        <div className={`${styles.bottomInner} container`}>
          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} St John's Teachers Training College. All rights reserved.
          </p>
          <div className={styles.bottomLinks}>
            <Link href="/faq" className={styles.bottomLink}>Privacy Policy</Link>
            <Link href="/faq" className={styles.bottomLink}>Terms of Use</Link>
            <Link href="/contact" className={styles.bottomLink}>Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
