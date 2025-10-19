import NavBar from "./NavBar";
import { Outlet, useLocation } from "react-router-dom";

export default function Layout() {
  const loc = useLocation();
  const isMypage = loc.pathname.startsWith("/mypage");

  // 동적으로 style 계산
  const mainStyle = {
    flex: 1,
    backgroundColor: "#f7f2e8",
    display: "flex",
    justifyContent: "center",
    marginTop: "2.5rem", // mt-10
    marginBottom: isMypage ? "0" : "2.5rem", // mb-0 or mb-10
    overflow: loc.pathname === "/analysis" ? "auto" : "visible",
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <NavBar />
      <main style={mainStyle}>
        <Outlet />
      </main>
    </div>
  );
}
