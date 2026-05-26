"use client";
import Hero from "@/components/Hero/Hero";
import StatsCounter from "@/components/StatsCounter/StatsCounter";
import TestimonialsSlider from "@/components/TestimonialsSlider/TestimonialsSlider";
import NewsCard from "@/components/NewsCard/NewsCard";
import CourseCard from "@/components/CourseCard/CourseCard";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  HiAcademicCap, HiBookOpen, HiUsers, HiLightBulb,
  HiStar, HiBriefcase, HiGlobe, HiHeart
} from "react-icons/hi";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";
import styles from "./page.module.css";

const features = [
  { icon: HiAcademicCap, title: "Accredited Programs", desc: "All our courses are accredited by the Kenya National Examinations Council and recognized by TSC." },
  { icon: HiBookOpen, title: "Expert Faculty", desc: "Learn from experienced educators and professionals who bring real classroom expertise." },
  { icon: HiUsers, title: "Vibrant Student Life", desc: "Join clubs, sports, worship, and community service activities on our lively campus." },
  { icon: HiLightBulb, title: "Modern Facilities", desc: "State-of-the-art labs, library, ICT center, and comfortable student residences." },
];

const whyUs = [
  "Ministry of Education accredited programs",
  "Over 38 years of teacher training excellence",
  "98% graduate employment rate",
  "Affordable tuition with HELB support",
  "Experienced and dedicated faculty",
  "Practical teaching practice placements",
  "Vibrant Christian campus culture",
  "Modern facilities and residences",
];

const courses = [
  {
    id: 1,
    title: "Primary Teacher Education (P1)",
    duration: "2 Years",
    description: "Train to become a qualified primary school teacher. Covers curriculum development, pedagogy, classroom management, and teaching practice.",
    image: "/images/courses/p1.jpg",
    category: "Teaching",
    level: "Certificate",
  },
  {
    id: 2,
    title: "Early Childhood Development Education (ECDE)",
    duration: "2 Years",
    description: "Specialize in early childhood education, learning how to nurture and educate children from birth through age 8.",
    image: "/images/courses/ecde.jpg",
    category: "Early Childhood",
    level: "Certificate",
  },
  {
    id: 3,
    title: "Special Needs Education (SNE)",
    duration: "2 Years",
    description: "Gain skills to support and educate learners with physical, intellectual, and learning disabilities in inclusive classrooms.",
    image: "/images/courses/sne.jpg",
    category: "Special Needs",
    level: "Certificate",
  },
];

const news = [
  {
    id: 1,
    title: "2024/2025 Admission Applications Now Open",
    summary: "St John's Teachers Training College is pleased to announce that applications for the 2024/2025 academic year are now open. Early applications are encouraged.",
    image: "/images/news/admissions.jpg",
    date: "May 1, 2024",
    category: "Admissions",
    slug: "2024-admissions-open",
  },
  {
    id: 2,
    title: "Annual Education Conference Scheduled for June",
    summary: "The annual education conference brings together educators, policymakers, and experts to discuss the future of teacher training in Kenya.",
    image: "/images/news/conference.jpg",
    date: "April 18, 2024",
    category: "Events",
    slug: "annual-conference-june",
  },
  {
    id: 3,
    title: "Students Excel in National Teaching Practice Assessment",
    summary: "Third-year students from St John's recorded a 96% pass rate in the national teaching practice assessment, continuing our tradition of excellence.",
    image: "/images/news/students.jpg",
    date: "March 28, 2024",
    category: "News",
    slug: "students-excel-assessment",
  },
];

const teachers = [
  { name: "Prof. John Mwangi", title: "Principal", image: "/images/staff/principal.jpg" },
  { name: "Dr. Agnes Kamau", title: "Head of Academics", image: "/images/staff/st1.jpg" },
  { name: "Mr. David Ochieng", title: "Head of SNE Dept.", image: "/images/staff/st2.jpg" },
  { name: "Mrs. Grace Njoroge", title: "Head of ECDE Dept.", image: "/images/staff/st3.jpg" },
];

