import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "@/services/users";
import setDocTitle from "@/util/setDocTitle";
import { useAuthContext } from "@/hooks/useAuthContext";
import FormError from "@/components/FormError/FormError";
import Spinner from "@/components/Spinner/Spinner";

const Login = () => {
  const { handleSetUser } = useAuthContext();
  const [passwordEye, setPasswordEye] = useState(false);
  const [formError, setFormError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  setDocTitle("Login");

  const handleLoginClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username) {
      setUsernameError("Username field is required.");
    }
    if (!password) {
      setPasswordError("Password field is required.");
    }

    if (!username || !password) {
      return;
    }

    setUsernameError("");
    setPasswordError("");

    setIsLoading(true);
    try {
      const response = await loginUser(username, password);
      const data = await response.json();

      if (response.status === 200) {
        handleSetUser(data.user, data.id, data.admin);
        navigate("/");
      } else if (response.status === 400) {
        setFormError("Fields must not be empty.");
      } else if (response.status === 401) {
        setFormError(data.detail);
      }
    } catch {
      setFormError("Request failed, please try again later.");
    }

    setIsLoading(false);
  };

  const handleOnChange = (
    value: string,
    valueSetter: React.Dispatch<React.SetStateAction<string>>,
    fieldError: string,
    fieldErrorSetter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    if (value && fieldError) {
      fieldErrorSetter("");
    }

    valueSetter(value);
  };

  return (
    <article className="flex justify-center items-center p-16">
      <form
        onSubmit={handleLoginClick}
        className="flex flex-col basis-1/4 gap-8 p-12 rounded-xl text-xl bg-white"
      >
        <section className="flex flex-col">
          <label className="font-medium" htmlFor="username">
            Потребителско име
          </label>
          <input
            className={`p-2 border-solid border-2 rounded-xl ${
              usernameError ? "border-red-700" : "border-black"
            }`}
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) =>
              handleOnChange(
                e.target.value,
                setUsername,
                usernameError,
                setUsernameError
              )
            }
          ></input>
          {usernameError && <FormError msg={usernameError} />}
        </section>

        <section className="flex flex-col">
          <label className="font-medium" htmlFor="password">
            Парола
          </label>
          <section className="flex relative items-center">
            <input
              className={`p-2 border-solid border-2 rounded-xl w-full ${
                passwordError ? "border-red-700" : "border-black"
              }`}
              type={passwordEye ? "text" : "password"}
              id="password"
              name="password"
              value={password}
              onChange={(e) =>
                handleOnChange(
                  e.target.value,
                  setPassword,
                  passwordError,
                  setPasswordError
                )
              }
            ></input>
            <i
              onClick={() => setPasswordEye(!passwordEye)}
              className={`fa-solid ${
                passwordEye ? "fa-eye" : "fa-eye-slash"
              } absolute right-6 bottom-[0.8rem] hover:cursor-pointer`}
            ></i>
          </section>
          {passwordError && <FormError msg={passwordError} />}
        </section>

        {formError && <FormError msg={formError} />}

        <button
          type="submit"
          className="bg-[#10ACDB] text-white rounded-xl p-4 hover:bg-cyan-800"
        >
          Влез
        </button>

        {isLoading && <Spinner />}
      </form>
    </article>
  );
};

export default Login;
