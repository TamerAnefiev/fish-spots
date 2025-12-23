import { baseUrl } from "../util/constants";

const loginUser = async (username: string, password: string) => {
  const options: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
    credentials: "include",
  };

  return await fetch(`${baseUrl}/api/token/`, options);
};

const logoutUser = async () => {
  return await fetch(`${baseUrl}/api/logout/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
};

export { loginUser, logoutUser };
