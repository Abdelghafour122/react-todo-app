import React, { useEffect, useState } from "react";
import { useAuthentication } from "../Contexts/AuthContext";
import { Outlet, useNavigate } from "react-router-dom";

import { HiOutlineLightBulb } from "react-icons/hi";
import { FiEdit3 } from "react-icons/fi";
import { MdLabelOutline } from "react-icons/md";
import { BsArchive, BsTrash } from "react-icons/bs";
import ProfileSettingsPopup from "../Components/Dashboard/ProfileSettingsPopup";

type Props = {};

function Dashboard({}: Props) {
  const { currentUser, userSignOut } = useAuthentication();
  const [profilePic, setProfilePic] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  const [openProfilePopup, setOpenProfilePopup] = useState(false);

  useEffect(() => {
    if (currentUser?.photoURL !== null) setProfilePic(currentUser?.photoURL);
    else
      setProfilePic(process.env.PUBLIC_URL + "/Assets/defaultProfilePic.webp");
  }, [currentUser]);

  const navigate = useNavigate();

  const NAV_LINKS = [
    {
      linkName: "Todos",
      icon: HiOutlineLightBulb,
      execute: () => navigate(""),
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
    <div className="dashboard h-full w-full">
      <nav className="py-2 px-0 w-full border-b-[1px] border-b-stone-400">
        <div className="container flex items-center justify-between gap-2">
          <p className="text-3xl text-orange-300 font-sans font-extrabold">
            Dooit
          </p>
          <div className="funcs basis-2/4">
            <ul className="flex items-center justify-center gap-3">
              {NAV_LINKS.map((link, ind) => {
                return (
                  <li
                    key={ind}
                    className="flex flex-col items-center justify-between p-1 border-2 border-stone-300 rounded-lg basis-1/5 cursor-pointer bg-stone-700 hover:shadow-lg active:bg-stone-500"
                    onClick={link.execute}
                  >
                    <link.icon color="rgb(214, 211, 209)" size={"1.5rem"} />
                    <span className="text-stone-300">{link.linkName}</span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="profile relative">
            <button
              className="rounded-full hover:shadow-[0_0_0px_2px_black]"
              onClick={() => setOpenProfilePopup(!openProfilePopup)}
            >
              <img
                className="h-12 rounded-full"
                src={profilePic}
                alt="profile-img"
              />
            </button>
            {openProfilePopup === true && <ProfileSettingsPopup />}
          </div>
        </div>
      </nav>
      <div className="dashboard-body">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
