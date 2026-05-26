"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from "react-icons/fi";
import { HiAcademicCap } from "react-icons/hi";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
import styles from "./page.module.css";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await login(form);
      toast.success(`Welcome back, ${user.first_name || user.email}!`);
      router.push(user.role === "admin" ? "/dashboard/admin" : "/dashboard/student");
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      {/* Left Panel */}
      <div className={styles.leftPanel}>
        <div className={styles.leftBg}>
          <img src="/images/campus/campus1.jpg" alt="Campus" className={styles.leftBgImg} />
          <div className={styles.leftOverlay} />
        </div>
        <div className={styles.leftContent}>
          <Link href="/" className={styles.logoRow}>
            <div className={styles.logoWrap}>
              <Image src="/logo.png" alt="Logo" width={70} height={70} />
            </div>
            <div>
              <p className={styles.logoName}>St John's</p>
              <p className={styles.logoSub}>Teachers Training College</p>
            </div>
          </Link>
          <div className={styles.leftBody}>
            <HiAcademicCap className={styles.leftIcon} />
            <h2 className={styles.leftTitle}>Welcome Back to St John's</h2>
            <p className={styles.leftText}>
              Log in to access your dashboard, track your application, view results, and stay connected with college life.
            </p>
            <div className={styles.leftFeatures}>
              {["Track your application status", "View your academic records", "Access learning resources", "Stay updated on college news"].map((f, i) => (
                <div key={i} className={styles.leftFeature}>
                  <span className={styles.leftDot} />
                  {f}
                </div>
              ))}
            </div>
          </div>
          <p className={styles.leftMotto}>"Inspiring teachers, Empowering minds"</p>
        </div>
      </div>

      {/* Right Panel */}
      <div className={styles.rightPanel}>
        <motion.div
          className={styles.formCard}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.formHeader}>
            <h1 className={styles.formTitle}>Sign In</h1>
            <p className={styles.formSub}>Enter your credentials to continue</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Email Address</label>
              <div className={styles.inputWrap}>
                <FiMail className={styles.inputIcon} />
                <input
                  type="email"
                  className={styles.input}
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <div className={styles.labelRow}>
                <label className={styles.label}>Password</label>
                <Link href="/forgot-password" className={styles.forgotLink}>Forgot password?</Link>
              </div>
              <div className={styles.inputWrap}>
                <FiLock className={styles.inputIcon} />
                <input
                  type={showPassword ? "text" : "password"}
                  className={styles.input}
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  required
                  autoComplete="current-password"
                />
                <button type="button" className={styles.eyeBtn} onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? <span className={styles.spinner} /> : null}
              {loading ? "Signing in..." : <>Sign In <FiArrowRight /></>}
            </button>
          </form>

          <div className={styles.divider}><span>or</span></div>

          <div className={styles.demoAccounts}>
            <p className={styles.demoTitle}>Demo Accounts</p>
            <div className={styles.demoRow}>
              <button className={styles.demoBtn} onClick={() => setForm({ email:"admin@stjohnstc.ac.ke", password:"admin123" })}>
                Admin Login
              </button>
              <button className={styles.demoBtn} onClick={() => setForm({ email:"student@stjohnstc.ac.ke", password:"student123" })}>
                Student Login
              </button>
            </div>
          </div>

          <p className={styles.signupText}>
            New student?{" "}
            <Link href="/register" className={styles.signupLink}>Create an account</Link>
          </p>
          <p className={styles.backHome}>
            <Link href="/" className={styles.backHomeLink}>← Back to Homepage</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
