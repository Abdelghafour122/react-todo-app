import React from "react";

const SignUp = () => {
  return (
    <div className="sign-up">
      <h2 className="text-4xl font-medium from-stone-200">Sign Up</h2>
      <form
        action=""
        className="flex flex-col items-center justify-center my-3 mx-auto gap-3 w-max"
      >
        <div className="email flex flex-col justify-center items-center w-full">
          <label htmlFor="email" className="text-lg self-start">
            Email:
          </label>
          <input
            id="email"
            type="email"
            className="border-2 border-slate-900 rounded-sm px-2 py-1 text-slate-900"
          />
        </div>
        <div className="password flex flex-col justify-center items-center w-full">
          <label htmlFor="password" className="text-lg self-start">
            Password:
          </label>
          <input
            id="password"
            type="password"
            className="border-2 border-slate-900 rounded-sm px-2 py-1 text-slate-900"
          />
        </div>
        <div className="passwordConfirm flex flex-col justify-center items-center w-full">
          <label htmlFor="passwordConfirm" className="text-lg self-start">
            Confirm Password:
          </label>
          <input
            id="passwordConfirm"
            type="password"
            className="border-2 border-slate-900 rounded-sm px-2 py-1 text-slate-900"
          />
        </div>
        <button className="bg-stone-200 font-semibold py-1 px-3 rounded-md border-2 border-slate-900">
          Sign Up
        </button>
      </form>
      <div className="note flex gap-5 text-lg font-medium items-center justify-center">
        <p>Already have an account?</p>
        <button className="text-xl font-bold text-stone-200 underline decoration-stone-200">
          Sign In
        </button>
      </div>
    </div>
  );
};

export default SignUp;
