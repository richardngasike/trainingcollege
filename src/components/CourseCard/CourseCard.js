"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight, FiClock, FiBookOpen } from "react-icons/fi";
import { HiAcademicCap } from "react-icons/hi";
import styles from "./CourseCard.module.css";

export default function CourseCard({ course, index = 0 }) {
  const { id, title, duration, description, image, level, category } = course;

  return (
    <motion.article
      className={styles.card}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className={styles.imgWrap}>
        <img src={image || "/images/courses/default.jpg"} alt={title} className={styles.img} />
        <div className={styles.overlay} />
        <div className={styles.badge}>
          <HiAcademicCap />
          {category || "Teaching"}
        </div>
        {level && <div className={styles.levelBadge}>{level}</div>}
      </div>
      <div className={styles.body}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.desc}>{description}</p>
        <div className={styles.meta}>
          <div className={styles.metaItem}>
            <FiClock className={styles.metaIcon} />
            <span>{duration}</span>
          </div>
          <div className={styles.metaItem}>
            <FiBookOpen className={styles.metaIcon} />
            <span>Certificate</span>
          </div>
        </div>
        <div className={styles.footer}>
          <Link href={`/courses/${id}`} className={styles.detailLink}>
            View Details <FiArrowRight />
          </Link>
          <Link href="/apply" className={styles.applyBtn}>
            Apply Now
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
