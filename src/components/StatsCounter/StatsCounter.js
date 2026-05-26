"use client";
import { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { HiAcademicCap, HiUsers, HiBriefcase, HiBookOpen } from "react-icons/hi";
import styles from "./StatsCounter.module.css";

const stats = [
  { icon: HiAcademicCap, value: 38, suffix: "+", label: "Years of Excellence", color: "#1565c0" },
  { icon: HiUsers, value: 5200, suffix: "+", label: "Graduates Trained", color: "#0d2460" },
  { icon: HiBriefcase, value: 98, suffix: "%", label: "Employment Rate", color: "#c62828" },
  { icon: HiBookOpen, value: 12, suffix: "", label: "Programs Offered", color: "#f59e0b" },
];

export default function StatsCounter() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className={styles.section} ref={ref}>
      <div className={styles.bg} />
      <div className={`${styles.inner} container`}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Our Impact</span>
          <h2 className={styles.title}>Numbers That Speak for Themselves</h2>
        </motion.div>
        <div className={styles.grid}>
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className={styles.card}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
            >
              <div className={styles.iconWrap} style={{ background: `${stat.color}15` }}>
                <stat.icon className={styles.icon} style={{ color: stat.color }} />
              </div>
              <div className={styles.valueWrap}>
                {inView && (
                  <span className={styles.value} style={{ color: stat.color }}>
                    <CountUp
                      end={stat.value}
                      duration={2.5}
                      separator=","
                      delay={i * 0.12}
                    />
                    {stat.suffix}
                  </span>
                )}
              </div>
              <p className={styles.label}>{stat.label}</p>
              <div className={styles.bar} style={{ background: stat.color }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
