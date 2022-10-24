import Cookies from "universal-cookie";

export function GetUserInfo() {
  const cookies = new Cookies();
  const userInfo = cookies.get("userInfo");

  if (!userInfo) return null;
  if (!userInfo.tokenExpirationDate) return null;

  if (new Date(userInfo.tokenExpirationDate) < new Date()) {
    RemoveUserInfo();
    return null;
  }

  return userInfo;
}

export function RemoveUserInfo() {
  const cookies = new Cookies();

  cookies.remove("userInfo", {
    path: "/",
    sameSite: "none",
    secure: true,
  });
}
