import { redirect } from "@tanstack/react-router";
import { cookieNames, getCookie, removeCookieAsync } from "./cookies";

export const shouldBeLoggedIn = () => {
  const token = getCookie(cookieNames.access_token);
  if (!token) {
    throw redirect({
      to: "/signup",
    });
  }
};

export const shouldNotBeLoggedIn = () => {
  const token = getCookie(cookieNames.access_token);
  if (token) {
    throw redirect({
      to: "/home",
    });
  }
};

export const shouldBeLoggedOut = async () => {
  await removeCookieAsync(cookieNames.access_token);
  throw redirect({
    to: "/signup",
  });
};
