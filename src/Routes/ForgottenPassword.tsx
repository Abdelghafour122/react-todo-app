import React from "react";
import { BsArrowLeftSquareFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
type Props = {};

function ForgottenPassword({}: Props) {
  const navigate = useNavigate();
  return (
    <div className="forgotten-password">
      <button
        className="flex items-center justify-center gap-2 text-lg"
        onClick={() => navigate(-1)}
      >
        <BsArrowLeftSquareFill size="2em" />
        Go Back
      </button>
      <form
        className="flex flex-col items-center justify-center my-3 mx-auto gap-3 w-max"
        action=""
      >
        <div className="email flex flex-col justify-center items-center w-full">
          <label htmlFor="email-address" className="text-lg self-start">
            Email:
          </label>
          <input
            type="email"
            id="email-address"
            className="border-2 border-slate-900 rounded-sm px-2 py-1 text-slate-900"
            required
          />
        </div>

        <div className="new-pass flex flex-col justify-center items-center w-full">
          <label htmlFor="new-password" className="text-lg self-start">
            New password:
          </label>
          <input
            type="password"
            id="new-password"
            className="border-2 border-slate-900 rounded-sm px-2 py-1 text-slate-900"
            required
          />
        </div>

        <div className="pass-confirm flex flex-col justify-center items-center w-full">
          <label htmlFor="confirm-password" className="text-lg self-start">
            Confirm your password:
          </label>
          <input
            type="password"
            id="confirm-password"
            className="border-2 border-slate-900 rounded-sm px-2 py-1 text-slate-900"
            required
          />
        </div>

        <button type="submit">Reset password</button>
      </form>
    </div>
  );
}

export default ForgottenPassword;
