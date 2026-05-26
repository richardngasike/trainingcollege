"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function AuthGuard({ children, role }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/login");
        return;
      }
      if (role && user.role !== role) {
        router.push(user.role === "admin" ? "/dashboard/admin" : "/dashboard/student");
      }
    }
  }, [user, loading, role, router]);

  if (loading) return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center" }}>
      <div style={{ textAlign:"center" }}>
        <div style={{
          width:48, height:48, border:"4px solid var(--blue-pale)",
          borderTop:"4px solid var(--blue-dark)", borderRadius:"50%",
          animation:"spin 0.8s linear infinite", margin:"0 auto 16px"
        }} />
        <p style={{ color:"var(--gray-500)", fontFamily:"var(--font-heading)", fontSize:"0.9rem" }}>Loading...</p>
      </div>
    </div>
  );

  if (!user) return null;
  if (role && user.role !== role) return null;
  return children;
}
