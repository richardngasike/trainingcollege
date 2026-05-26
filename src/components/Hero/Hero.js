"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { FiArrowRight, FiPlay, FiChevronDown } from "react-icons/fi";
import { HiAcademicCap } from "react-icons/hi";
import "swiper/css";
import "swiper/css/effect-fade";
import styles from "./Hero.module.css";


const slides = [
  {
    image: "/images/hero/hero0.png",
    title: "Inspiring",
    titleAccent: "Teachers",
    titleEnd: "for Tomorrow",
    subtitle: "Nurturing passionate, skilled educators who transform communities and shape the future of Kenya's learners.",
    cta: "Apply for Admission",
    ctaHref: "/apply",
    secondary: "Explore Courses",
    secondaryHref: "/courses",
  },
  {
    image: "/images/hero/hero2.jpeg",
    title: "Empowering",
    titleAccent: "Minds",
    titleEnd: "With Knowledge",
    subtitle: "A cutting-edge curriculum, dedicated faculty, and a vibrant campus life designed for your academic success.",
    cta: "Start Your Journey",
    ctaHref: "/apply",
    secondary: "Meet Our Staff",
    secondaryHref: "/staff",
  },
  {
    image: "/images/hero/hero1.jpeg",
    title: "Building",
    titleAccent: "Leaders",
    titleEnd: "in Classrooms",
    subtitle: "Join thousands of alumni who are making a difference in schools across Kenya and beyond.",
    cta: "Our Programs",
    ctaHref: "/courses",
    secondary: "About Us",
    secondaryHref: "/about",
  },
];

const stats = [
  { value: "10+", label: "Years of Excellence" },
  { value: "200+", label: "Graduates" },
  { value: "98%", label: "Employment Rate" },
  { value: "10+", label: "Programs Offered" },
];

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [textKey, setTextKey] = useState(0);

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.realIndex);
    setTextKey((k) => k + 1);
  };

  const scrollDown = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  const activeSlide = slides[activeIndex];

  return (
    <section className={styles.hero}>
      {/* Background Swiper */}
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        autoplay={{ delay: 5500, disableOnInteraction: false }}
        loop
        speed={1200}
        onSlideChange={handleSlideChange}
        className={styles.bgSwiper}
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div className={styles.slideImg}>
              <img src={slide.image} alt={slide.title} className={styles.bgImg} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Overlay */}
      <div className={styles.overlay} />
      <div className={styles.overlayGradient} />

      {/* Content */}
      <div className={`${styles.content} container`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={textKey}
            className={styles.textBlock}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className={styles.tag}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
            </motion.div>

            <motion.h1
              className={styles.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {activeSlide.title}{" "}
              <span className={styles.titleAccent}>{activeSlide.titleAccent}</span>
              <br />
              {activeSlide.titleEnd}
            </motion.h1>

            <motion.p
              className={styles.subtitle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
            >
              {activeSlide.subtitle}
            </motion.p>

            <motion.div
              className={styles.actions}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Link href={activeSlide.ctaHref} className={styles.primaryBtn}>
                {activeSlide.cta}
                <FiArrowRight />
              </Link>
              <Link href={activeSlide.secondaryHref} className={styles.secondaryBtn}>
                {activeSlide.secondary}
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Stats Bar */}
        <motion.div
          className={styles.statsBar}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          {stats.map((stat, i) => (
            <div key={i} className={styles.statItem}>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
              {i < stats.length - 1 && <div className={styles.statDivider} />}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Slide Indicators */}
      <div className={styles.indicators}>
        {slides.map((_, i) => (
          <div
            key={i}
            className={`${styles.indicator} ${i === activeIndex ? styles.indicatorActive : ""}`}
          />
        ))}
      </div>

      {/* Scroll Down */}
      <button className={styles.scrollDown} onClick={scrollDown} aria-label="Scroll down">
        <FiChevronDown />
      </button>
    </section>
  );
}
