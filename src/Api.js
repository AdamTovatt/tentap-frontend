import Cookies from "universal-cookie";

export async function Login(email, password) {
  return await fetch(GetBasePath() + "user/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: { "Content-Type": "application/json" },
  });
}

export async function Register(email, password, username) {
  return await fetch(GetBasePath() + "user/create", {
    method: "POST",
    body: JSON.stringify({ name: username, email, password }),
    headers: { "Content-Type": "application/json" },
  });
}

export async function CreateNewCourse(name, code) {
  const cookies = new Cookies();
  const userInfo = cookies.get("userInfo");

  return await fetch(GetBasePath() + "admin/course/create", {
    method: "POST",
    body: JSON.stringify({ name, code }),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + userInfo.token,
    },
  });
}

export async function GetAllCourses() {
  return await fetch(GetBasePath() + "course/getall");
}

function GetBasePath() {
  let requestPath = "https://ledigasalar.online/tentap/";
  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    //use local address if development
    requestPath = "https://localhost:5001/";
  }
  return requestPath;
}
