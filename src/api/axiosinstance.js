import axios from "axios";

// 로컬
const baseURL = process.env.REACT_APP_API_URL || "http://localhost:3001";

// axios 인스턴스 생성
const instance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// 인터셉터 추가 : 요청 전마다 실행
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // 항상 최신 토큰 적용
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터 : 에러 처리나 공통 응답 처리
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("토큰 만료 또는 인증 오류");
      const currentPath = window.location.pathname + window.location.search;

      // 메인 화면에서는 로그인 이동 처리 막기
      if (currentPath === "/") {
        return Promise.resolve({ data: {} });
      } else {
        window.location.href = `/login?redirect=${encodeURIComponent(
          currentPath
        )}`;
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
