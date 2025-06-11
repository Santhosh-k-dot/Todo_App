import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { auth } from "../lib/auth";

export default function Layout({ children, requireAuth = false }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const currentUser = auth.getCurrentUser();
    const isAuthenticated = auth.isAuthenticated();

    if (requireAuth && !isAuthenticated) {
      router.push("/auth/login");
      return;
    }

    if (!requireAuth && isAuthenticated && router.pathname.includes("/auth/")) {
      router.push("/dashboard");
      return;
    }

    setUser(currentUser);
    setLoading(false);
  }, [requireAuth, router]);

  const handleLogout = () => {
    auth.logout();
  };

  if (loading) {
    return (
      <div className="container">
        <div className="card">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {user && (
        <header
          style={{
            background: "#fff",
            padding: "16px 0",
            borderBottom: "1px solid #eee",
            marginBottom: "20px",
          }}
        >
          <div
            className="container"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h1>TODO App</h1>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <span>Welcome, {user.name}</span>
              <button className="btn btn-secondary" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </header>
      )}
      <main>{children}</main>
    </div>
  );
}
