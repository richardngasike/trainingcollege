"use client";
import { motion } from "framer-motion";
import styles from "./DashboardCard.module.css";

export default function DashboardCard({ icon: Icon, label, value, color = "#1565c0", trend, index = 0 }) {
  return (
    <motion.div
      className={styles.card}
      initial={{ opacity:0, y:20 }}
      animate={{ opacity:1, y:0 }}
      transition={{ delay: index * 0.08 }}
    >
      <div className={styles.iconWrap} style={{ background:`${color}15` }}>
        {Icon && <Icon className={styles.icon} style={{ color }} />}
      </div>
      <div className={styles.body}>
        <p className={styles.value}>{value}</p>
        <p className={styles.label}>{label}</p>
      </div>
      {trend && <span className={styles.trend}>{trend}</span>}
    </motion.div>
  );
}
