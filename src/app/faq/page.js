"use client";
import { useState } from "react";
import PageBanner from "@/components/PageBanner/PageBanner";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import styles from "./page.module.css";

const faqs = [
  { q: "What are the entry requirements for the P1 program?", a: "The minimum entry requirement for the Primary Teacher Education (P1) program is a Kenya Certificate of Secondary Education (KCSE) with a mean grade of C- (minus) and above, or a Division IV in the Kenya Certificate of Education (KCE)." },
  { q: "How long do the teacher training programs take?", a: "The P1, ECDE, and SNE programs each take 2 years to complete. Shorter certificate courses like Art & Craft and Education Management take 1 year." },
  { q: "Is the college registered with the Ministry of Education?", a: "Yes. St John's Teachers Training College is fully registered and accredited by the Ministry of Education and all our programs are approved by the Kenya National Examinations Council (KNEC)." },
  { q: "Are graduates automatically registered with TSC?", a: "Upon graduation, students qualify to apply for registration with the Teachers Service Commission (TSC). The college provides full support through this process including documentation and verification." },
  { q: "Is accommodation available on campus?", a: "Yes, we offer student hostels on campus for both male and female students. The hostels are secure, comfortable, and affordable. Students are also free to seek accommodation off campus." },
  { q: "Are students eligible for HELB loans?", a: "Yes! St John's is an approved institution for the Higher Education Loans Board (HELB). Students can apply for loans to cover tuition and upkeep while studying." },
  { q: "When is the application deadline?", a: "Applications for the 2024/2025 academic year close on August 31, 2024. We recommend applying early as placement is competitive." },
  { q: "How do I apply online?", a: "Visit our Apply Online page, fill in the application form, upload your documents (KCSE certificate, ID, passport photo), and submit. Our admissions office will contact you within 5 working days." },
  { q: "What are the tuition fees?", a: "Tuition fees vary by program. Please visit the Admissions page or contact our admissions office for current fee schedules. Payment plans and HELB support are available." },
  { q: "Does the college offer any scholarship programs?", a: "Yes, the college offers a limited number of merit-based bursaries. We also partner with county governments and NGOs to support needy but deserving students." },
];

function FaqItem({ item, index }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      className={styles.faqItem}
      initial={{ opacity:0, y:16 }}
      whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true }}
      transition={{ delay: index*0.07, duration:0.4 }}
    >
      <button className={styles.faqQ} onClick={() => setOpen(!open)}>
        <span>{item.q}</span>
        {open ? <FiChevronUp className={styles.faqIcon} /> : <FiChevronDown className={styles.faqIcon} />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.faqA}
            initial={{ height:0, opacity:0 }}
            animate={{ height:"auto", opacity:1 }}
            exit={{ height:0, opacity:0 }}
            transition={{ duration:0.3 }}
          >
            <p>{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQPage() {
  return (
    <div>
      <PageBanner title="Frequently Asked Questions" subtitle="Answers to your most common questions" image="/images/campus/about-banner.jpg" breadcrumbs={[{ label:"FAQ" }]} />
      <section className="section-padding">
        <div className="container" style={{ maxWidth:860 }}>
          <div className="text-center" style={{ marginBottom:48 }}>
            <span className="section-label">Got Questions?</span>
            <h2 className="section-title">We Have Answers</h2>
            <p className="section-subtitle">Can't find your answer? <a href="/contact" style={{ color:"var(--blue-dark)", fontWeight:600 }}>Contact us directly</a></p>
          </div>
          <div className={styles.faqList}>
            {faqs.map((f, i) => <FaqItem key={i} item={f} index={i} />)}
          </div>
        </div>
      </section>
    </div>
  );
}
