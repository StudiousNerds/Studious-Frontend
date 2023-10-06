import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookie = ({ key, value, options }) => {
  try {
    return cookies.set(key, value, { ...options });
  } catch (e) {
    console.error(e);
  }
};

export const getCookie = (key) => {
  try {
    return cookies.get(key);
  } catch (e) {
    console.error(e);
  }
};

export const getToken = () => getCookie("accessToken");
