import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { navigateToLogin } from "./helper";
import config from "../config";

interface JwtPayload {
  asurite: string;
  exp: number;
  iat: number;
  iss: string;
}

export function getJwtToken() {
  const { hostname } = window.location;

  if (hostname === "localhost") {
    const envToken = import.meta.env[`VITE_${config.environment.toUpperCase()}_TOKEN`];
    if (envToken) return envToken;
  }

  let cookie = window.location.hostname.split(".")[0];
  const jwtToken = Cookies.get(cookie);
  return jwtToken;
}

export function isExpired(tokenExp?: number) {
  const currentTime = Math.floor(Date.now() / 1000);

  return !!tokenExp && tokenExp <= currentTime;
}

export function getDecodedAuthCookie() {
  const jwtToken = getJwtToken();
  if (!jwtToken) {
    return false;
  }

  const parsedToken = jwtDecode<JwtPayload>(jwtToken);
  return {
    decodedToken: parsedToken,
    isExpired: isExpired(parsedToken.exp),
  };
}

export function getUserAsuriteFromAuthCookie(): string | undefined {
  const decodedAuthCookie = getDecodedAuthCookie();
  if (!decodedAuthCookie) {
    return undefined;
  }

  if (!decodedAuthCookie.decodedToken) {
    return undefined;
  }

  return decodedAuthCookie.decodedToken.asurite;
}

export function isAuthCookieValid() {
  const decodedAuthCookie = getDecodedAuthCookie();
  return decodedAuthCookie === false ? false : !decodedAuthCookie.isExpired;
}

export const redirectToAuth = () => {
  if (window.location.hostname === "localhost") {
    console.error(
      `Please update the auth cookie manually. You must log in at ${navigateToLogin()}, copy to localhost the auth cookie generated from it, and reload the page.`
    );
    return;
  }
  navigateToLogin(true);
};
