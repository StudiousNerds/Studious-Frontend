import { POST } from "./api";
import { getCookie } from "utils/cookie";

/* 소셜 로그인 */
export const postOAuthLogin = async (code, platform) => {
  const { data } = await POST(`/oauth/authenticate/${platform}?code=${code}`);
  return data;
};

/* 일반 로그인 */
export const postLogin = async (body) => {
  const { data } = await POST("/members/login", body);
  return data;
};

/* 일반 회원가입 */
export const postSignUp = async (body, failCallback) => {
  const { data } = await POST("/members/signup", body, "", failCallback);
  return data;
};

/* 소셜 회원가입 */
export const postOAuthSignUp = async (body, failCallback) => {
  const { data } = await POST("/oauth/signup", body, "", failCallback);
  return data;
};

/* 로그아웃 */
export const postLogout = async () => {
  const { data } = await POST("/members/logout", {}, getCookie("accessToken"));
  return data;
};
