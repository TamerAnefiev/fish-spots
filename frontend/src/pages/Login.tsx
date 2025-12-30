import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import setDocTitle from "@/util/setDocTitle";
import { useAuth } from "@/context/AuthContext";
import FormError from "@/components/FormError/FormError";
import Spinner from "@/components/Spinner/Spinner";

const Login = () => {
  const { loginMutation } = useAuth();
  const [passwordEye, setPasswordEye] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  setDocTitle("Login");

  const handleLoginClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username) {
      setUsernameError("Username field is required.");
      return;
    }
    if (!password) {
      setPasswordError("Password field is required.");
      return;
    }

    setUsernameError("");
    setPasswordError("");

    loginMutation.mutate(
      { username, password },
      {
        onSuccess: () => navigate("/"),
        onError: (error) => {
          console.log(error.message);
        },
      },
    );
  };

  const handleOnChange = (
    value: string,
    valueSetter: React.Dispatch<React.SetStateAction<string>>,
    fieldError: string,
    fieldErrorSetter: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    if (value && fieldError) {
      fieldErrorSetter("");
    }

    valueSetter(value);
  };

  return (
    <article className="flex items-center justify-center p-16">
      <form
        onSubmit={handleLoginClick}
        className="flex basis-1/4 flex-col gap-8 rounded-xl bg-white p-12 text-xl"
      >
        <section className="flex flex-col">
          <label className="font-medium" htmlFor="username">
            Потребителско име
          </label>
          <input
            className={`rounded-xl border-2 border-solid p-2 ${
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
                setUsernameError,
              )
            }
          ></input>
          {usernameError && <FormError msg={usernameError} />}
        </section>

        <section className="flex flex-col">
          <label className="font-medium" htmlFor="password">
            Парола
          </label>
          <section className="relative flex items-center">
            <input
              className={`w-full rounded-xl border-2 border-solid p-2 ${
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
                  setPasswordError,
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

        {loginMutation.isError && (
          <FormError msg={loginMutation.error.message} />
        )}

        <button
          type="submit"
          className="rounded-xl bg-[#10ACDB] p-4 text-white hover:bg-cyan-800"
        >
          Влез
        </button>

        {loginMutation.isPending && <Spinner />}
      </form>
    </article>
  );
};

export default Login;
