import jwt_decode from "jwt-decode";

// const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY;

export const verifyToken = (token) => {
  try {
    const decoded = jwt_decode(token);

    if (decoded.iss !== "MovieListAbpApp") {
      throw new Error("Invalid issuer");
    }

    if (decoded.aud !== "MovieListAbpApp") {
      throw new Error("Invalid audience");
    }

    console.log("decoded::", decoded);
    return decoded;
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return null;
  }
};