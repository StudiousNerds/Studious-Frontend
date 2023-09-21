export const comparePassword = (newPassword, passwordSubString) => {
  for (let i = 0; i < passwordSubString.length; i++) {
    if (newPassword[i] !== passwordSubString[i]) {
      return false;
    }
  }
  return true;
};
