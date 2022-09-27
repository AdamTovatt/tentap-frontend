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

export async function CreateNewSource(courseId, author, date) {
  const cookies = new Cookies();
  const userInfo = cookies.get("userInfo");

  return await fetch(GetBasePath() + "admin/source/create", {
    method: "POST",
    body: JSON.stringify({ courseId, author, date }),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + userInfo.token,
    },
  });
}

export async function CreateNewModule(courseId, name) {
  const cookies = new Cookies();
  const userInfo = cookies.get("userInfo");

  return await fetch(GetBasePath() + "admin/module/create", {
    method: "POST",
    body: JSON.stringify({ courseId, moduleName: name }),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + userInfo.token,
    },
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

export async function SetCourseActiveStatus(id, active) {
  const cookies = new Cookies();
  const userInfo = cookies.get("userInfo");

  return await fetch(
    GetBasePath() + "admin/course/setActive?id=" + id + "&active=" + active,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userInfo.token,
      },
    }
  );
}

export async function SetExerciseActiveStatus(id, active) {
  const cookies = new Cookies();
  const userInfo = cookies.get("userInfo");

  return await fetch(
    GetBasePath() + "admin/exercise/setActive?id=" + id + "&active=" + active,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userInfo.token,
      },
    }
  );
}

export async function CreateNewExercise(id, difficulty, sourceId, moduleId) {
  const cookies = new Cookies();
  const userInfo = cookies.get("userInfo");

  return await fetch(GetBasePath() + "admin/exercise/create", {
    method: "POST",
    body: JSON.stringify({ id, difficulty, sourceId, moduleId }),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + userInfo.token,
    },
  });
}

export async function DeleteExercise(id) {
  const cookies = new Cookies();
  const userInfo = cookies.get("userInfo");

  return await fetch(GetBasePath() + "admin/exercise/remove?id=" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + userInfo.token,
    },
  });
}

export async function GetExerciseById(exerciseId) {
  return await fetch(
    GetBasePath() + "course/exercise/get?exerciseId=" + exerciseId
  );
}

export async function GetAllModulesForCourse(courseId) {
  return await fetch(
    GetBasePath() + "course/getModulesByCourseId?courseId=" + courseId
  );
}

export async function GetAllExercisesForCourse(courseId, onlyInactive) {
  return await fetch(
    GetBasePath() +
      "course/exercise/getAll?courseId=" +
      courseId +
      "&onlyInactive=" +
      onlyInactive
  );
}

export async function GetAllSourcesForCourse(courseId) {
  return await fetch(
    GetBasePath() + "course/getSourcesByCourseId?courseId=" + courseId
  );
}

export async function GetAllCourses(includeInactive) {
  return await fetch(
    GetBasePath() + "course/getall?includeInactive=" + includeInactive
  );
}

export function GetBasePath() {
  let requestPath = "https://ledigasalar.online/tentap/";
  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    //use local address if development
    requestPath = "https://localhost:5001/";
  }
  return requestPath;
}
