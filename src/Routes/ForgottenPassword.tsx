import React, { useState, useRef } from "react";
import { BsArrowLeftSquareFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useAuthentication } from "../Contexts/AuthContext";

function ForgottenPassword() {
  const navigate = useNavigate();
  const { resetPassword } = useAuthentication();

  const emailRef = useRef<HTMLInputElement | null>(null);

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    try {
      setMessage("");
      setLoading(true);
      if (emailRef.current?.value !== undefined)
        await resetPassword(emailRef.current?.value);
      setMessage("Instructions to reset your password are in your inbox!");
    } catch {
      setMessage("An error has occurred, can't reset the password.");
    }
    setLoading(false);
  }

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
        {message !== "" && <p>{message}</p>}
        <div className="email flex flex-col justify-center items-center w-full">
          <label htmlFor="email-address" className="text-lg self-start">
            Email:
          </label>
          <input
            type="email"
            id="email-address"
            className="border-2 border-slate-900 rounded-sm px-2 py-1 text-slate-900"
            ref={emailRef}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-stone-200 font-semibold py-1 px-3 rounded-md border-2 border-slate-900 disabled:opacity-20"
          disabled={loading}
          onClick={handleSubmit}
        >
          Reset password
        </button>
      </form>
    </div>
  );
}

export default ForgottenPassword;
