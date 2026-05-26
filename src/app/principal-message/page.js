"use client";
import PageBanner from "@/components/PageBanner/PageBanner";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import Link from "next/link";

export default function PrincipalMessagePage() {
  return (
    <div>
      <PageBanner title="Principal's Message" subtitle="A word from our College Principal" image="/images/campus/about-banner.jpg" breadcrumbs={[{label:"About",href:"/about"},{label:"Principal's Message"}]} />
      <section className="section-padding">
        <div className="container" style={{maxWidth:960}}>
          <motion.div style={{display:"grid",gridTemplateColumns:"300px 1fr",gap:60,alignItems:"start"}}
            initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.7}}>
            <div style={{textAlign:"center"}}>
              <div style={{borderRadius:20,overflow:"hidden",boxShadow:"var(--shadow-xl)",marginBottom:20}}>
                <img src="/images/staff/principal.jpg" alt="Principal" style={{width:"100%",height:360,objectFit:"cover"}} />
              </div>
              <h3 style={{fontFamily:"var(--font-display)",fontSize:"1.2rem",fontWeight:700,color:"var(--blue-deep)"}}>Prof. John Mwangi</h3>
              <p style={{color:"var(--gray-500)",fontSize:"0.9rem",marginTop:4,fontFamily:"var(--font-heading)"}}>Principal, St John's Teachers Training College</p>
            </div>
            <div>
              <span className="section-label">From the Principal's Desk</span>
              <h2 className="section-title" style={{marginTop:8,marginBottom:24}}>Welcome to St John's</h2>
              {[
                "It is with great joy and pride that I welcome you to St John's Teachers Training College — an institution built on the pillars of faith, academic excellence, and a burning passion for the teaching profession.",
                "Since our founding in 1985, we have remained steadfast in our commitment to producing teachers who are not just competent in their subject areas, but who are caring, creative, and community-minded. We believe that teaching is more than a career — it is a calling, and it is a calling we prepare our students to answer with confidence and conviction.",
                "Our programs are designed to meet the highest standards set by the Ministry of Education and the Kenya National Examinations Council. Our experienced faculty, modern facilities, and strong culture of academic support ensure that every student who walks through our doors emerges fully equipped for the challenges and joys of classroom teaching.",
                "As Principal, I am committed to maintaining an environment where every student feels valued, challenged, and inspired. We are not merely training teachers — we are shaping the future of Kenya's education, one graduate at a time.",
                "I invite you to explore everything that St John's has to offer. Whether you are a prospective student, a parent, or a stakeholder, I am confident that you will find here an institution worthy of your trust and investment.",
                "May God bless you as you pursue your calling.",
              ].map((p,i) => (
                <p key={i} style={{color:"var(--gray-600)",lineHeight:1.85,marginBottom:18,fontSize:"0.97rem"}}>{p}</p>
              ))}
              <p style={{fontFamily:"var(--font-display)",fontStyle:"italic",fontSize:"1.1rem",color:"var(--blue-deep)",marginTop:24,marginBottom:24}}>— Prof. John Mwangi, Principal</p>
              <Link href="/apply" className="btn-primary">Apply Now <FiArrowRight /></Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
