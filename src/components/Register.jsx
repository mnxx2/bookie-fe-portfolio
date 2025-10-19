import React, { useState } from "react";
import axios from "axios";
import instance from "../api/axiosinstance";

export default function Register() {
  const [form, setForm] = useState({ email: "", name: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      setLoading(true);
      await instance.post("/auth/register", form, {
        headers: { "Content-Type": "application/json" },
      });

      alert("회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.");
      window.location.href = "/login";
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "회원가입 중 오류가 발생했습니다. 다시 시도해주세요.";
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
      <h2 style={{ width: "100%" }}>회원가입</h2>

      {errorMsg && (
        <div
          style={{
            color: "red",
            marginBottom: "10px",
            whiteSpace: "pre-wrap",
            width: "100%",
          }}
        >
          {typeof errorMsg === "string" ? errorMsg : JSON.stringify(errorMsg)}
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
          border: "none",
          borderRadius: "5px",
          borderBottom: "1px solid #ccc",
        }}
      />

      <input
        type="text"
        name="name"
        placeholder="이름"
        value={form.name}
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

      <input
        type="password"
        name="password"
        placeholder="비밀번호 (6자 이상)"
        value={form.password}
        onChange={handleChange}
        required
        minLength={6}
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
          backgroundColor: "sienna",
        }}
      >
        {loading ? "처리중..." : "회원가입"}
      </button>
    </form>
  );
}
