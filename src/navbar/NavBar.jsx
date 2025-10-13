import "./NavBar.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";

export default function NavBar() {
  const location = useLocation();
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    alert("로그아웃 되었습니다.");
    navigate("/login");
  };

  const activeTab = location.pathname;

  // 로그인 여부에 따라 보여줄 메뉴 설정
  const menuItems = isLoggedIn
    ? [
        { label: "책장", path: "/" },
        { label: "검색", path: "/search" },
      ]
    : [
        { label: "회원가입", path: "/register" },
        { label: "로그인", path: "/login" },
      ];

  return (
    <div className="bottom-nav">
      <ul className="nav-menu">
        {menuItems.map((item, idx) => (
          <li
            key={idx}
            className={`nav-item ${activeTab === item.path ? "active" : ""}`}
          >
            <Link to={item.path}>{item.label}</Link>
          </li>
        ))}
      </ul>

      {isLoggedIn && (
        <button className="logout-button" onClick={handleLogout}>
          로그아웃
        </button>
      )}
    </div>
  );
}
