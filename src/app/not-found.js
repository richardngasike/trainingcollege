"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

export default function NotFound() {
  return (
    <div style={{
      minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center",
      background:"var(--blue-mist)", padding:"24px", textAlign:"center"
    }}>
      <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}}>
        <p style={{fontFamily:"var(--font-display)",fontSize:"8rem",fontWeight:800,color:"var(--blue-pale)",lineHeight:1}}>404</p>
        <h1 style={{fontFamily:"var(--font-display)",fontSize:"2rem",fontWeight:700,color:"var(--blue-deep)",margin:"16px 0 12px"}}>Page Not Found</h1>
        <p style={{color:"var(--gray-500)",marginBottom:32,maxWidth:420,margin:"0 auto 32px"}}>
          The page you are looking for does not exist or has been moved.
        </p>
        <Link href="/" className="btn-primary">Back to Homepage <FiArrowRight /></Link>
      </motion.div>
    </div>
  );
}
