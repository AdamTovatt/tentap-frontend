import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StartPage from "./Components/Pages/StartPage";
import LoginPage from "./Components/Pages/Login";
import RegisterPage from "./Components/Pages/Register";
import UserProfilePage from "./Components/Pages/UserProfilePage";
import AdminPage from "./Components/Pages/AdminPage";
import CoursesPage from "./Components/Pages/CoursesPage";
import CoursePage from "./Components/Pages/CoursePage";
import ExercisePage from "./Components/Pages/ExercisePage";
import TamapluggiPage from "./Components/Pages/TamapluggiPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<StartPage />}></Route>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/register" element={<RegisterPage />}></Route>
      <Route path="/me" element={<UserProfilePage />}></Route>
      <Route path="/admin" element={<AdminPage />}></Route>
      <Route path="/courses" element={<CoursesPage />}></Route>
      <Route path="/course/:id" element={<CoursePage />}></Route>
      <Route path="/tamapluggi" element={<TamapluggiPage />}></Route>
      <Route
        path="/course/:courseId/exercise/:exerciseId"
        element={<ExercisePage />}
      ></Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
