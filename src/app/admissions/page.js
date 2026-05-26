"use client";
import PageBanner from "@/components/PageBanner/PageBanner";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiArrowRight, FiCheckCircle, FiFile, FiCalendar, FiDollarSign } from "react-icons/fi";
import styles from "./page.module.css";

const steps = [
  { icon: FiFile, step: "01", title: "Check Requirements", desc: "Confirm you meet the entry requirements for your desired program." },
  { icon: FiFile, step: "02", title: "Fill Application Form", desc: "Complete the online application form with accurate personal and academic details." },
  { icon: FiFile, step: "03", title: "Upload Documents", desc: "Upload KCSE certificate, national ID, and passport photo." },
  { icon: FiCalendar, step: "04", title: "Await Admission Letter", desc: "Our admissions team will review and respond within 5 working days." },
  { icon: FiDollarSign, step: "05", title: "Pay & Register", desc: "Pay the admission fee and complete registration to secure your place." },
];

const requirements = [
  "KCSE certificate with mean grade C- or above",
  "Kenyan National ID or Birth Certificate",
  "KCSE transcript from your school",
  "Passport-size photograph (2 copies)",
  "Copy of NHIF card (if applicable)",
  "Medical fitness certificate (on joining)",
];

export default function AdmissionsPage() {
  return (
    <div>
      <PageBanner title="Admissions" subtitle="Join Kenya's premier teacher training institution" image="/images/campus/admissions.jpg" breadcrumbs={[{ label:"Admissions" }]} />
      <section className="section-padding">
        <div className="container">
          <div className={styles.introGrid}>
            <div>
              <span className="section-label">Join Us</span>
              <h2 className="section-title">Start Your Teaching Journey</h2>
              <p style={{ color:"var(--gray-600)", marginTop:16, lineHeight:1.8 }}>
                We welcome applications from motivated Kenyan students who are passionate about teaching
                and making a difference in learners' lives. Applications are now open for the 2024/2025
                academic year.
              </p>
              <div style={{ marginTop:24, padding:"20px 24px", background:"var(--gold-light)", borderRadius:14, borderLeft:"4px solid var(--gold-accent)" }}>
                <p style={{ fontFamily:"var(--font-heading)", fontWeight:700, color:"var(--blue-deep)" }}>
                  Application Deadline: August 31, 2024
                </p>
                <p style={{ fontSize:"0.88rem", color:"var(--gray-600)", marginTop:4 }}>
                  Apply early — placements are limited and competitive.
                </p>
              </div>
              <div style={{ marginTop:28, display:"flex", gap:14 }}>
                <Link href="/apply" className="btn-primary">Apply Now <FiArrowRight /></Link>
                <Link href="/contact" className="btn-secondary">Ask a Question</Link>
              </div>
            </div>
            <div>
              <div className={styles.reqCard}>
                <h3 className={styles.reqTitle}>Entry Requirements</h3>
                <ul className={styles.reqList}>
                  {requirements.map((r, i) => (
                    <li key={i} className={styles.reqItem}>
                      <FiCheckCircle className={styles.reqIcon} /> {r}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div style={{ marginTop:80 }}>
            <div className="text-center" style={{ marginBottom:48 }}>
              <span className="section-label">How to Apply</span>
              <h2 className="section-title">Application Process</h2>
            </div>
            <div className={styles.stepsGrid}>
              {steps.map((s, i) => (
                <motion.div key={i} className={styles.stepCard}
                  initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
                  viewport={{ once:true }} transition={{ delay:i*0.1, duration:0.5 }}>
                  <span className={styles.stepNum}>{s.step}</span>
                  <div className={styles.stepIcon}><s.icon /></div>
                  <h4 className={styles.stepTitle}>{s.title}</h4>
                  <p className={styles.stepDesc}>{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
