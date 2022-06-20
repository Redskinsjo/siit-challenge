import React from "react";
import { EmployeeType } from "../types";

const EmployeeCard = ({
  id,
  name,
  avatar_url,
  position,
  service_ids,
}: EmployeeType) => {
  return (
    <div className="h-[200px] w-[180px] flex flex-col items-center bg-slate-100 mr-[20px] my-4 hover:bg-slate-200 border-[1px] border-solid border-slate-200">
      <img src={avatar_url} alt={name + id} />
      <h1 className="font-bold text-lg">{name}</h1>
      <h3 className="font-semibold text-sm">{position}</h3>
    </div>
  );
};
export default EmployeeCard;
