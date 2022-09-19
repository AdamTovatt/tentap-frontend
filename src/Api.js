export async function Login(email, password) {
  return await fetch(GetBasePath() + "user/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: { "Content-Type": "application/json" },
  });
}

export function GetAllCourses() {
  fetch(GetBasePath() + "course/getall")
    .then((response) => response.json())
    .then((responseData) => {
      console.log(responseData);
    });
}

function GetBasePath() {
  let requestPath = "https://ledigasalar.online/tentap/";
  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    //use local address if development
    requestPath = "https://localhost:5001/";
  }
  return requestPath;
}
