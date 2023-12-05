import { setCookie } from "utils/cookie";

export const setToken = ({ accessToken, grantType }) => {
  setCookie({
    key: "accessToken",
    value: `${grantType} ${accessToken}`,
  });
};
