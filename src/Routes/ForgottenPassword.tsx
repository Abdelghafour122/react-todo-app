import React from "react";

type Props = {};

function ForgottenPassword({}: Props) {
  return (
    <div className="forgotten-password">
      <form
        className="flex flex-col items-center justify-center my-3 mx-auto gap-3 w-max"
        action=""
      >
        <div className="email flex flex-col justify-center items-center w-full">
          <label htmlFor="email-address" className="text-lg self-start">
            Email:
          </label>
          <input type="email" id="email-address" required />
        </div>

        <div className="new-pass flex flex-col justify-center items-center w-full">
          <label htmlFor="new-password" className="text-lg self-start">
            New password:
          </label>
          <input type="password" id="new-password" required />
        </div>

        <div className="pass-confirm flex flex-col justify-center items-center w-full">
          <label htmlFor="confirm-password" className="text-lg self-start">
            Confirm your password:
          </label>
          <input type="password" id="confirm-password" required />
        </div>

        <button type="submit">Reset password</button>
      </form>
    </div>
  );
}

export default ForgottenPassword;
