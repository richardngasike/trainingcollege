"use client";
import { useState } from "react";
import PageBanner from "@/components/PageBanner/PageBanner";
import { motion } from "framer-motion";
import { FiUpload, FiArrowRight, FiCheckCircle } from "react-icons/fi";
import { applicationsAPI } from "@/lib/api";
import toast from "react-hot-toast";
import styles from "./page.module.css";

const programs = [
  "Primary Teacher Education (P1)",
  "Early Childhood Development Education (ECDE)",
  "Special Needs Education (SNE)",
  "Certificate in Education Management",
  "Pre-Primary Teacher Training",
  "Art & Craft in Education",
];

const steps = ["Personal Info", "Academic Details", "Program Choice", "Documents", "Review & Submit"];

export default function ApplyPage() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    first_name:"", last_name:"", dob:"", gender:"", id_number:"",
    email:"", phone:"", county:"",
    kcse_year:"", kcse_index:"", kcse_grade:"", previous_school:"",
    program:"", intake:"2024/2025",
    kcse_cert: null, id_copy: null, photo: null,
  });

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const setFile = (k) => (e) => setForm({ ...form, [k]: e.target.files[0] });

  const next = () => { if (step < 4) setStep(step + 1); };
  const prev = () => { if (step > 0) setStep(step - 1); };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => { if (v) fd.append(k, v); });
      await applicationsAPI.create(fd);
      setSubmitted(true);
      toast.success("Application submitted successfully!");
    } catch (err) {
      toast.error("Submission failed. Please try again or contact admissions.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) return (
    <div>
      <PageBanner title="Application Submitted" image="/images/campus/admissions.jpg" breadcrumbs={[{label:"Admissions",href:"/admissions"},{label:"Apply Online"}]} />
      <section className="section-padding">
        <div className="container" style={{ maxWidth:640, textAlign:"center" }}>
          <motion.div initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }}>
            <div className={styles.successIcon}><FiCheckCircle /></div>
            <h2 className={styles.successTitle}>Application Received!</h2>
            <p className={styles.successText}>
              Thank you for applying to St John's Teachers Training College. Your application has been
              received and is under review. You will receive an email notification within 5 working days.
            </p>
            <p className={styles.refNote}>Keep a screenshot of this page. Our team will contact you at <strong>{form.email}</strong>.</p>
            <div style={{ display:"flex", gap:14, justifyContent:"center", marginTop:28 }}>
              <a href="/" className="btn-primary">Back to Home <FiArrowRight /></a>
              <a href="/login" className="btn-secondary">Sign In to Dashboard</a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );

  return (
    <div>
      <PageBanner title="Apply Online" subtitle="Complete your application in minutes" image="/images/campus/admissions.jpg" breadcrumbs={[{label:"Admissions",href:"/admissions"},{label:"Apply Online"}]} />
      <section className="section-padding">
        <div className="container" style={{ maxWidth:860 }}>
          {/* Progress Bar */}
          <div className={styles.progress}>
            {steps.map((s, i) => (
              <div key={i} className={`${styles.progressItem} ${i<=step ? styles.progressActive : ""} ${i<step ? styles.progressDone : ""}`}>
                <div className={styles.progressDot}>
                  {i < step ? <FiCheckCircle /> : <span>{i+1}</span>}
                </div>
                <span className={styles.progressLabel}>{s}</span>
              </div>
            ))}
          </div>

          <div className={styles.formCard}>
            {/* Step 0: Personal Info */}
            {step === 0 && (
              <motion.div initial={{ opacity:0,x:20 }} animate={{ opacity:1,x:0 }}>
                <h3 className={styles.stepTitle}>Personal Information</h3>
                <div className={styles.grid2}>
                  <div className={styles.fg}><label className={styles.label}>First Name *</label><input className={styles.input} type="text" value={form.first_name} onChange={set("first_name")} required /></div>
                  <div className={styles.fg}><label className={styles.label}>Last Name *</label><input className={styles.input} type="text" value={form.last_name} onChange={set("last_name")} required /></div>
                  <div className={styles.fg}><label className={styles.label}>Date of Birth *</label><input className={styles.input} type="date" value={form.dob} onChange={set("dob")} required /></div>
                  <div className={styles.fg}><label className={styles.label}>Gender *</label>
                    <select className={styles.input} value={form.gender} onChange={set("gender")} required>
                      <option value="">Select gender</option><option>Male</option><option>Female</option>
                    </select>
                  </div>
                  <div className={styles.fg}><label className={styles.label}>National ID / Birth Cert. No. *</label><input className={styles.input} type="text" value={form.id_number} onChange={set("id_number")} required /></div>
                  <div className={styles.fg}><label className={styles.label}>County of Origin *</label><input className={styles.input} type="text" value={form.county} onChange={set("county")} required /></div>
                  <div className={styles.fg}><label className={styles.label}>Email Address *</label><input className={styles.input} type="email" value={form.email} onChange={set("email")} required /></div>
                  <div className={styles.fg}><label className={styles.label}>Phone Number *</label><input className={styles.input} type="tel" value={form.phone} onChange={set("phone")} required /></div>
                </div>
              </motion.div>
            )}

            {/* Step 1: Academic Details */}
            {step === 1 && (
              <motion.div initial={{ opacity:0,x:20 }} animate={{ opacity:1,x:0 }}>
                <h3 className={styles.stepTitle}>Academic Details</h3>
                <div className={styles.grid2}>
                  <div className={styles.fg}><label className={styles.label}>KCSE Year *</label><input className={styles.input} type="number" min={2000} max={2024} value={form.kcse_year} onChange={set("kcse_year")} required /></div>
                  <div className={styles.fg}><label className={styles.label}>KCSE Index Number *</label><input className={styles.input} type="text" placeholder="e.g. 123456789" value={form.kcse_index} onChange={set("kcse_index")} required /></div>
                  <div className={styles.fg}><label className={styles.label}>KCSE Mean Grade *</label>
                    <select className={styles.input} value={form.kcse_grade} onChange={set("kcse_grade")} required>
                      <option value="">Select grade</option>
                      {["A","A-","B+","B","B-","C+","C","C-","D+","D","D-","E"].map(g => <option key={g}>{g}</option>)}
                    </select>
                  </div>
                  <div className={styles.fg}><label className={styles.label}>Secondary School *</label><input className={styles.input} type="text" value={form.previous_school} onChange={set("previous_school")} required /></div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Program Choice */}
            {step === 2 && (
              <motion.div initial={{ opacity:0,x:20 }} animate={{ opacity:1,x:0 }}>
                <h3 className={styles.stepTitle}>Choose Your Program</h3>
                <div className={styles.programGrid}>
                  {programs.map(p => (
                    <button key={p} type="button"
                      className={`${styles.programCard} ${form.program===p ? styles.programSelected : ""}`}
                      onClick={() => setForm({...form, program:p})}>
                      <div className={styles.programRadio} />
                      <span>{p}</span>
                    </button>
                  ))}
                </div>
                <div className={styles.fg} style={{ marginTop:24 }}>
                  <label className={styles.label}>Academic Intake *</label>
                  <select className={styles.input} value={form.intake} onChange={set("intake")}>
                    <option>2024/2025</option><option>2025/2026</option>
                  </select>
                </div>
              </motion.div>
            )}

            {/* Step 3: Documents */}
            {step === 3 && (
              <motion.div initial={{ opacity:0,x:20 }} animate={{ opacity:1,x:0 }}>
                <h3 className={styles.stepTitle}>Upload Documents</h3>
                <p className={styles.uploadNote}>Upload clear scanned copies or photos. Supported: PDF, JPG, PNG (max 5MB each)</p>
                <div className={styles.uploadGrid}>
                  {[
                    { key:"kcse_cert", label:"KCSE Certificate / Result Slip *" },
                    { key:"id_copy", label:"National ID / Birth Certificate *" },
                    { key:"photo", label:"Passport Photo *" },
                  ].map(({ key, label }) => (
                    <div key={key} className={styles.uploadArea}>
                      <label className={styles.uploadLabel} htmlFor={key}>
                        <FiUpload className={styles.uploadIcon} />
                        <span className={styles.uploadTitle}>{label}</span>
                        <span className={styles.uploadSub}>{form[key] ? form[key].name : "Click to browse or drag & drop"}</span>
                        <input id={key} type="file" accept=".pdf,.jpg,.jpeg,.png" className={styles.fileInput} onChange={setFile(key)} />
                      </label>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 4: Review */}
            {step === 4 && (
              <motion.div initial={{ opacity:0,x:20 }} animate={{ opacity:1,x:0 }}>
                <h3 className={styles.stepTitle}>Review & Submit</h3>
                <div className={styles.reviewGrid}>
                  <div className={styles.reviewSection}>
                    <h4 className={styles.reviewHead}>Personal Information</h4>
                    <div className={styles.reviewItems}>
                      {[["Full Name",`${form.first_name} ${form.last_name}`],["Email",form.email],["Phone",form.phone],["County",form.county]].map(([k,v]) => (
                        <div key={k} className={styles.reviewItem}><span className={styles.reviewKey}>{k}</span><span className={styles.reviewVal}>{v || "—"}</span></div>
                      ))}
                    </div>
                  </div>
                  <div className={styles.reviewSection}>
                    <h4 className={styles.reviewHead}>Academic & Program</h4>
                    <div className={styles.reviewItems}>
                      {[["KCSE Grade",form.kcse_grade],["KCSE Year",form.kcse_year],["Program",form.program],["Intake",form.intake]].map(([k,v]) => (
                        <div key={k} className={styles.reviewItem}><span className={styles.reviewKey}>{k}</span><span className={styles.reviewVal}>{v || "—"}</span></div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className={styles.declaration}>
                  <FiCheckCircle className={styles.declIcon} />
                  <p>I hereby declare that all information provided is true, complete, and accurate. I understand that false information may lead to disqualification.</p>
                </div>
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <div className={styles.navBtns}>
              {step > 0 && <button className="btn-secondary" onClick={prev}>← Previous</button>}
              {step < 4 ? (
                <button className="btn-primary" onClick={next} style={{ marginLeft:"auto" }}>Next Step →</button>
              ) : (
                <button className="btn-primary" onClick={handleSubmit} disabled={loading} style={{ marginLeft:"auto" }}>
                  {loading ? "Submitting..." : <>Submit Application <FiArrowRight /></>}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
