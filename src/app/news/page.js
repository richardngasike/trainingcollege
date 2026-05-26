"use client";
import { useState } from "react";
import PageBanner from "@/components/PageBanner/PageBanner";
import NewsCard from "@/components/NewsCard/NewsCard";
import { motion } from "framer-motion";
import styles from "./page.module.css";

const allNews = [
  { id:1, title:"2024/2025 Admission Applications Now Open", summary:"St John's Teachers Training College is pleased to announce that applications for the 2024/2025 academic year are now open. Apply early to secure your place.", image:"/images/news/admissions.jpg", date:"May 1, 2024", category:"Admissions", slug:"admissions-2024" },
  { id:2, title:"Annual Education Conference Scheduled for June", summary:"The annual conference brings together educators, policymakers, and experts to discuss the future of teacher training in Kenya.", image:"/images/news/conference.jpg", date:"April 18, 2024", category:"Events", slug:"conference-june" },
  { id:3, title:"Students Excel in National Teaching Practice", summary:"Third-year students recorded a 96% pass rate in the national teaching practice assessment, continuing our tradition of excellence.", image:"/images/news/students.jpg", date:"March 28, 2024", category:"News", slug:"students-excel" },
  { id:4, title:"New ICT Laboratory Officially Commissioned", summary:"The state-of-the-art ICT laboratory was officially opened this week, giving students access to modern computing resources for their studies.", image:"/images/campus/campus1.jpg", date:"March 10, 2024", category:"News", slug:"ict-lab-opening" },
  { id:5, title:"Sports Day 2024 Recap", summary:"This year's annual sports day was a resounding success with over 800 students participating in various track, field, and team sport competitions.", image:"/images/gallery/g6.jpg", date:"February 28, 2024", category:"Events", slug:"sports-day-2024" },
  { id:6, title:"St John's Partners with KIE on Curriculum Research", summary:"A new partnership with Kenya Institute of Education will see St John's faculty participating in national curriculum development research.", image:"/images/campus/campus2.jpg", date:"February 10, 2024", category:"News", slug:"kie-partnership" },
];

const cats = ["All","News","Events","Admissions"];

export default function NewsPage() {
  const [active, setActive] = useState("All");
  const filtered = active==="All" ? allNews : allNews.filter(n => n.category===active);

  return (
    <div>
      <PageBanner title="News & Events" subtitle="Stay updated with the latest from St John's" image="/images/news/admissions.jpg" breadcrumbs={[{label:"News & Events"}]} />
      <section className="section-padding">
        <div className="container">
          <div className={styles.filters}>
            {cats.map(c => (
              <button key={c} onClick={() => setActive(c)} className={`${styles.filterBtn} ${active===c ? styles.filterActive : ""}`}>{c}</button>
            ))}
          </div>
          <div className={styles.grid}>
            {filtered.map((item, i) => <NewsCard key={item.id} item={item} index={i} />)}
          </div>
        </div>
      </section>
    </div>
  );
}
