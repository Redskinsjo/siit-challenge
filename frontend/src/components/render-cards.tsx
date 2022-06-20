import React, { Dispatch, SetStateAction } from "react";

import { EmployeeType, ServiceType } from "../types";
import EmployeeCard from "./employee-card";
import ServiceCard from "./service-card";

const RenderCards = ({
  data,
  setSelectedService,
  type,
  setDataType,
  dataType,
}: {
  data: EmployeeType[] | ServiceType[];
  setSelectedService: Dispatch<SetStateAction<number>>;
  type: "emp" | "serv";
  setDataType: Dispatch<SetStateAction<"employees" | "services">>;
  dataType: "employees" | "services";
}) => {
  return (
    <div
      onClick={() => {
        setDataType(type === "emp" ? "employees" : "services");
      }}
      className={
        type === "emp" && dataType === "employees"
          ? "render-employees bg-[#9e6dff]"
          : type === "emp"
          ? "render-employees hover:bg-slate-200"
          : type === "serv" && dataType === "services"
          ? "render-services bg-[#9e6dff]"
          : "render-services hover:bg-slate-200"
      }
    >
      <div className="flex flex-col w-full h-full bg-slate-50 p-[20px] border-[0.5px] border-solid border-slate-200 my-8">
        <h2 className="underline mt-0">
          {type === "emp" ? "Employees" : "Services"}
        </h2>
        <div className="flex flex-wrap justify-start h-full">
          {data.map((e: EmployeeType | ServiceType, i: number) => {
            if ("service_ids" in e) {
              return (
                <EmployeeCard
                  key={e.id}
                  {...e}
                  last={i === 3}
                  setSelectedService={setSelectedService}
                />
              );
            } else {
              return (
                <ServiceCard
                  key={e.id}
                  {...e}
                  users={3}
                  last={i === 4}
                  setSelectedService={setSelectedService}
                />
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};
export default RenderCards;
