"use client";
import PageBanner from "@/components/PageBanner/PageBanner";
import { motion } from "framer-motion";
import { FiMail, FiPhone } from "react-icons/fi";
import styles from "./page.module.css";

const staff = [
  { name:"Prof. John Mwangi", title:"Principal", dept:"Administration", email:"principal@stjohnstc.ac.ke", phone:"+254 712 000 001", image:"/images/staff/principal.jpg", bio:"Over 25 years in teacher education. Ph.D. in Educational Leadership, University of Nairobi." },
  { name:"Dr. Agnes Kamau", title:"Deputy Principal – Academics", dept:"Administration", email:"dpa@stjohnstc.ac.ke", phone:"+254 712 000 002", image:"/images/staff/st1.jpg", bio:"Ph.D. in Curriculum Studies. Specialist in pedagogical innovation and teacher assessment." },
  { name:"Mr. David Ochieng", title:"Head of SNE Department", dept:"Special Needs Education", email:"sne@stjohnstc.ac.ke", phone:"+254 712 000 003", image:"/images/staff/st2.jpg", bio:"M.Ed in Special Needs Education. 15 years of experience in inclusive education practices." },
  { name:"Mrs. Grace Njoroge", title:"Head of ECDE Department", dept:"Early Childhood", email:"ecde@stjohnstc.ac.ke", phone:"+254 712 000 004", image:"/images/staff/st3.jpg", bio:"M.Ed in Early Childhood Development. Passionate about play-based learning and child psychology." },
  { name:"Mr. Samuel Kipchoge", title:"Head of P1 Department", dept:"Primary Education", email:"p1@stjohnstc.ac.ke", phone:"+254 712 000 005", image:"/images/staff/st4.jpg", bio:"B.Ed, M.Ed. Specialist in primary school curriculum, literacy, and numeracy development." },
  { name:"Ms. Faith Achieng", title:"Librarian", dept:"Library Services", email:"library@stjohnstc.ac.ke", phone:"+254 712 000 006", image:"/images/staff/st5.jpg", bio:"BLIS from Kenyatta University. Manages the college's digital and physical library resources." },
];

export default function StaffPage() {
  return (
    <div>
      <PageBanner title="Staff Directory" subtitle="Meet our dedicated team of educators and administrators" image="/images/campus/staff-banner.jpg" breadcrumbs={[{label:"Staff Directory"}]} />
      <section className="section-padding">
        <div className="container">
          <div className="text-center" style={{marginBottom:48}}>
            <span className="section-label">Our Team</span>
            <h2 className="section-title">Expert Faculty & Staff</h2>
            <p className="section-subtitle">Our dedicated team brings decades of academic excellence, passion, and Christian values to every interaction with our students.</p>
          </div>
          <div className={styles.grid}>
            {staff.map((s,i) => (
              <motion.div key={i} className={styles.card}
                initial={{opacity:0,y:28}} whileInView={{opacity:1,y:0}}
                viewport={{once:true}} transition={{delay:i*0.1,duration:0.5}}>
                <div className={styles.imgWrap}>
                  <img src={s.image} alt={s.name} className={styles.img} />
                  <div className={styles.imgOverlay}>
                    <div className={styles.contacts}>
                      <a href={`mailto:${s.email}`} className={styles.contactBtn}><FiMail /></a>
                      <a href={`tel:${s.phone}`} className={styles.contactBtn}><FiPhone /></a>
                    </div>
                  </div>
                </div>
                <div className={styles.body}>
                  <div className={styles.deptBadge}>{s.dept}</div>
                  <h3 className={styles.name}>{s.name}</h3>
                  <p className={styles.title}>{s.title}</p>
                  <p className={styles.bio}>{s.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
