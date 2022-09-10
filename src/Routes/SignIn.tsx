import React, { useRef, useState } from "react";
// import { signInWithGoogle } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { useAuthentication } from "../Contexts/AuthContext";

const SignIn = () => {
  const navigate = useNavigate();
  const { userSignIn, signInWithGoogle } = useAuthentication();

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const [errormessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    try {
      setErrorMessage("");
      setLoading(true);
      if (
        emailRef.current?.value !== undefined &&
        passwordRef.current?.value !== undefined
      )
        await userSignIn(emailRef.current?.value, passwordRef.current?.value);
      navigate("/dashboard");
    } catch {
      setErrorMessage("An error has occurred, can't log in.");
    }
    setLoading(false);
  }

  async function handleSignIn() {
    try {
      setErrorMessage("");
      setLoading(true);
      await signInWithGoogle();
      navigate("/dashboard");
    } catch (error) {
      setErrorMessage("An error has occurred, can't log in.");
    }
    setLoading(false);
  }

  return (
    <div className="sign-in">
      <h2 className="text-5xl font-bold text-neutral-900 mb-5">Sign In</h2>
      {errormessage !== "" && (
        <p className="text-lg text-red-700">{errormessage}</p>
      )}
      <form className="flex flex-col items-center my-3 gap-3" action="">
        <input
          className="border-2 border-slate-900 rounded-sm px-2 py-1 text-slate-900"
          type="email"
          placeholder="Your Email"
          ref={emailRef}
        />
        <input
          className="border-2 border-slate-900 rounded-sm px-2 py-1 text-slate-900"
          type="password"
          placeholder="Your Password"
          ref={passwordRef}
        />
        <div className="forgot-password">
          <p className="text-lg text-stone-900">Forgot your password?</p>
          <Link
            className="text-xl font-bold text-stone-200 underline decoration-stone-200"
            to={"/forgottenpassword"}
          >
            Reset your password
          </Link>
        </div>
        <button
          className="bg-stone-800 rounded text-white p-2 cursor-pointer"
          type="submit"
          value="Sign In"
          onClick={handleSubmit}
          disabled={loading}
        >
          Sign In
        </button>
      </form>
      <p className="note flex gap-5 text-lg font-medium items-center justify-center">
        Don't have an account?
        <button
          className="text-xl font-bold text-stone-200 underline decoration-stone-200"
          onClick={() => navigate("/signup")}
        >
          Sign Up
        </button>
      </p>
      <button
        onClick={handleSignIn}
        disabled={loading}
        className="bg-stone-600 rounded text-white disabled:text-stone-400 p-2 cursor-pointer disabled:cursor-not-allowed disabled:bg-stone-700"
      >
        Continue with Google
      </button>
    </div>
  );
};

export default SignIn;
