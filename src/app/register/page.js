"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiLock, FiPhone, FiEye, FiEyeOff, FiArrowRight } from "react-icons/fi";
import { authAPI } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
import styles from "./page.module.css";

export default function RegisterPage() {
  const [form, setForm] = useState({ first_name:"", last_name:"", email:"", phone:"", password:"", password2:"" });
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.password2) { toast.error("Passwords do not match."); return; }
    if (form.password.length < 8) { toast.error("Password must be at least 8 characters."); return; }
    setLoading(true);
    try {
      await authAPI.register(form);
      const user = await login({ email: form.email, password: form.password });
      toast.success("Account created successfully! Welcome to St John's.");
      router.push("/dashboard/student");
    } catch (err) {
      const data = err?.response?.data;
      const msg = data?.email?.[0] || data?.detail || "Registration failed. Please try again.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  return (
    <div className={styles.page}>
      <div className={styles.leftPanel}>
        <div className={styles.leftBg}>
          <img src="/images/campus/students.jpg" alt="Students" className={styles.leftBgImg} />
          <div className={styles.leftOverlay} />
        </div>
        <div className={styles.leftContent}>
          <Link href="/" className={styles.logoRow}>
            <div className={styles.logoWrap}><Image src="/logo.png" alt="Logo" width={64} height={64} /></div>
            <div>
              <p className={styles.logoName}>St John's</p>
              <p className={styles.logoSub}>Teachers Training College</p>
            </div>
          </Link>
          <div className={styles.leftBody}>
            <h2 className={styles.leftTitle}>Begin Your Teaching Journey</h2>
            <p className={styles.leftText}>Create your student account to track your application, access resources, and join our growing community of educators.</p>
            <div className={styles.steps}>
              {["Create your account", "Submit application documents", "Receive admission decision", "Start your studies"].map((s,i) => (
                <div key={i} className={styles.step}>
                  <div className={styles.stepNum}>{i+1}</div>
                  <span>{s}</span>
                </div>
              ))}
            </div>
          </div>
          <p className={styles.leftMotto}>"Inspiring teachers, Empowering minds"</p>
        </div>
      </div>

      <div className={styles.rightPanel}>
        <motion.div className={styles.formCard} initial={{ opacity:0, y:32 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }}>
          <div className={styles.formHeader}>
            <h1 className={styles.formTitle}>Create Account</h1>
            <p className={styles.formSub}>Join thousands of educators trained at St John's</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.row2}>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>First Name</label>
                <div className={styles.inputWrap}><FiUser className={styles.inputIcon} />
                  <input className={styles.input} type="text" placeholder="First name" value={form.first_name} onChange={set("first_name")} required />
                </div>
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Last Name</label>
                <div className={styles.inputWrap}><FiUser className={styles.inputIcon} />
                  <input className={styles.input} type="text" placeholder="Last name" value={form.last_name} onChange={set("last_name")} required />
                </div>
              </div>
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Email Address</label>
              <div className={styles.inputWrap}><FiMail className={styles.inputIcon} />
                <input className={styles.input} type="email" placeholder="your@email.com" value={form.email} onChange={set("email")} required />
              </div>
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Phone Number</label>
              <div className={styles.inputWrap}><FiPhone className={styles.inputIcon} />
                <input className={styles.input} type="tel" placeholder="+254 712 345 678" value={form.phone} onChange={set("phone")} />
              </div>
            </div>
            <div className={styles.row2}>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Password</label>
                <div className={styles.inputWrap}><FiLock className={styles.inputIcon} />
                  <input className={styles.input} type={showPwd ? "text" : "password"} placeholder="Min. 8 characters" value={form.password} onChange={set("password")} required />
                  <button type="button" className={styles.eyeBtn} onClick={() => setShowPwd(!showPwd)}>
                    {showPwd ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Confirm Password</label>
                <div className={styles.inputWrap}><FiLock className={styles.inputIcon} />
                  <input className={styles.input} type={showPwd ? "text" : "password"} placeholder="Repeat password" value={form.password2} onChange={set("password2")} required />
                </div>
              </div>
            </div>
            <p className={styles.terms}>
              By registering, you agree to our{" "}
              <Link href="/faq" className={styles.termsLink}>Terms of Service</Link> and{" "}
              <Link href="/faq" className={styles.termsLink}>Privacy Policy</Link>.
            </p>
            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? <span className={styles.spinner} /> : null}
              {loading ? "Creating Account..." : <>Create Account <FiArrowRight /></>}
            </button>
          </form>

          <p className={styles.loginText}>
            Already have an account?{" "}
            <Link href="/login" className={styles.loginLink}>Sign in here</Link>
          </p>
          <p className={styles.backHome}><Link href="/" className={styles.backHomeLink}>← Back to Homepage</Link></p>
        </motion.div>
      </div>
    </div>
  );
}
