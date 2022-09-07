import React from "react";
import { signInWithGoogle } from "../firebase";

const SignIn = () => {
  return (
    <div className="sign-in">
      <h2 className="text-5xl font-medium text-neutral-800 mb-5">Sign In</h2>
      <form className="flex flex-col items-center my-3 gap-3" action="">
        <input
          className="border-2 border-slate-900 rounded-sm px-2 py-1 text-slate-900"
          type="email"
          placeholder="Your Email"
        />
        <input
          className="border-2 border-slate-900 rounded-sm px-2 py-1 text-slate-900"
          type="password"
          placeholder="Your Password"
        />
        <input
          className="bg-stone-800 rounded text-white p-2 cursor-pointer"
          type="submit"
          value="Sign In"
        />
      </form>
      <button
        onClick={signInWithGoogle}
        className="bg-stone-600 rounded text-white p-2 cursor-pointer"
      >
        Continue with Google
      </button>
    </div>
  );
};

export default SignIn;
