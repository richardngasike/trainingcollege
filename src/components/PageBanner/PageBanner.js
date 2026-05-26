"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiHome, FiChevronRight } from "react-icons/fi";
import styles from "./PageBanner.module.css";

export default function PageBanner({ title, subtitle, image, breadcrumbs = [] }) {
  return (
    <section className={styles.banner}>
      <div className={styles.bg}>
        <img
          src={image || "/images/campus/banner.jpg"}
          alt={title}
          className={styles.bgImg}
        />
        <div className={styles.overlay} />
      </div>
      <div className={`${styles.content} container`}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <nav className={styles.breadcrumb}>
            <Link href="/" className={styles.breadcrumbLink}>
              <FiHome size={14} /> Home
            </Link>
            {breadcrumbs.map((b, i) => (
              <span key={i} className={styles.breadcrumbItem}>
                <FiChevronRight size={13} />
                {b.href ? (
                  <Link href={b.href} className={styles.breadcrumbLink}>{b.label}</Link>
                ) : (
                  <span className={styles.breadcrumbCurrent}>{b.label}</span>
                )}
              </span>
            ))}
          </nav>
          <h1 className={styles.title}>{title}</h1>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </motion.div>
      </div>
    </section>
  );
}
