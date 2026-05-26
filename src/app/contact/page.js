"use client";
import { useState } from "react";
import PageBanner from "@/components/PageBanner/PageBanner";
import { motion } from "framer-motion";
import { FiMapPin, FiPhone, FiMail, FiClock, FiSend } from "react-icons/fi";
import toast from "react-hot-toast";
import styles from "./page.module.css";

export default function ContactPage() {
  const [form, setForm] = useState({ name:"", email:"", phone:"", subject:"", message:"" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contacts/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        toast.success("Message sent successfully! We will respond within 24 hours.");
        setForm({ name:"", email:"", phone:"", subject:"", message:"" });
      } else {
        toast.error("Failed to send. Please try again.");
      }
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const info = [
    { icon: FiMapPin, title: "Location", lines: ["P.O. Box 1234-00200", "Off Thika Road, Ruiru", "Nairobi, Kenya"] },
    { icon: FiPhone, title: "Phone", lines: ["+254 712 345 678", "+254 733 456 789"] },
    { icon: FiMail, title: "Email", lines: ["info@stjohnstc.ac.ke", "admissions@stjohnstc.ac.ke"] },
    { icon: FiClock, title: "Office Hours", lines: ["Mon - Fri: 8:00 AM - 5:00 PM", "Sat: 9:00 AM - 1:00 PM"] },
  ];

  return (
    <div>
      <PageBanner title="Contact Us" subtitle="We are here to answer your questions" image="/images/campus/contact-banner.jpg" breadcrumbs={[{ label:"Contact" }]} />
      <section className="section-padding">
        <div className="container">
          <div className={styles.grid}>
            <motion.div initial={{ opacity:0, x:-30 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}>
              <span className="section-label">Get in Touch</span>
              <h2 className="section-title">We Would Love to Hear From You</h2>
              <p style={{ color:"var(--gray-500)", marginTop:12, marginBottom:36, lineHeight:1.75 }}>
                Whether you have a question about admissions, programs, fees, or campus life, our team is ready to help.
              </p>
              <div className={styles.infoGrid}>
                {info.map((item, i) => (
                  <div key={i} className={styles.infoCard}>
                    <div className={styles.infoIcon}><item.icon /></div>
                    <div>
                      <h4 className={styles.infoTitle}>{item.title}</h4>
                      {item.lines.map((line, j) => <p key={j} className={styles.infoLine}>{line}</p>)}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity:0, x:30 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}>
              <div className={styles.formCard}>
                <h3 className={styles.formTitle}>Send Us a Message</h3>
                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.row2}>
                    <div className={styles.fieldGroup}>
                      <label className={styles.label}>Full Name</label>
                      <input className={styles.input} type="text" placeholder="Your full name" value={form.name} onChange={e => setForm({...form, name:e.target.value})} required />
                    </div>
                    <div className={styles.fieldGroup}>
                      <label className={styles.label}>Email Address</label>
                      <input className={styles.input} type="email" placeholder="your@email.com" value={form.email} onChange={e => setForm({...form, email:e.target.value})} required />
                    </div>
                  </div>
                  <div className={styles.row2}>
                    <div className={styles.fieldGroup}>
                      <label className={styles.label}>Phone Number</label>
                      <input className={styles.input} type="tel" placeholder="+254 712 345 678" value={form.phone} onChange={e => setForm({...form, phone:e.target.value})} />
                    </div>
                    <div className={styles.fieldGroup}>
                      <label className={styles.label}>Subject</label>
                      <select className={styles.input} value={form.subject} onChange={e => setForm({...form, subject:e.target.value})} required>
                        <option value="">Select subject</option>
                        <option>Admissions Inquiry</option>
                        <option>Course Information</option>
                        <option>Fees & Funding</option>
                        <option>Campus Visit</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>
                  <div className={styles.fieldGroup}>
                    <label className={styles.label}>Message</label>
                    <textarea className={`${styles.input} ${styles.textarea}`} placeholder="Write your message here..." rows={5} value={form.message} onChange={e => setForm({...form, message:e.target.value})} required />
                  </div>
                  <button type="submit" className={`btn-primary ${styles.submitBtn}`} disabled={loading}>
                    {loading ? "Sending..." : <><FiSend /> Send Message</>}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>

          {/* Map */}
          <div className={styles.mapSection}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.226025085!2d36.9666!3d-1.1483!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f3f9b5c5e59c7%3A0x1234567890abcdef!2sRuiru%2C%20Kenya!5e0!3m2!1sen!2ske!4v1700000000000!5m2!1sen!2ske"
              width="100%" height="400"
              style={{ border:0, borderRadius:"16px" }}
              allowFullScreen loading="lazy"
              title="St John's Location"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
