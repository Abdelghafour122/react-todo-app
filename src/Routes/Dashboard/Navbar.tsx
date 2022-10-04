import React, { useState, useEffect } from "react";
import { HiOutlineLightBulb } from "react-icons/hi";
import { FiEdit3 } from "react-icons/fi";
import { BiPowerOff } from "react-icons/bi";
import { MdLabelOutline } from "react-icons/md";
import { BsArchive, BsTrash } from "react-icons/bs";
import { MdOutlineDoneOutline } from "react-icons/md";
import ProfileSettingsPopup from "../../Components/Dashboard/ProfileSettingsPopup";

import { useNavigate } from "react-router-dom";

import { useAuthentication } from "../../Contexts/AuthContext";
import Tooltip from "./Navbar/Tooltip";

type Props = {};

const Navbar = (props: Props) => {
  const { currentUser, userSignOut } = useAuthentication();
  const [profilePic, setProfilePic] = useState<string | undefined>();
  const [openProfilePopup, setOpenProfilePopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser?.photoURL !== null) setProfilePic(currentUser?.photoURL);
    else
      setProfilePic(process.env.PUBLIC_URL + "/Assets/defaultProfilePic.webp");
  }, [currentUser]);

  const NAV_LINKS = [
    {
      linkName: "Todos",
      icon: HiOutlineLightBulb,
      execute: () => navigate(""),
    },
    {
      linkName: "Finished",
      icon: MdOutlineDoneOutline,
      execute: () => navigate("finished"),
    },
    {
      linkName: "Labels",
      icon: MdLabelOutline,
      execute: () => console.log("labels"),
    },
    {
      linkName: "Edit Labels",
      icon: FiEdit3,
      execute: () => console.log("Edit Labels"),
    },
    {
      linkName: "Archived",
      icon: BsArchive,
      execute: () => navigate("archived"),
    },
    { linkName: "Trash", icon: BsTrash, execute: () => navigate("trash") },
  ];

  return (
    <nav className="py-2 px-2 h-full bg-stone-900">
      <div className="flex flex-col items-center justify-start gap-2">
        <p className="text-2xl text-orange-300 font-sans font-extrabold border-b-2 border-b-stone-500">
          Dooit
        </p>
        <div className="funcs">
          <ul className="flex flex-col items-center justify-center gap-3">
            {NAV_LINKS.map((link, ind) => {
              return (
                <li key={ind} className="relative group">
                  <button
                    className="p-3 bg-stone-700 transition-all rounded-[50%] duration-150 ease-linear hover:rounded-[10px] hover:bg-stone-600 active:bg-stone-500 focus:bg-stone-400 focus:rounded-[10px]"
                    onClick={link.execute}
                  >
                    <link.icon color="rgb(253 186 116)" size={"1.7rem"} />
                  </button>
                  <Tooltip tooltipContent={link.linkName} />
                </li>
              );
            })}
          </ul>
        </div>
        <div className="profile relative mt-2">
          <button
            className="transition-all rounded-[50%] duration-200 ease-linear hover:rounded-[10px] overflow-hidden"
            onClick={() => setOpenProfilePopup(!openProfilePopup)}
          >
            <img className="h-12 " src={profilePic} alt="profile-img" />
          </button>
          {openProfilePopup === true && <ProfileSettingsPopup />}
        </div>
        <button
          className="p-3 bg-stone-700 transition-all rounded-[50%] duration-150 ease-linear hover:rounded-[10px] hover:bg-stone-600 active:bg-stone-500 absolute bottom-2 group"
          onClick={userSignOut}
        >
          <BiPowerOff size={"1.7rem"} color={"red"} />
          <Tooltip tooltipContent={"Sign out"} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
