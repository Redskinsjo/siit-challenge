import React, { SetStateAction, Dispatch } from "react";
import { ServiceType } from "../types";
import { AiOutlineLink } from "react-icons/ai";
import e from "cors";

const ServiceCard = ({
  id,
  name,
  website_url,
  logo_url,
  price,
  users,
  last,
  setSelectedService,
}: ServiceType & {
  users: number;
  last: boolean;
  setSelectedService: Dispatch<SetStateAction<number>>;
}) => {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        setSelectedService(id);
      }}
      className={last ? "serv-card  flex-1 " : "serv-card mr-[20px]"}
    >
      <img src={logo_url} alt={name + id} className="w-[64px] min-h-[64px]" />
      <h1 className="font-bold text-lg">{name}</h1>
      <h3 className="font-semibold text-sm">
        <span className="text-[9px] font-medium">$/user</span>
      </h3>
      <a
        href={website_url}
        target="_blank"
        className="no-underline text-slate-600"
      >
        <AiOutlineLink className="font-semibold text-sm hover:text-[#9e6dff] text-[22px]" />
      </a>
    </div>
  );
};
export default ServiceCard;
