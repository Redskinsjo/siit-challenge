import React, { useState, useEffect, Suspense } from "react";
import axios from "axios";
import { Drawer } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { AiFillTool } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";

import Header from "./components/header";
import { EmployeeType, ServiceType } from "./types";

const RenderCards = React.lazy(() => import("./components/render-cards"));

const iconMapped = {
  Employees: BsFillPersonFill,
  Services: AiFillTool,
};

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [services, setServices] = useState([]);
  const [isError, setIsError] = useState<false | { message: string }>(false);
  const [shouldOpenDrawer, setShouldOpenDrawer] = useState(false);
  const [dataType, setDataType] = useState<"employees" | "services">(
    "employees"
  );
  const [selectedService, setSelectedService] = useState(0);

  const icon = (el) => React.createElement(el);

  const fetchEmployees = async () => {
    try {
      const res = await axios({
        method: "get",
        url: "http://localhost:3001/users.json",
      });

      if (res.status === 200) {
        setEmployees(res.data);
      }
    } catch (err) {
      setIsError({ message: err.message });
    }
  };
  const fetchServices = async () => {
    try {
      const res = await axios({
        method: "get",
        url: "http://localhost:3001/services.json",
      });

      if (res.status === 200) {
        setServices(res.data);
      }
    } catch (err) {
      setIsError({ message: err.message });
    }
  };

  const fetchData = () => {
    fetchEmployees();
    fetchServices();
  };

  useEffect(() => {
    if (employees.length === 0 || services.length === 0) fetchData();
    if (selectedService) fetchEmployees();
  }, [selectedService]);

  const drawer = (
    <div>
      <List>
        {["Employees", "Services"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              className={`${
                dataType === text.toLowerCase()
                  ? "group bg-[#040440] text-white mx-4 hover:text-[#040440] rounded-lg mb-2"
                  : "mx-4 rounded-lg mb-2"
              }`}
            >
              <ListItemIcon
                className={`${
                  dataType === text.toLowerCase() &&
                  "text-white group-hover:text-[#040440]"
                }`}
              >
                {icon(iconMapped[text])}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  if (isError) return <div>{isError.message}</div>;

  return (
    <div className="h-full w-full">
      <div className="flex flex-col h-full">
        <Header open={shouldOpenDrawer} setOpen={setShouldOpenDrawer} />
        <div className="flex-1 flex h-full flex justify-center">
          <div className="h-full">
            {shouldOpenDrawer && (
              <Drawer
                anchor="left"
                open={shouldOpenDrawer}
                onClick={() => setShouldOpenDrawer(false)}
              >
                {drawer}
              </Drawer>
            )}
          </div>
          <div className="flex">
            <Suspense fallback={<div>Chargement...</div>}>
              <RenderCards
                data={
                  selectedService > 0
                    ? employees.filter((e: EmployeeType) =>
                        e.service_ids.includes(selectedService)
                      )
                    : employees
                }
                setSelectedService={setSelectedService}
                type="emp"
                setDataType={setDataType}
                dataType={dataType}
              />
              <div className="w-[12px]" />
              <RenderCards
                data={services}
                setSelectedService={setSelectedService}
                type="serv"
                setDataType={setDataType}
                dataType={dataType}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
