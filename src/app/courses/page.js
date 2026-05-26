"use client";
import { useState } from "react";
import PageBanner from "@/components/PageBanner/PageBanner";
import CourseCard from "@/components/CourseCard/CourseCard";
import { motion } from "framer-motion";
import styles from "./page.module.css";

const courses = [
  { id:1, title:"Primary Teacher Education (P1)", duration:"2 Years", description:"Train to become a qualified primary school teacher. Covers curriculum development, pedagogy, and teaching practice.", image:"/images/courses/p1.jpg", category:"Primary Teaching", level:"Certificate" },
  { id:2, title:"Early Childhood Development Education (ECDE)", duration:"2 Years", description:"Specialize in early childhood education for children from birth through age 8.", image:"/images/courses/ecde.jpg", category:"Early Childhood", level:"Certificate" },
  { id:3, title:"Special Needs Education (SNE)", duration:"2 Years", description:"Gain skills to support and educate learners with disabilities in inclusive classrooms.", image:"/images/courses/sne.jpg", category:"Special Needs", level:"Certificate" },
  { id:4, title:"Certificate in Education Management", duration:"1 Year", description:"Develop leadership skills for managing educational institutions effectively.", image:"/images/courses/management.jpg", category:"Management", level:"Certificate" },
  { id:5, title:"Pre-Primary Teacher Training", duration:"1 Year", description:"Short course for nursery and pre-primary school teachers.", image:"/images/courses/preprimary.jpg", category:"Pre-Primary", level:"Certificate" },
  { id:6, title:"Art & Craft in Education", duration:"1 Year", description:"Integrate visual arts and craft into the primary school curriculum.", image:"/images/courses/art.jpg", category:"Arts", level:"Certificate" },
];

const categories = ["All", "Primary Teaching", "Early Childhood", "Special Needs", "Management", "Pre-Primary", "Arts"];

export default function CoursesPage() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? courses : courses.filter(c => c.category === active);

  return (
    <div>
      <PageBanner title="Courses Offered" subtitle="Ministry of Education accredited teacher training programs" image="/images/campus/academics.jpg" breadcrumbs={[{ label:"Courses" }]} />
      <section className="section-padding">
        <div className="container">
          <div className="text-center" style={{ marginBottom: 48 }}>
            <span className="section-label">Academic Programs</span>
            <h2 className="section-title">Choose Your Teaching Path</h2>
            <p className="section-subtitle">All programs accredited by KNEC and recognized by TSC for employment eligibility.</p>
          </div>
          <div className={styles.filters}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setActive(cat)} className={`${styles.filterBtn} ${active === cat ? styles.filterActive : ""}`}>
                {cat}
              </button>
            ))}
          </div>
          <div className={styles.grid}>
            {filtered.map((course, i) => <CourseCard key={course.id} course={course} index={i} />)}
          </div>
        </div>
      </section>
    </div>
  );
}
