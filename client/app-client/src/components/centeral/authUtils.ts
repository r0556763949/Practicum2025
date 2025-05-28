
interface TokenPayload {
  sub: string; 
  email: string;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
  exp: number; 
}

export const decodeToken = (token: string): TokenPayload | null => {
  try {
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
