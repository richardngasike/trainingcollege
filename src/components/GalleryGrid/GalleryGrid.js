"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import styles from "./GalleryGrid.module.css";

export default function GalleryGrid({ images = [] }) {
  const [selected, setSelected] = useState(null);

  const prev = () => {
    const idx = images.findIndex(i => i.id === selected.id);
    setSelected(images[(idx - 1 + images.length) % images.length]);
  };
  const next = () => {
    const idx = images.findIndex(i => i.id === selected.id);
    setSelected(images[(idx + 1) % images.length]);
  };

  return (
    <>
      <div className={styles.grid}>
        {images.map((img, i) => (
          <motion.div
            key={img.id}
            className={styles.item}
            initial={{ opacity:0, scale:0.95 }}
            whileInView={{ opacity:1, scale:1 }}
            viewport={{ once:true }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
            onClick={() => setSelected(img)}
          >
            <img src={img.src || img.image_url} alt={img.title} className={styles.img} />
            <div className={styles.overlay}>
              <p className={styles.title}>{img.title}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div className={styles.lightbox}
            initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            onClick={() => setSelected(null)}>
            <motion.div className={styles.lightboxInner}
              initial={{ scale:0.9 }} animate={{ scale:1 }} exit={{ scale:0.9 }}
              onClick={e => e.stopPropagation()}>
              <button className={styles.closeBtn} onClick={() => setSelected(null)}><FiX /></button>
              <button className={styles.prevBtn} onClick={prev}><FiChevronLeft /></button>
              <img src={selected.src || selected.image_url} alt={selected.title} className={styles.lightboxImg} />
              <button className={styles.nextBtn} onClick={next}><FiChevronRight /></button>
              <p className={styles.lightboxCaption}>{selected.title}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
