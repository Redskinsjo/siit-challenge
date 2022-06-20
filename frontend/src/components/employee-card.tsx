import React, { SetStateAction, Dispatch } from "react";
import { EmployeeType } from "../types";

const EmployeeCard = ({
  id,
  name,
  avatar_url,
  position,
  last,
  setSelectedService,
}: EmployeeType & {
  last: boolean;
  setSelectedService: Dispatch<SetStateAction<number>>;
}) => {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={last ? "emp-card flex-1" : "emp-card mr-[20px] "}
    >
      <img src={avatar_url} alt={name + id} />
      <h1 className="font-bold text-lg">{name}</h1>
      <h3 className="font-semibold text-sm">{position}</h3>
    </div>
  );
};
export default EmployeeCard;
