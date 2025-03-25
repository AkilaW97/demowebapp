import { jwtDecode } from "jwt-decode"; 

export function getUserRole() {
  const token = getTokenFromCookie("token"); 
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded.role;
  } catch (e) {
    console.error("Invalid token:", e);
    return null;
  }
}

function getTokenFromCookie(cookieName) {
  const match = document.cookie.match(new RegExp("(^| )" + cookieName + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}