export default function HomePage() {
  return (
    <div className={styles.page}>
      {/* Hero */}
      <Hero />

      {/* Features */}
      <section className={`${styles.features} section-padding`}>
        <div className="container">
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">Why Choose Us</span>
            <h2 className="section-title">Shaping Kenya's Finest Educators</h2>
            <p className="section-subtitle">
              At St John's, we combine academic excellence with Christian values to produce
              teachers who make a lasting impact on every life they touch.
            </p>
          </motion.div>
          <div className={styles.featuresGrid}>
            {features.map((f, i) => (
              <motion.div
                key={i}
                className={styles.featureCard}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
              >
                <div className={styles.featureIcon}>
                  <f.icon />
                </div>
                <h3 className={styles.featureTitle}>{f.title}</h3>
                <p className={styles.featureDesc}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <StatsCounter />

      {/* About Section */}
      <section className={`${styles.about} section-padding`}>
        <div className={`${styles.aboutInner} container`}>
          <motion.div
            className={styles.aboutImg}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className={styles.imgStack}>
              <img src="/images/campus/campus1.jpg" alt="Campus" className={styles.mainImg} />
              <img src="/images/campus/campus2.jpg" alt="Library" className={styles.secondImg} />
              <div className={styles.yearsCard}>
                <span className={styles.yearsNum}>10+</span>
                <span className={styles.yearsText}>Years of Excellence</span>
              </div>
            </div>
          </motion.div>
          <motion.div
            className={styles.aboutText}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="section-label">About The College</span>
            <h2 className="section-title">A Legacy of Teaching Excellence</h2>
            <p className={styles.aboutDesc}>
              St John's Teachers Training College has been a cornerstone of teacher education
              in Kenya since 2015. Founded on Christian values and academic excellence, we have
              produced over 200 qualified teachers who are transforming classrooms across Kenya.
            </p>
            <p className={styles.aboutDesc}>
              Our ministry-accredited programs combine theory with extensive teaching practice
              placements, ensuring our graduates are fully prepared for real-world classrooms.
            </p>
            <div className={styles.whyList}>
              {whyUs.map((item, i) => (
                <div key={i} className={styles.whyItem}>
                  <FiCheckCircle className={styles.checkIcon} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <Link href="/about" className="btn-primary">
              Learn More About Us <FiArrowRight />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Courses */}
      <section className={`${styles.coursesSection} section-padding`}>
        <div className="container">
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="section-label">Academic Programs</span>
            <h2 className="section-title">Featured Courses</h2>
            <p className="section-subtitle">
              Choose from our ministry-accredited teacher training programs designed to equip
              you with the skills Kenya's classrooms need.
            </p>
          </motion.div>
          <div className={styles.coursesGrid}>
            {courses.map((course, i) => (
              <CourseCard key={course.id} course={course} index={i} />
            ))}
          </div>
          <div className={styles.viewAll}>
            <Link href="/courses" className="btn-secondary">
              View All Courses <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Admissions CTA */}
      <section className={styles.admissionsCTA}>
        <div className={styles.admissionsBg}>
          <img src="/images/campus/banner.jpg" alt="Campus" className={styles.admissionsBgImg} />
          <div className={styles.admissionsOverlay} />
        </div>
        <div className={`${styles.admissionsContent} container`}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label" style={{ color: "var(--gold-accent)" }}>
              Admissions 2024/2025
            </span>
            <h2 className={styles.admissionsTitle}>
              Begin Your Journey as<br />
              <span className={styles.admissionsAccent}>an Educator Today</span>
            </h2>
            <p className={styles.admissionsText}>
              Applications are now open. Join Kenya's premier teacher training institution
              and take the first step toward a rewarding career in education.
            </p>
            <div className={styles.admissionsActions}>
              <Link href="/apply" className="btn-primary">
                Apply Online Now <FiArrowRight />
              </Link>
              <Link href="/admissions" className={styles.infoBtn}>
                Admission Requirements
              </Link>
            </div>
            <div className={styles.admissionsFeatures}>
              <div className={styles.admissionsFeature}>
                <FiCheckCircle /> HELB Loan Eligible
              </div>
              <div className={styles.admissionsFeature}>
                <FiCheckCircle /> Hostel Available
              </div>
              <div className={styles.admissionsFeature}>
                <FiCheckCircle /> TSC Registration Support
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Teachers Showcase */}
      <section className={`${styles.teachers} section-padding`}>
        <div className="container">
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="section-label">Our Faculty</span>
            <h2 className="section-title">Meet Our Expert Educators</h2>
            <p className="section-subtitle">
              Our experienced faculty bring decades of classroom and research experience to guide the next generation of teachers.
            </p>
          </motion.div>
          <div className={styles.teachersGrid}>
            {teachers.map((t, i) => (
              <motion.div
                key={i}
                className={styles.teacherCard}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className={styles.teacherImgWrap}>
                  <img src={t.image} alt={t.name} className={styles.teacherImg} />
                  <div className={styles.teacherOverlay}>
                    <Link href="/staff" className={styles.teacherProfileBtn}>View Profile</Link>
                  </div>
                </div>
                <div className={styles.teacherInfo}>
                  <p className={styles.teacherName}>{t.name}</p>
                  <p className={styles.teacherTitle}>{t.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className={styles.viewAll}>
            <Link href="/staff" className="btn-secondary">
              Full Staff Directory <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSlider />

      {/* News & Events */}
      <section className={`${styles.newsSection} section-padding`}>
        <div className="container">
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="section-label">Stay Informed</span>
            <h2 className="section-title">Latest News & Events</h2>
            <p className="section-subtitle">
              Keep up with the latest happenings, events, and announcements from St John's College.
            </p>
          </motion.div>
          <div className={styles.newsGrid}>
            {news.map((item, i) => (
              <NewsCard key={item.id} item={item} index={i} />
            ))}
          </div>
          <div className={styles.viewAll}>
            <Link href="/news" className="btn-secondary">
              All News & Events <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className={`${styles.galleryPreview} section-padding`}>
        <div className="container">
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="section-label">Campus Life</span>
            <h2 className="section-title">Life at St John's</h2>
          </motion.div>
          <div className={styles.galleryGrid}>
            {[1,2,3,4,5,6].map((n) => (
              <motion.div
                key={n}
                className={styles.galleryItem}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: n * 0.07 }}
              >
                <img src={`/images/gallery/g${n}.jpg`} alt={`Campus life ${n}`} className={styles.galleryImg} />
                <div className={styles.galleryHover} />
              </motion.div>
            ))}
          </div>
          <div className={styles.viewAll}>
            <Link href="/gallery" className="btn-secondary">
              View Full Gallery <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
