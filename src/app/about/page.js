"use client";
import PageBanner from "@/components/PageBanner/PageBanner";
import { motion } from "framer-motion";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";
import { HiAcademicCap, HiUsers, HiGlobe, HiHeart } from "react-icons/hi";
import Link from "next/link";
import styles from "./page.module.css";

const values = [
  { icon: HiAcademicCap, title: "Academic Excellence", desc: "Uncompromising standards of educational quality in every program we offer." },
  { icon: HiHeart, title: "Christian Values", desc: "Founded on faith, integrity, compassion, and service to God and humanity." },
  { icon: HiUsers, title: "Community", desc: "A vibrant, inclusive campus family that supports and inspires one another." },
  { icon: HiGlobe, title: "National Impact", desc: "Training teachers who transform classrooms and communities across Kenya." },
];

const milestones = [
  { year: "1985", event: "College founded by St John's Anglican Church Mission" },
  { year: "1990", event: "First cohort of P1 graduates entered Kenya classrooms" },
  { year: "1998", event: "Expanded to include ECDE Teacher Training program" },
  { year: "2005", event: "Special Needs Education department established" },
  { year: "2012", event: "New ICT center and modern library commissioned" },
  { year: "2018", event: "5000th graduate milestone celebrated" },
  { year: "2022", event: "New student hostel and sports complex opened" },
  { year: "2024", event: "Fully digitized admission and records system launched" },
];

export default function AboutPage() {
  return (
    <div>
      <PageBanner
        title="About St John's College"
        subtitle="A legacy of excellence in teacher training since 1985"
        image="/images/campus/about-banner.jpg"
        breadcrumbs={[{ label: "About Us" }]}
      />
      <section className="section-padding">
        <div className="container">
          <div className={styles.aboutGrid}>
            <motion.div initial={{ opacity:0, x:-30 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}>
              <div className={styles.imgWrap}>
                <img src="/images/campus/campus1.jpg" alt="Campus" className={styles.mainImg} />
                <img src="/images/campus/campus2.jpg" alt="Campus 2" className={styles.floatImg} />
              </div>
            </motion.div>
            <motion.div initial={{ opacity:0, x:30 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}>
              <span className="section-label">Our Story</span>
              <h2 className="section-title">Inspiring Teachers Since 1985</h2>
              <p style={{ color:"var(--gray-600)", lineHeight:1.8, marginTop:16, marginBottom:16 }}>
                St John's Teachers Training College was established in 1985 under the auspices of the Anglican
                Church of Kenya. For nearly four decades, we have been shaping the hearts and minds of Kenya's
                educators, producing graduates who carry excellence, compassion, and faith into every classroom.
              </p>
              <p style={{ color:"var(--gray-600)", lineHeight:1.8, marginBottom:24 }}>
                Our Ministry of Education-accredited programs combine rigorous academic preparation with practical
                teaching experience, ensuring every graduate is classroom-ready from day one.
              </p>
              <Link href="/apply" className="btn-primary">Apply Today <FiArrowRight /></Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className={styles.mvSection}>
        <div className="container">
          <div className={styles.mvGrid}>
            <div className={styles.mvCard}>
              <h3 className={styles.mvTitle}>Our Mission</h3>
              <p className={styles.mvText}>
                To provide quality, Christ-centered teacher education that equips educators with
                the knowledge, skills, and values needed to transform Kenya's learning landscape.
              </p>
            </div>
            <div className={`${styles.mvCard} ${styles.mvCardAccent}`}>
              <h3 className={styles.mvTitle}>Our Vision</h3>
              <p className={styles.mvText}>
                To be Kenya's leading teacher training college, recognized for academic excellence,
                faith-based values, and graduates who lead positive change in education.
              </p>
            </div>
            <div className={styles.mvCard}>
              <h3 className={styles.mvTitle}>Our Motto</h3>
              <p className={styles.mvText} style={{ fontStyle:"italic", fontSize:"1.1rem" }}>
                "Inspiring teachers, Empowering minds"
              </p>
              <p className={styles.mvText} style={{ marginTop:10 }}>
                Every decision we make, every program we run, is guided by this mission to inspire
                and empower through quality education.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center" style={{ marginBottom:48 }}>
            <span className="section-label">What Drives Us</span>
            <h2 className="section-title">Our Core Values</h2>
          </div>
          <div className={styles.valuesGrid}>
            {values.map((v,i) => (
              <motion.div key={i} className={styles.valueCard}
                initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }} transition={{ delay:i*0.12, duration:0.5 }}>
                <div className={styles.valueIcon}><v.icon /></div>
                <h3 className={styles.valueTitle}>{v.title}</h3>
                <p className={styles.valueDesc}>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className={styles.timeline}>
        <div className="container">
          <div className="text-center" style={{ marginBottom:48 }}>
            <span className="section-label">Our Journey</span>
            <h2 className="section-title">Key Milestones</h2>
          </div>
          <div className={styles.timelineList}>
            {milestones.map((m, i) => (
              <motion.div key={i} className={`${styles.timelineItem} ${i%2===0 ? styles.left : styles.right}`}
                initial={{ opacity:0, x: i%2===0 ? -24 : 24 }} whileInView={{ opacity:1, x:0 }}
                viewport={{ once:true }} transition={{ delay:i*0.08, duration:0.5 }}>
                <div className={styles.timelineDot} />
                <div className={styles.timelineCard}>
                  <span className={styles.timelineYear}>{m.year}</span>
                  <p className={styles.timelineEvent}>{m.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
