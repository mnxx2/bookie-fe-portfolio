import "./App.css";
import Layout from "./navbar/Layout";
import MainPage from "./components/MainPage";
import { Routes, Route } from "react-router-dom";
import SearchArea from "./components/SearchArea";
import Register from "./components/Register";
import Login from "./components/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="search" element={<SearchArea />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;
