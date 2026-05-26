"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiMail, FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { authAPI } from "@/lib/api";
import toast from "react-hot-toast";
import styles from "./page.module.css";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authAPI.forgotPassword(email);
      setSent(true);
      toast.success("Password reset email sent!");
    } catch {
      toast.error("Email not found. Please check and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <motion.div className={styles.card} initial={{ opacity:0, y:32 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }}>
        <Link href="/" className={styles.logo}>
          <div className={styles.logoImg}><Image src="/logo.png" alt="Logo" width={64} height={64} /></div>
          <div><p className={styles.logoName}>St John's</p><p className={styles.logoSub}>Teachers Training College</p></div>
        </Link>

        {!sent ? (
          <>
            <h1 className={styles.title}>Forgot Password?</h1>
            <p className={styles.subtitle}>Enter your registered email address and we will send you a link to reset your password.</p>
            <form onSubmit={handleSubmit} className={styles.form}>
              <label className={styles.label}>Email Address</label>
              <div className={styles.inputWrap}>
                <FiMail className={styles.inputIcon} />
                <input type="email" className={styles.input} placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
              <button type="submit" className={styles.btn} disabled={loading}>
                {loading ? "Sending..." : <>Send Reset Link <FiArrowRight /></>}
              </button>
            </form>
          </>
        ) : (
          <div className={styles.successState}>
            <div className={styles.successIcon}><FiMail /></div>
            <h2 className={styles.title}>Check Your Email</h2>
            <p className={styles.subtitle}>We have sent a password reset link to <strong>{email}</strong>. Check your inbox and follow the instructions.</p>
          </div>
        )}

        <Link href="/login" className={styles.backLink}><FiArrowLeft /> Back to Login</Link>
      </motion.div>
    </div>
  );
}
