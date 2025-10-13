import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../AuthContext"; // 경로는 프로젝트 구조에 맞게
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { setLoginState } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      setLoading(true);
      const response = await axios.post("/auth/login", form, {
        headers: { "Content-Type": "application/json" },
      });

      const { accessToken, user } = response.data;

      // AuthContext에 로그인 상태와 사용자 정보 저장
      setLoginState(accessToken, user);

      alert("로그인 되었습니다.");
      navigate("/");
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "로그인 실패. 이메일과 비밀번호를 확인하세요.";
      setErrorMsg(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        width: 400,
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: "10px",
      }}
    >
      <h2>로그인</h2>

      {errorMsg && (
        <div
          style={{
            color: "red",
            marginBottom: "10px",
            whiteSpace: "pre-wrap",
            width: "100%",
          }}
        >
          {errorMsg}
        </div>
      )}

      <input
        type="email"
        name="email"
        placeholder="이메일"
        value={form.email}
        onChange={handleChange}
        required
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "5px",
          border: "none",
          borderBottom: "1px solid #ccc",
        }}
      />

      <input
        type="password"
        name="password"
        placeholder="비밀번호"
        value={form.password}
        onChange={handleChange}
        required
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
          border: "none",
          borderRadius: "5px",
          borderBottom: "1px solid #ccc",
        }}
      />

      <button
        type="submit"
        disabled={loading}
        style={{
          width: "60%",
          padding: "10px",
          cursor: "pointer",
          border: "none",
          borderRadius: "5px",
          color: "white",
          backgroundColor: "rgba(174, 89, 253, 1)",
        }}
      >
        {loading ? "처리중..." : "로그인"}
      </button>
    </form>
  );
}
