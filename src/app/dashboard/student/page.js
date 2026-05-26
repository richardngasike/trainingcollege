"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import {
  FiHome, FiFileText, FiBook, FiCalendar, FiUser,
  FiLogOut, FiMenu, FiX, FiBell, FiCheckCircle, FiClock, FiAlertCircle
} from "react-icons/fi";
import { HiAcademicCap, HiDocumentText, HiCalendar, HiNewspaper } from "react-icons/hi";
import toast from "react-hot-toast";
import styles from "./page.module.css";

const navItems = [
  { icon: FiHome, label: "Overview", key: "overview" },
  { icon: FiFileText, label: "My Application", key: "application" },
  { icon: FiBook, label: "My Courses", key: "courses" },
  { icon: FiCalendar, label: "Events", key: "events" },
  { icon: FiUser, label: "My Profile", key: "profile" },
];

const mockDocs = [
  { name: "KCSE Certificate", status: "uploaded", date: "2024-05-01" },
  { name: "National ID Copy", status: "uploaded", date: "2024-05-01" },
  { name: "Passport Photo", status: "uploaded", date: "2024-05-01" },
  { name: "Medical Certificate", status: "pending", date: "—" },
];

const timeline = [
  { step: "Application Submitted", date: "May 1, 2024", done: true },
  { step: "Documents Verified", date: "May 5, 2024", done: true },
  { step: "Under Review", date: "In Progress", done: false, active: true },
  { step: "Admission Decision", date: "Expected May 20", done: false },
  { step: "Enrollment & Registration", date: "Pending", done: false },
];

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => { logout(); router.push("/login"); toast.success("Logged out."); };

  return (
    <div className={styles.layout}>
      {mobileOpen && <div className={styles.overlay} onClick={() => setMobileOpen(false)} />}

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${mobileOpen ? styles.sidebarOpen : ""}`}>
        <div className={styles.sidebarHeader}>
          <Link href="/" className={styles.logoRow}>
            <div className={styles.logoWrap}><Image src="/logo.png" alt="Logo" width={44} height={44} /></div>
            <div>
              <p className={styles.logoName}>St John's</p>
              <p className={styles.logoSub}>Student Portal</p>
            </div>
          </Link>
          <button className={styles.closeBtn} onClick={() => setMobileOpen(false)}><FiX /></button>
        </div>

        <nav className={styles.sidebarNav}>
          {navItems.map(({ icon: Icon, label, key }) => (
            <button key={key} className={`${styles.navItem} ${activeTab===key ? styles.navActive : ""}`}
              onClick={() => { setActiveTab(key); setMobileOpen(false); }}>
              <Icon className={styles.navIcon} /><span>{label}</span>
            </button>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.profileCard}>
            <div className={styles.profileAvatar}>{user?.first_name?.[0] || "S"}</div>
            <div>
              <p className={styles.profileName}>{user?.first_name} {user?.last_name}</p>
              <p className={styles.profileEmail}>{user?.email}</p>
            </div>
          </div>
          <button className={styles.logoutBtn} onClick={handleLogout}><FiLogOut size={16}/> Logout</button>
        </div>
      </aside>

      {/* Main */}
      <div className={styles.main}>
        <header className={styles.topBar}>
          <button className={styles.menuBtn} onClick={() => setMobileOpen(true)}><FiMenu size={22}/></button>
          <div className={styles.topTitle}>
            <h2 className={styles.greeting}>Hello, {user?.first_name || "Student"}</h2>
            <p className={styles.greetingSub}>Welcome to your student portal</p>
          </div>
          <div className={styles.topRight}>
            <div className={styles.notifBtn}><FiBell size={20}/><span className={styles.badge}>2</span></div>
          </div>
        </header>

        <div className={styles.content}>
          {/* OVERVIEW */}
          {activeTab === "overview" && (
            <div>
              <div className={styles.appStatusCard}>
                <div className={styles.appStatusLeft}>
                  <span className={styles.appStatusLabel}>Application Status</span>
                  <h3 className={styles.appStatusTitle}>Under Review</h3>
                  <p className={styles.appStatusText}>Your application is being reviewed by our admissions team. Expected decision by May 20, 2024.</p>
                  <div className={styles.appStatusMeta}>
                    <span><strong>Ref:</strong> APP-2024-00142</span>
                    <span><strong>Program:</strong> Primary Teacher Education (P1)</span>
                  </div>
                </div>
                <div className={styles.appStatusIcon}>
                  <FiClock size={56} />
                </div>
              </div>

              <div className={styles.quickCards}>
                {[
                  { icon: HiDocumentText, label:"Application ID", value:"APP-2024-00142", color:"#1565c0" },
                  { icon: HiAcademicCap, label:"Program Applied", value:"Primary (P1)", color:"#0d2460" },
                  { icon: HiCalendar, label:"Applied Date", value:"May 1, 2024", color:"#c62828" },
                  { icon: HiNewspaper, label:"Documents Submitted", value:"3 of 4", color:"#f59e0b" },
                ].map((c,i) => (
                  <motion.div key={i} className={styles.quickCard}
                    initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.08 }}>
                    <div className={styles.quickIcon} style={{ background:`${c.color}15`, color:c.color }}><c.icon size={22}/></div>
                    <p className={styles.quickLabel}>{c.label}</p>
                    <p className={styles.quickValue}>{c.value}</p>
                  </motion.div>
                ))}
              </div>

              {/* Application Timeline */}
              <div className={styles.panel}>
                <h3 className={styles.panelTitle}>Application Progress</h3>
                <div className={styles.timeline}>
                  {timeline.map((t, i) => (
                    <div key={i} className={`${styles.timelineItem} ${t.done ? styles.done : ""} ${t.active ? styles.active : ""}`}>
                      <div className={styles.timelineDot}>
                        {t.done ? <FiCheckCircle /> : t.active ? <FiClock /> : <span>{i+1}</span>}
                      </div>
                      {i < timeline.length-1 && <div className={`${styles.timelineLine} ${t.done ? styles.lineActive : ""}`} />}
                      <div className={styles.timelineInfo}>
                        <p className={styles.timelineStep}>{t.step}</p>
                        <p className={styles.timelineDate}>{t.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* APPLICATION TAB */}
          {activeTab === "application" && (
            <div>
              <h2 className={styles.tabTitle}>My Application</h2>
              <div className={styles.panel}>
                <h3 className={styles.panelTitle}>Application Details</h3>
                <div className={styles.detailGrid}>
                  {[
                    ["Application ID","APP-2024-00142"],["Status","Under Review"],
                    ["Program","Primary Teacher Education (P1)"],["Intake","2024/2025"],
                    ["Submitted","May 1, 2024"],["KCSE Grade","B+"],
                  ].map(([k,v]) => (
                    <div key={k} className={styles.detailItem}>
                      <span className={styles.detailKey}>{k}</span>
                      <span className={styles.detailVal}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.panel} style={{ marginTop:20 }}>
                <h3 className={styles.panelTitle}>Submitted Documents</h3>
                {mockDocs.map((d, i) => (
                  <div key={i} className={styles.docRow}>
                    <FiFileText className={styles.docIcon} />
                    <div>
                      <p className={styles.docName}>{d.name}</p>
                      <p className={styles.docDate}>{d.date}</p>
                    </div>
                    <span className={styles.docStatus} data-status={d.status}>
                      {d.status === "uploaded" ? <><FiCheckCircle /> Submitted</> : <><FiClock /> Pending</>}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PROFILE TAB */}
          {activeTab === "profile" && (
            <div>
              <h2 className={styles.tabTitle}>My Profile</h2>
              <div className={styles.panel}>
                <div className={styles.profileHeader}>
                  <div className={styles.profileAvatarLg}>{user?.first_name?.[0] || "S"}</div>
                  <div>
                    <h3 className={styles.profileFullName}>{user?.first_name} {user?.last_name}</h3>
                    <p className={styles.profileEmailLg}>{user?.email}</p>
                    <span className={styles.profileRoleBadge}>Student</span>
                  </div>
                </div>
                <div className={styles.detailGrid} style={{ marginTop:28 }}>
                  {[
                    ["First Name", user?.first_name || "—"],
                    ["Last Name", user?.last_name || "—"],
                    ["Email", user?.email || "—"],
                    ["Phone", user?.phone || "—"],
                    ["Role", "Student"],
                    ["Member Since", "May 2024"],
                  ].map(([k,v]) => (
                    <div key={k} className={styles.detailItem}>
                      <span className={styles.detailKey}>{k}</span>
                      <span className={styles.detailVal}>{v}</span>
                    </div>
                  ))}
                </div>
                <button className="btn-primary" style={{ marginTop:24, fontSize:"0.9rem" }}>Edit Profile</button>
              </div>
            </div>
          )}

          {["courses","events"].includes(activeTab) && (
            <div>
              <h2 className={styles.tabTitle}>{navItems.find(n=>n.key===activeTab)?.label}</h2>
              <div className={styles.panel}>
                <div className={styles.emptyState}>
                  <HiAcademicCap style={{ fontSize:"3.5rem", color:"var(--blue-light)", opacity:0.4 }} />
                  <p>Content will appear here after enrollment is confirmed.</p>
                  <Link href="/courses" className="btn-primary" style={{ marginTop:12, fontSize:"0.88rem" }}>Explore Courses</Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
