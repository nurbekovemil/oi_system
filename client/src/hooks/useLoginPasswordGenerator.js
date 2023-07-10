import { useEffect, useState } from "react";

const useLoginPasswordGenerator = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    generateLoginPassword();
  }, []);

  const generateLoginPassword = () => {
    const randomLogin = generateRandomLogin();
    const randomPassword = generateRandomPassword();
    setLogin(randomLogin);
    setPassword(randomPassword);
  };

  const generateLogin = () => {
    const randomLogin = generateRandomLogin();
    setLogin(randomLogin);
  };

  const generatePassword = () => {
    const randomPassword = generateRandomPassword();
    setPassword(randomPassword);
  };

  const generateRandomPassword = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_";
    let password = "";
    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters[randomIndex];
    }
    return password;
  };

  const generateRandomLogin = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let login = "";
    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * letters.length);
      login += letters[randomIndex];
    }
    return login;
  };

  return {
    login,
    password,
    generateLoginPassword,
    generateLogin,
    generatePassword,
  };
};

export default useLoginPasswordGenerator;
