import Cookies from "js-cookie";

export const cookieNames = {
  access_token: "access_token",
};

export const getCookieAsync = async (
  name: string
): Promise<string | undefined> => {
  return new Promise((resolve) => {
    const cookieValue = Cookies.get(name);
    resolve(cookieValue);
  });
};

export const setCookie = (name: string, value: string, expires = 2) => {
  Cookies.set(name, value, { expires });
  return;
};

export const removeCookie = (name: string) => {
  Cookies.remove(name);
  return;
};
