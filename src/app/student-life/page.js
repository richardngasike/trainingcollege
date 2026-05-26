"use client";
import PageBanner from "@/components/PageBanner/PageBanner";
import { motion } from "framer-motion";
import { HiUsers, HiMusicNote, HiHeart, HiGlobe, HiBadgeCheck } from "react-icons/hi";
import { FiArrowRight } from "react-icons/fi";
import Link from "next/link";

const activities = [
  { icon:HiUsers, title:"Student Council", desc:"Elected student leaders who represent the student body and organize campus activities." },
  { icon:HiMusicNote, title:"Choir & Drama", desc:"A vibrant choir and drama club perform at campus events and compete nationally." },
  { icon:HiHeart, title:"Christian Union", desc:"A faith community for fellowship, worship, Bible study, and community service." },
  { icon:HiGlobe, title:"Environmental Club", desc:"Students leading sustainability initiatives and tree-planting on campus and beyond." },
  { icon:HiBadgeCheck, title:"Sports Teams", desc:"Competitive teams in football, volleyball, netball, athletics, and basketball." },
  { icon:HiUsers, title:"Academic Societies", desc:"Subject-specific clubs that deepen knowledge through debates, seminars, and projects." },
];

export default function StudentLifePage() {
  return (
    <div>
      <PageBanner title="Student Life" subtitle="Vibrant campus life beyond the classroom" image="/images/campus/campus1.jpg" breadcrumbs={[{label:"Student Life"}]} />
      <section className="section-padding">
        <div className="container">
          <div className="text-center" style={{marginBottom:48}}>
            <span className="section-label">Life at St John's</span>
            <h2 className="section-title">More Than Just Academics</h2>
            <p className="section-subtitle">Our campus buzzes with activity. From faith-based groups to sports and arts, there is a place for every student to grow beyond the classroom.</p>
          </div>

          {/* Banner Image Split */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:40,alignItems:"center",marginBottom:80}}>
            <motion.div initial={{opacity:0,x:-30}} whileInView={{opacity:1,x:0}} viewport={{once:true}}>
              <img src="/images/campus/campus2.jpg" alt="Student Life" style={{width:"100%",height:360,objectFit:"cover",borderRadius:20,boxShadow:"var(--shadow-xl)"}} />
            </motion.div>
            <motion.div initial={{opacity:0,x:30}} whileInView={{opacity:1,x:0}} viewport={{once:true}}>
              <span className="section-label">Our Community</span>
              <h2 className="section-title" style={{marginTop:8,marginBottom:16}}>A Family, Not Just a College</h2>
              <p style={{color:"var(--gray-600)",lineHeight:1.8,marginBottom:16}}>At St John's, we believe education shapes the whole person — mind, heart, and spirit. Our campus is a warm, faith-centered community where students are encouraged to explore their talents, serve others, and grow in character.</p>
              <p style={{color:"var(--gray-600)",lineHeight:1.8,marginBottom:24}}>Affordable hostels, a modern dining hall, sports fields, and student lounges make campus life comfortable and enjoyable for all our students.</p>
              <Link href="/apply" className="btn-primary">Join Our Community <FiArrowRight /></Link>
            </motion.div>
          </div>

          {/* Activities Grid */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:24}}>
            {activities.map((a,i) => (
              <motion.div key={i} style={{background:"var(--white)",border:"1px solid var(--gray-100)",borderRadius:20,padding:28,boxShadow:"var(--shadow-sm)",transition:"var(--transition)"}}
                initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.1}}
                whileHover={{y:-6}}>
                <div style={{width:56,height:56,borderRadius:14,background:"var(--blue-pale)",color:"var(--blue-dark)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.7rem",marginBottom:18}}>
                  <a.icon />
                </div>
                <h3 style={{fontFamily:"var(--font-display)",fontSize:"1.05rem",fontWeight:700,color:"var(--blue-deep)",marginBottom:10}}>{a.title}</h3>
                <p style={{fontSize:"0.88rem",color:"var(--gray-500)",lineHeight:1.65}}>{a.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
