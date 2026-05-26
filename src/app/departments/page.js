"use client";
import PageBanner from "@/components/PageBanner/PageBanner";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

const departments = [
  { name:"Department of Primary Education", shortName:"P1 Dept.", head:"Mr. Samuel Kipchoge", programs:["Primary Teacher Education (P1)"], image:"/images/courses/p1.jpg", desc:"The flagship department training Primary 1 teachers for Kenya's public and private schools. Accredited by KNEC since 1987." },
  { name:"Department of Early Childhood Development Education", shortName:"ECDE Dept.", head:"Mrs. Grace Njoroge", programs:["ECDE Certificate"], image:"/images/courses/ecde.jpg", desc:"Trains educators in child development theories, play-based learning, and early literacy for children aged 0-8 years." },
  { name:"Department of Special Needs Education", shortName:"SNE Dept.", head:"Mr. David Ochieng", programs:["SNE Certificate"], image:"/images/courses/sne.jpg", desc:"Produces educators skilled in inclusive education, communication methods, and support for learners with diverse needs." },
  { name:"Department of General Studies", shortName:"Gen. Studies", head:"Dr. Agnes Kamau", programs:["Common units across all programs"], image:"/images/campus/campus1.jpg", desc:"Provides foundational courses in communication, philosophy, mathematics, and research methods for all students." },
  { name:"ICT & Resource Center", shortName:"ICT Center", head:"Mr. Brian Mutua", programs:["ICT integration support"], image:"/images/gallery/g5.jpg", desc:"Modern computing labs supporting digital literacy, e-learning tools, and technology integration across all teaching programs." },
];

export default function DepartmentsPage() {
  return (
    <div>
      <PageBanner title="Departments" subtitle="Academic departments that drive our excellence" image="/images/campus/academics.jpg" breadcrumbs={[{label:"Departments"}]} />
      <section className="section-padding">
        <div className="container">
          <div className="text-center" style={{marginBottom:48}}>
            <span className="section-label">Academic Structure</span>
            <h2 className="section-title">Our Departments</h2>
            <p className="section-subtitle">Each department is led by experienced educators dedicated to delivering quality teacher training programs.</p>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:32}}>
            {departments.map((d,i) => (
              <motion.div key={i} style={{display:"grid",gridTemplateColumns: i%2===0 ? "1fr 1.6fr" : "1.6fr 1fr",gap:40,alignItems:"center",background:"var(--white)",borderRadius:24,overflow:"hidden",boxShadow:"var(--shadow-md)",border:"1px solid var(--gray-100)"}}
                initial={{opacity:0,y:28}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.08,duration:0.5}}>
                {i%2===0 ? (
                  <>
                    <div style={{height:280}}><img src={d.image} alt={d.name} style={{width:"100%",height:"100%",objectFit:"cover"}} /></div>
                    <div style={{padding:"32px 36px 32px 0"}}>
                      <span className="badge" style={{marginBottom:14}}>{d.shortName}</span>
                      <h3 style={{fontFamily:"var(--font-display)",fontSize:"1.2rem",fontWeight:700,color:"var(--blue-deep)",marginBottom:10}}>{d.name}</h3>
                      <p style={{fontSize:"0.88rem",color:"var(--gray-400)",fontFamily:"var(--font-heading)",marginBottom:12}}>Department Head: <strong style={{color:"var(--blue-dark)"}}>{d.head}</strong></p>
                      <p style={{fontSize:"0.93rem",color:"var(--gray-600)",lineHeight:1.75,marginBottom:20}}>{d.desc}</p>
                      <Link href="/courses" className="btn-secondary" style={{fontSize:"0.88rem",padding:"9px 20px"}}>View Programs <FiArrowRight /></Link>
                    </div>
                  </>
                ) : (
                  <>
                    <div style={{padding:"32px 0 32px 36px"}}>
                      <span className="badge" style={{marginBottom:14}}>{d.shortName}</span>
                      <h3 style={{fontFamily:"var(--font-display)",fontSize:"1.2rem",fontWeight:700,color:"var(--blue-deep)",marginBottom:10}}>{d.name}</h3>
                      <p style={{fontSize:"0.88rem",color:"var(--gray-400)",fontFamily:"var(--font-heading)",marginBottom:12}}>Department Head: <strong style={{color:"var(--blue-dark)"}}>{d.head}</strong></p>
                      <p style={{fontSize:"0.93rem",color:"var(--gray-600)",lineHeight:1.75,marginBottom:20}}>{d.desc}</p>
                      <Link href="/courses" className="btn-secondary" style={{fontSize:"0.88rem",padding:"9px 20px"}}>View Programs <FiArrowRight /></Link>
                    </div>
                    <div style={{height:280}}><img src={d.image} alt={d.name} style={{width:"100%",height:"100%",objectFit:"cover"}} /></div>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
