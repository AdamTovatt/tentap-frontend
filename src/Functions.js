import Cookies from "universal-cookie";

export function randomNumberInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function setCookie(cookieName, cookieValue) {
  const cookies = new Cookies();
  cookies.set(cookieName, cookieValue, {
    path: "/",
    sameSite: "none",
    secure: true,
  });
}
