import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthentication } from "../../Contexts/AuthContext";
type Props = {};

const ProfileSettingsPopup = (props: Props) => {
  const { currentUser, profilePic, userSignOut } = useAuthentication();
  const navigate = useNavigate();
  return (
    <div className="profile-info flex flex-col items-center justify-center p-2 rounded-md absolute top-full left-0 -translate-x-2/4 bg-stone-300">
      <img
        className="rounded-full"
        height="90px"
        width="90px"
        src={profilePic}
        alt="profile-img"
      />
      <div className="name-email flex flex-col items-center justify-start m-4">
        <p className="text-center font-semibold text-ellipsis whitespace-nowrap overflow-hidden w-[170px]">
          {currentUser?.displayName}
        </p>
        <p className="text-center">{currentUser?.email}</p>
      </div>
      <hr className="bg-zinc-800 h-[1px] w-full" />
      <button
        className="m-4"
        onClick={async () => {
          await userSignOut();
          navigate("/");
        }}
      >
        Sign Out
      </button>
    </div>
  );
};

export default ProfileSettingsPopup;
