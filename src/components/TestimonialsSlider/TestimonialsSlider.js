"use client";
import { useRef } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { FiStar } from "react-icons/fi";
import { MdFormatQuote } from "react-icons/md";
import "swiper/css";
import "swiper/css/pagination";
import styles from "./TestimonialsSlider.module.css";

const testimonials = [
  {
    name: "Mary Wanjiku",
    role: "P1 Graduate, 2021 | Currently teaching at Nairobi Primary",
    image: "/images/students/st1.jpg",
    rating: 5,
    text: "St John's gave me not just a certificate but a calling. The teaching practice placements were exceptional, and the lecturers were incredibly supportive throughout my studies.",
  },
  {
    name: "James Otieno",
    role: "ECE Graduate, 2022 | Early Childhood Educator",
    image: "/images/students/st2.jpg",
    rating: 5,
    text: "The practical-focused curriculum at St John's prepared me for real classroom challenges. Within three months of graduating, I had secured employment. Best decision I ever made.",
  },
  {
    name: "Grace Muthoni",
    role: "SNE Graduate, 2020 | Special Needs Educator",
    image: "/images/students/st3.jpg",
    rating: 5,
    text: "I chose St John's for its Special Needs Education program and was never disappointed. The facilities, expert faculty, and inclusive learning environment made all the difference.",
  },
  {
    name: "Peter Kamau",
    role: "P1 Graduate, 2023 | Kiambu County Schools",
    image: "/images/students/st4.jpg",
    rating: 5,
    text: "The mentorship here is unrivalled. Every lecturer is dedicated to your success. The campus life is vibrant, and the Christian values embedded in the institution shaped my character.",
  },
];

export default function TestimonialsSlider() {
  return (
    <section className={styles.section}>
      <div className={styles.bg} />
      <div className={`${styles.inner} container`}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Testimonials</span>
          <h2 className={styles.title}>What Our Graduates Say</h2>
          <p className={styles.subtitle}>Hear from the educators we have trained across Kenya</p>
        </motion.div>

        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          slidesPerView={1}
          spaceBetween={32}
          loop
          breakpoints={{
            768: { slidesPerView: 2 },
            1100: { slidesPerView: 3 },
          }}
          className={styles.swiper}
        >
          {testimonials.map((t, i) => (
            <SwiperSlide key={i}>
              <div className={styles.card}>
                <div className={styles.quoteIcon}>
                  <MdFormatQuote />
                </div>
                <div className={styles.stars}>
                  {[...Array(t.rating)].map((_, j) => (
                    <FiStar key={j} className={styles.star} />
                  ))}
                </div>
                <p className={styles.text}>{t.text}</p>
                <div className={styles.author}>
                  <div className={styles.avatarWrap}>
                    <img src={t.image} alt={t.name} className={styles.avatar} />
                  </div>
                  <div>
                    <p className={styles.name}>{t.name}</p>
                    <p className={styles.role}>{t.role}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
