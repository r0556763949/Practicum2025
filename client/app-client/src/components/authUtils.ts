interface TokenPayload {
  sub: string; // ID של המשתמש
  email: string;
  role: string;
  exp: number; // תאריך תפוגה
}

export const decodeToken = (token: string): TokenPayload | null => {
  try {
    // חילוץ החלק של ה-Payload מתוך ה-JWT
    const base64Url = token.split(".")[1];
    if (!base64Url) {
      throw new Error("Invalid token format");
    }

    // פענוח Base64
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => `%${c.charCodeAt(0).toString(16).padStart(2, "0")}`)
        .join("")
    );

    // המרה ל-Object
    return JSON.parse(jsonPayload) as TokenPayload;
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
};
export default decodeToken;
