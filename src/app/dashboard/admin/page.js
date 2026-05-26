"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { adminAPI } from "@/lib/api";
import {
  HiAcademicCap, HiUsers, HiDocumentText, HiOfficeBuilding,
  HiNewspaper, HiPhotograph, HiMail, HiChartBar
} from "react-icons/hi";
import {
  FiHome, FiUsers, FiFileText, FiBook, FiImage,
  FiMail, FiLogOut, FiMenu, FiX, FiBell, FiSearch,
  FiTrendingUp, FiCheckCircle, FiClock, FiAlertCircle,
  FiMoreVertical, FiEye, FiTrash2, FiEdit
} from "react-icons/fi";
import toast from "react-hot-toast";
import styles from "./page.module.css";

const navItems = [
  { icon: FiHome, label: "Overview", key: "overview" },
  { icon: FiUsers, label: "Students", key: "students" },
  { icon: FiFileText, label: "Applications", key: "applications" },
  { icon: FiBook, label: "Courses", key: "courses" },
  { icon: HiOfficeBuilding, label: "Departments", key: "departments" },
  { icon: HiNewspaper, label: "News & Events", key: "news" },
  { icon: FiImage, label: "Gallery", key: "gallery" },
  { icon: FiMail, label: "Messages", key: "messages" },
];

const mockStats = [
  { icon: HiUsers, label: "Total Students", value: "842", trend: "+12%", color: "#1565c0" },
  { icon: HiDocumentText, label: "Applications", value: "126", trend: "+34%", color: "#0d2460" },
  { icon: HiAcademicCap, label: "Courses", value: "12", trend: "0%", color: "#c62828" },
  { icon: HiMail, label: "Messages", value: "48", trend: "+8%", color: "#f59e0b" },
];

const mockApplications = [
  { id:"APP001", name:"James Mwangi", program:"P1", date:"2024-05-01", status:"pending" },
  { id:"APP002", name:"Mary Otieno", program:"ECDE", date:"2024-05-02", status:"approved" },
  { id:"APP003", name:"Grace Kamau", program:"SNE", date:"2024-05-03", status:"pending" },
  { id:"APP004", name:"Peter Njoroge", program:"P1", date:"2024-05-04", status:"rejected" },
  { id:"APP005", name:"Sarah Wanjiku", program:"ECDE", date:"2024-05-05", status:"approved" },
];

const mockStudents = [
  { id:"STU001", name:"Alice Muthoni", program:"P1", year:"Year 2", status:"active", avatar:"/images/students/st1.jpg" },
  { id:"STU002", name:"Brian Ochieng", program:"ECDE", year:"Year 1", status:"active", avatar:"/images/students/st2.jpg" },
  { id:"STU003", name:"Carol Wambui", program:"SNE", year:"Year 2", status:"active", avatar:"/images/students/st3.jpg" },
  { id:"STU004", name:"Daniel Kimani", program:"P1", year:"Year 1", status:"inactive", avatar:"/images/students/st4.jpg" },
];

