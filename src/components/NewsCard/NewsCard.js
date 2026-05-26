"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight, FiCalendar, FiTag } from "react-icons/fi";
import styles from "./NewsCard.module.css";

export default function NewsCard({ item, index = 0 }) {
  const { id, title, summary, image, date, category, slug } = item;

  return (
    <motion.article
      className={styles.card}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className={styles.imgWrap}>
        <img src={image || "/images/news/default.jpg"} alt={title} className={styles.img} />
        {category && (
          <span className={styles.category}>
            <FiTag /> {category}
          </span>
        )}
      </div>
      <div className={styles.body}>
        <div className={styles.date}>
          <FiCalendar />
          <span>{date}</span>
        </div>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.summary}>{summary}</p>
        <Link href={`/news/${slug || id}`} className={styles.readMore}>
          Read More <FiArrowRight />
        </Link>
      </div>
    </motion.article>
  );
}
