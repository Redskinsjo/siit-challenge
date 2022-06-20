import React, { Dispatch, SetStateAction } from "react";

import { BsBoxArrowInRight, BsPersonCircle } from "react-icons/bs";
import { MdDashboard } from "react-icons/md";

const Header = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className="h-[49px] w-full shadow-lg flex items-center justify-between">
      <div className="flex items-center">
        <h1 className="mx-4 my-0">Siit</h1>
        <div
          onClick={() => setOpen(true)}
          className="cursor-pointer bg-[#9e6dff] hover:bg-[#040440] hover:text-white h-[26px] w-[26px] flex items-center justify-center border-[1px] border-solid border-black rounded-lg"
        >
          <BsBoxArrowInRight />
        </div>
      </div>
      <div className="flex items-center ">
        <MdDashboard className="icon" />
        <BsPersonCircle className="icon" />
      </div>
    </div>
  );
};
export default Header;