const statusColor = { pending:"#f59e0b", approved:"#16a34a", rejected:"#dc2626", active:"#16a34a", inactive:"#dc2626" };
const statusBg = { pending:"#fef3c7", approved:"#dcfce7", rejected:"#fee2e2", active:"#dcfce7", inactive:"#fee2e2" };

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => { logout(); router.push("/login"); toast.success("Logged out."); };

  const statusBadge = (status) => (
    <span style={{
      padding:"3px 10px", borderRadius:"50px",
      fontFamily:"var(--font-heading)", fontSize:"0.72rem", fontWeight:700,
      color: statusColor[status], background: statusBg[status]
    }}>{status?.charAt(0).toUpperCase() + status?.slice(1)}</span>
  );

  return (
    <div className={styles.layout}>
      {/* Mobile Overlay */}
      {mobileOpen && <div className={styles.mobileOverlay} onClick={() => setMobileOpen(false)} />}

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${!sidebarOpen ? styles.sidebarCollapsed : ""} ${mobileOpen ? styles.sidebarMobileOpen : ""}`}>
        <div className={styles.sidebarHeader}>
          <div className={styles.sidebarLogo}>
            <div className={styles.sidebarLogoImg}>
              <Image src="/logo.png" alt="Logo" width={40} height={40} />
            </div>
            {sidebarOpen && (
              <div>
                <p className={styles.sidebarName}>St John's</p>
                <p className={styles.sidebarRole}>Admin Panel</p>
              </div>
            )}
          </div>
          <button className={styles.toggleBtn} onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <FiX size={18} /> : <FiMenu size={18} />}
          </button>
        </div>

        <nav className={styles.sidebarNav}>
          {navItems.map(({ icon: Icon, label, key }) => (
            <button
              key={key}
              className={`${styles.navItem} ${activeTab===key ? styles.navItemActive : ""}`}
              onClick={() => { setActiveTab(key); setMobileOpen(false); }}
            >
              <Icon className={styles.navIcon} />
              {sidebarOpen && <span className={styles.navLabel}>{label}</span>}
            </button>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.userInfo}>
            <div className={styles.userAvatar}>{user?.first_name?.[0] || "A"}</div>
            {sidebarOpen && (
              <div>
                <p className={styles.userName}>{user?.first_name || "Admin"}</p>
                <p className={styles.userRole}>Administrator</p>
              </div>
            )}
          </div>
          <button className={styles.logoutBtn} onClick={handleLogout} title="Logout">
            <FiLogOut />
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className={styles.main}>
        {/* Top Bar */}
        <header className={styles.topBar}>
          <div className={styles.topLeft}>
            <button className={styles.mobileMenuBtn} onClick={() => setMobileOpen(true)}>
              <FiMenu size={22} />
            </button>
            <div className={styles.searchBar}>
              <FiSearch className={styles.searchIcon} />
              <input type="text" placeholder="Search students, applications..." className={styles.searchInput} />
            </div>
          </div>
          <div className={styles.topRight}>
            <div className={styles.notifBtn}>
              <FiBell size={20} />
              <span className={styles.notifBadge}>3</span>
            </div>
            <div className={styles.topUser}>
              <div className={styles.topAvatar}>{user?.first_name?.[0] || "A"}</div>
              <span className={styles.topUserName}>{user?.first_name || "Admin"}</span>
            </div>
          </div>
        </header>

        <div className={styles.content}>
          {/* OVERVIEW */}
          {activeTab === "overview" && (
            <div>
              <div className={styles.pageHeader}>
                <h1 className={styles.pageTitle}>Dashboard Overview</h1>
                <p className={styles.pageSubtitle}>Welcome back, {user?.first_name || "Administrator"}. Here is what is happening today.</p>
              </div>

              <div className={styles.statsGrid}>
                {mockStats.map((s, i) => (
                  <motion.div key={i} className={styles.statCard}
                    initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.08 }}>
                    <div className={styles.statIconWrap} style={{ background:`${s.color}15` }}>
                      <s.icon className={styles.statIcon} style={{ color:s.color }} />
                    </div>
                    <div>
                      <p className={styles.statValue}>{s.value}</p>
                      <p className={styles.statLabel}>{s.label}</p>
                    </div>
                    <span className={styles.statTrend} style={{ color: s.trend.startsWith("+") ? "#16a34a" : "#6b7280" }}>
                      <FiTrendingUp size={12} /> {s.trend}
                    </span>
                  </motion.div>
                ))}
              </div>

              <div className={styles.panels}>
                {/* Recent Applications */}
                <div className={styles.panel}>
                  <div className={styles.panelHeader}>
                    <h3 className={styles.panelTitle}>Recent Applications</h3>
                    <button className={styles.panelLink} onClick={() => setActiveTab("applications")}>View All</button>
                  </div>
                  <div className={styles.tableWrap}>
                    <table className={styles.table}>
                      <thead><tr>
                        <th>App ID</th><th>Name</th><th>Program</th><th>Date</th><th>Status</th><th>Action</th>
                      </tr></thead>
                      <tbody>
                        {mockApplications.slice(0,5).map(a => (
                          <tr key={a.id}>
                            <td className={styles.mono}>{a.id}</td>
                            <td>{a.name}</td>
                            <td><span className="badge">{a.program}</span></td>
                            <td>{a.date}</td>
                            <td>{statusBadge(a.status)}</td>
                            <td>
                              <div className={styles.actionBtns}>
                                <button className={styles.actionBtn}><FiEye size={14}/></button>
                                <button className={styles.actionBtn}><FiEdit size={14}/></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className={styles.quickPanel}>
                  <h3 className={styles.panelTitle}>Quick Actions</h3>
                  <div className={styles.quickActions}>
                    {[
                      { icon: HiUsers, label:"Add Student", color:"#1565c0" },
                      { icon: HiDocumentText, label:"New Course", color:"#0d2460" },
                      { icon: HiNewspaper, label:"Post News", color:"#c62828" },
                      { icon: HiPhotograph, label:"Upload Photo", color:"#f59e0b" },
                    ].map((q,i) => (
                      <button key={i} className={styles.quickBtn}>
                        <div className={styles.quickIcon} style={{ background:`${q.color}12`, color:q.color }}><q.icon size={20}/></div>
                        <span>{q.label}</span>
                      </button>
                    ))}
                  </div>

                  <h3 className={styles.panelTitle} style={{ marginTop:28 }}>Application Summary</h3>
                  {[
                    { label:"Pending Review", count:38, icon:FiClock, color:"#f59e0b" },
                    { label:"Approved", count:74, icon:FiCheckCircle, color:"#16a34a" },
                    { label:"Rejected", count:14, icon:FiAlertCircle, color:"#dc2626" },
                  ].map((s,i) => (
                    <div key={i} className={styles.summaryRow}>
                      <div className={styles.summaryLeft}>
                        <s.icon color={s.color} size={16} />
                        <span>{s.label}</span>
                      </div>
                      <div className={styles.summaryBar}>
                        <div className={styles.summaryFill} style={{ width:`${(s.count/126)*100}%`, background:s.color }} />
                      </div>
                      <span className={styles.summaryCount}>{s.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STUDENTS TAB */}
          {activeTab === "students" && (
            <div>
              <div className={styles.pageHeader}>
                <h1 className={styles.pageTitle}>Students</h1>
                <button className="btn-primary" style={{ fontSize:"0.88rem", padding:"10px 20px" }}>+ Add Student</button>
              </div>
              <div className={styles.panel}>
                <div className={styles.panelHeader}>
                  <input type="text" placeholder="Search students..." className={styles.searchInput} style={{ maxWidth:280 }} />
                  <select className={styles.filterSelect}><option>All Programs</option><option>P1</option><option>ECDE</option><option>SNE</option></select>
                </div>
                <div className={styles.tableWrap}>
                  <table className={styles.table}>
                    <thead><tr><th>Student</th><th>ID</th><th>Program</th><th>Year</th><th>Status</th><th>Actions</th></tr></thead>
                    <tbody>
                      {mockStudents.map(s => (
                        <tr key={s.id}>
                          <td>
                            <div className={styles.studentCell}>
                              <img src={s.avatar} alt={s.name} className={styles.studentAvatar} />
                              {s.name}
                            </div>
                          </td>
                          <td className={styles.mono}>{s.id}</td>
                          <td><span className="badge">{s.program}</span></td>
                          <td>{s.year}</td>
                          <td>{statusBadge(s.status)}</td>
                          <td>
                            <div className={styles.actionBtns}>
                              <button className={styles.actionBtn}><FiEye size={14}/></button>
                              <button className={styles.actionBtn}><FiEdit size={14}/></button>
                              <button className={`${styles.actionBtn} ${styles.dangerBtn}`}><FiTrash2 size={14}/></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* APPLICATIONS TAB */}
          {activeTab === "applications" && (
            <div>
              <div className={styles.pageHeader}>
                <h1 className={styles.pageTitle}>Applications</h1>
                <p className={styles.pageSubtitle}>Review and manage student applications</p>
              </div>
              <div className={styles.panel}>
                <div className={styles.panelHeader}>
                  <input type="text" placeholder="Search applications..." className={styles.searchInput} style={{ maxWidth:280 }} />
                  <select className={styles.filterSelect}><option>All Statuses</option><option>Pending</option><option>Approved</option><option>Rejected</option></select>
                </div>
                <div className={styles.tableWrap}>
                  <table className={styles.table}>
                    <thead><tr><th>App ID</th><th>Applicant</th><th>Program</th><th>Date</th><th>Status</th><th>Actions</th></tr></thead>
                    <tbody>
                      {mockApplications.map(a => (
                        <tr key={a.id}>
                          <td className={styles.mono}>{a.id}</td>
                          <td>{a.name}</td>
                          <td><span className="badge">{a.program}</span></td>
                          <td>{a.date}</td>
                          <td>{statusBadge(a.status)}</td>
                          <td>
                            <div className={styles.actionBtns}>
                              <button className={styles.actionBtn} title="View"><FiEye size={14}/></button>
                              <button className={styles.approveBtn} title="Approve" onClick={() => toast.success(`Approved ${a.id}`)}>Approve</button>
                              <button className={styles.rejectBtn} title="Reject" onClick={() => toast.error(`Rejected ${a.id}`)}>Reject</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Other tabs */}
          {["courses","departments","news","gallery","messages"].includes(activeTab) && (
            <div>
              <div className={styles.pageHeader}>
                <h1 className={styles.pageTitle}>{navItems.find(n=>n.key===activeTab)?.label}</h1>
                <button className="btn-primary" style={{ fontSize:"0.88rem", padding:"10px 20px" }}>+ Add New</button>
              </div>
              <div className={styles.panel}>
                <div className={styles.emptyState}>
                  <HiAcademicCap className={styles.emptyIcon} />
                  <h3>Manage {navItems.find(n=>n.key===activeTab)?.label}</h3>
                  <p>This module connects to the backend API. Content will appear here when loaded from the database.</p>
                  <button className="btn-primary" style={{ marginTop:16, fontSize:"0.88rem" }}>+ Create First Entry</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
