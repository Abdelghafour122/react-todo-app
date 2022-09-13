import React, { useRef, useState } from "react";
import { useAuthentication } from "../Contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const { userSignUp } = useAuthentication();
  const navigate = useNavigate();

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const confirmPasswordRef = useRef<HTMLInputElement | null>(null);

  const [errormessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    console.log(
      emailRef.current?.value,
      passwordRef.current?.value,
      confirmPasswordRef.current?.value
    );

    if (passwordRef.current?.value !== confirmPasswordRef.current?.value)
      return setErrorMessage("Passwords do not match!");

    try {
      setErrorMessage("");
      setLoading(true);
      if (
        emailRef.current?.value !== undefined &&
        passwordRef.current?.value !== undefined
      )
        await userSignUp(emailRef.current?.value, passwordRef.current?.value);
      navigate("/dashboard");
    } catch {
      setErrorMessage("Unable to sign up.");
    }

    setLoading(false);
  }

  return (
    <div className="sign-up">
      <div className="container">
        <h2 className="form-title">Sign Up</h2>
        {errormessage !== "" && (
          <p className="text-lg text-red-700">{errormessage}</p>
        )}
        <form
          action=""
          className="flex flex-col items-center justify-center my-3 mx-auto gap-3 w-max md:w-80 lg:w-96"
          onSubmit={handleSubmit}
        >
          <div className="email flex flex-col justify-center items-center w-full">
            <label
              htmlFor="email"
              className="form-label after:content-['*'] after:ml-0.5 after:text-red-500"
            >
              Email:
            </label>
            <input
              id="email"
              type="email"
              className="form-input"
              ref={emailRef}
              required
            />
          </div>
          <div className="password flex flex-col justify-center items-center w-full">
            <label
              htmlFor="password"
              className="form-label after:content-['*'] after:ml-0.5 after:text-red-500"
            >
              Password:
            </label>
            <input
              id="password"
              type="password"
              className="form-input"
              ref={passwordRef}
              required
            />
          </div>
          <div className="passwordConfirm flex flex-col justify-center items-center w-full">
            <label
              htmlFor="passwordConfirm"
              className="form-label after:content-['*'] after:ml-0.5 after:text-red-500"
            >
              Confirm Password:
            </label>
            <input
              id="passwordConfirm"
              type="password"
              className="form-input"
              ref={confirmPasswordRef}
              required
            />
          </div>
          <button
            className="button disabled:opacity-20 disabled:cursor-not-allowed"
            disabled={loading}
          >
            Sign Up
          </button>
        </form>
        <div className="note flex gap-5 text-lg font-medium items-center justify-center">
          <p>Already have an account?</p>
          <Link to="/signin" className="link hover:text-stone-400">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
