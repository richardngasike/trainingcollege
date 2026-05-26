"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";
import styles from "./Navbar.module.css";

const navLinks = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/about",
    dropdown: [
      { label: "About Us", href: "/about" },
      { label: "Principal's Message", href: "/principal-message" },
      { label: "Staff Directory", href: "/staff" },
    ],
  },
  {
    label: "Academics",
    href: "/courses",
    dropdown: [
      { label: "Courses Offered", href: "/courses" },
      { label: "Departments", href: "/departments" },
      { label: "Student Life", href: "/student-life" },
    ],
  },
  {
    label: "Admissions",
    href: "/admissions",
    dropdown: [
      { label: "Admissions Info", href: "/admissions" },
      { label: "Apply Online", href: "/apply" },
    ],
  },
  { label: "News & Events", href: "/news" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  const handleMouseEnter = (label) => {
    clearTimeout(timeoutRef.current);
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  return (
    <header className={`${styles.navbar} ${scrolled ? styles.scrolled : styles.transparent}`}>
      <div className={`${styles.inner} container`}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <div className={styles.logoImgWrap}>
            <Image
              src="/logo.png"
              alt="St John's Teachers Training College Logo"
              width={56}
              height={56}
              className={styles.logoImg}
              priority
            />
          </div>
          <div className={styles.logoText}>
            <span className={styles.logoName}>St John's</span>
            <span className={styles.logoSub}>Teachers Training College</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className={styles.desktopNav}>
          {navLinks.map((link) => (
            <div
              key={link.label}
              className={styles.navItem}
              onMouseEnter={() => link.dropdown && handleMouseEnter(link.label)}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href={link.href}
                className={`${styles.navLink} ${pathname === link.href ? styles.active : ""}`}
              >
                {link.label}
                {link.dropdown && <FiChevronDown className={styles.chevron} />}
              </Link>

              {link.dropdown && (
                <AnimatePresence>
                  {activeDropdown === link.label && (
                    <motion.div
                      className={styles.dropdown}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                    >
                      {link.dropdown.map((sub) => (
                        <Link key={sub.href} href={sub.href} className={styles.dropdownLink}>
                          {sub.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
        </nav>

        {/* CTA Buttons */}
        <div className={styles.navActions}>
          {user ? (
            <>
              <Link
                href={user.role === "admin" ? "/dashboard/admin" : "/dashboard/student"}
                className={styles.dashBtn}
              >
                Dashboard
              </Link>
              <button onClick={logout} className={styles.logoutBtn}>Logout</button>
            </>
          ) : (
            <>
              <Link href="/login" className={styles.loginBtn}>Login</Link>
              <Link href="/apply" className={styles.applyBtn}>Apply Now</Link>
            </>
          )}
        </div>

        {/* Hamburger */}
        <button
          className={styles.hamburger}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link) => (
              <div key={link.label} className={styles.mobileItem}>
                <Link href={link.href} className={styles.mobileLink}>
                  {link.label}
                </Link>
                {link.dropdown && (
                  <div className={styles.mobileSub}>
                    {link.dropdown.map((sub) => (
                      <Link key={sub.href} href={sub.href} className={styles.mobileSubLink}>
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className={styles.mobileCTA}>
              {user ? (
                <Link href={user.role === "admin" ? "/dashboard/admin" : "/dashboard/student"} className={styles.applyBtn}>
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link href="/login" className={styles.loginBtn}>Login</Link>
                  <Link href="/apply" className={styles.applyBtn}>Apply Now</Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
