"use client";
import { useState } from "react";
import PageBanner from "@/components/PageBanner/PageBanner";
import { motion } from "framer-motion";
import styles from "./page.module.css";

const categories = ["All", "Campus", "Students", "Events", "Graduation", "Sports", "Facilities"];
const images = [
  { id:1, src:"/images/gallery/g1.jpg", cat:"Campus", title:"Main Campus Building" },
  { id:2, src:"/images/gallery/g2.jpg", cat:"Students", title:"Students in Class" },
  { id:3, src:"/images/gallery/g3.jpg", cat:"Graduation", title:"2023 Graduation Ceremony" },
  { id:4, src:"/images/gallery/g4.jpg", cat:"Events", title:"Education Conference" },
  { id:5, src:"/images/gallery/g5.jpg", cat:"Facilities", title:"Computer Lab" },
  { id:6, src:"/images/gallery/g6.jpg", cat:"Sports", title:"Sports Day Activities" },
  { id:7, src:"/images/gallery/g7.jpg", cat:"Campus", title:"Library" },
  { id:8, src:"/images/gallery/g8.jpg", cat:"Students", title:"Teaching Practice" },
  { id:9, src:"/images/gallery/g9.jpg", cat:"Events", title:"Cultural Day" },
  { id:10, src:"/images/gallery/g10.jpg", cat:"Graduation", title:"Award Ceremony" },
  { id:11, src:"/images/gallery/g11.jpg", cat:"Campus", title:"College Chapel" },
  { id:12, src:"/images/gallery/g12.jpg", cat:"Facilities", title:"Science Laboratory" },
];

export default function GalleryPage() {
  const [active, setActive] = useState("All");
  const [lightbox, setLightbox] = useState(null);
  const filtered = active === "All" ? images : images.filter(i => i.cat === active);

  return (
    <div>
      <PageBanner title="Photo Gallery" subtitle="Moments from our vibrant campus life" image="/images/campus/gallery-banner.jpg" breadcrumbs={[{ label:"Gallery" }]} />
      <section className="section-padding">
        <div className="container">
          <div className={styles.filters}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setActive(cat)} className={`${styles.filterBtn} ${active===cat ? styles.filterActive : ""}`}>
                {cat}
              </button>
            ))}
          </div>
          <div className={styles.masonry}>
            {filtered.map((img, i) => (
              <motion.div key={img.id} className={styles.masonryItem}
                initial={{ opacity:0, scale:0.95 }}
                animate={{ opacity:1, scale:1 }}
                transition={{ delay:i*0.05, duration:0.4 }}
                onClick={() => setLightbox(img)}
              >
                <img src={img.src} alt={img.title} className={styles.galleryImg} />
                <div className={styles.imgOverlay}>
                  <p className={styles.imgTitle}>{img.title}</p>
                  <span className={styles.imgCat}>{img.cat}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {lightbox && (
        <div className={styles.lightbox} onClick={() => setLightbox(null)}>
          <div className={styles.lightboxInner} onClick={e => e.stopPropagation()}>
            <button className={styles.lightboxClose} onClick={() => setLightbox(null)}>X</button>
            <img src={lightbox.src} alt={lightbox.title} className={styles.lightboxImg} />
            <p className={styles.lightboxCaption}>{lightbox.title}</p>
          </div>
        </div>
      )}
    </div>
  );
}
