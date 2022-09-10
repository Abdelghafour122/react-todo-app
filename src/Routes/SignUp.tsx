import React, { useRef, useState } from "react";
import { useAuthentication } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";

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
      <h2 className="text-5xl font-bold text-neutral-900">Sign Up</h2>
      {errormessage !== "" && (
        <p className="text-lg text-red-700">{errormessage}</p>
      )}
      <form
        action=""
        className="flex flex-col items-center justify-center my-3 mx-auto gap-3 w-max"
        onSubmit={handleSubmit}
      >
        <div className="email flex flex-col justify-center items-center w-full">
          <label htmlFor="email" className="text-lg self-start">
            Email:
          </label>
          <input
            id="email"
            type="email"
            className="border-2 outline-none border-slate-900 rounded-sm px-2 py-1 text-slate-900"
            ref={emailRef}
            required
          />
        </div>
        <div className="password flex flex-col justify-center items-center w-full">
          <label htmlFor="password" className="text-lg self-start">
            Password:
          </label>
          <input
            id="password"
            type="password"
            className="border-2 outline-none border-slate-900 rounded-sm px-2 py-1 text-slate-900"
            ref={passwordRef}
            required
          />
        </div>
        <div className="passwordConfirm flex flex-col justify-center items-center w-full">
          <label htmlFor="passwordConfirm" className="text-lg self-start">
            Confirm Password:
          </label>
          <input
            id="passwordConfirm"
            type="password"
            className="border-2 outline-none border-slate-900 rounded-sm px-2 py-1 text-slate-900"
            ref={confirmPasswordRef}
            required
          />
        </div>
        <button
          className="bg-stone-200 font-semibold py-1 px-3 rounded-md border-2 border-slate-900 disabled:opacity-20"
          disabled={loading}
        >
          Sign Up
        </button>
      </form>
      <div className="note flex gap-5 text-lg font-medium items-center justify-center">
        <p>Already have an account?</p>
        <button
          className="text-xl font-bold text-stone-200 underline decoration-stone-200"
          onClick={() => navigate("/signin")}
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default SignUp;
