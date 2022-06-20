import React, { useState, useEffect } from "react";
import axios from "axios";
import { Drawer } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { AiFillTool } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";

import EmployeeCard from "./components/employee-card";
import { EmployeeType } from "./types";
import Header from "./components/header";

const iconMapped = {
  Employees: BsFillPersonFill,
  Services: AiFillTool,
};

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState<false | { message: string }>(false);
  const [shouldOpenDrawer, setShouldOpenDrawer] = useState(false);
  const [dataType, setDataType] = useState("employees");

  const icon = (el) => React.createElement(el);

  const fetchData = async () => {
    try {
      const res = await axios({
        method: "get",
        url: "http://localhost:3001/users.json",
      });

      if (res.status === 200) {
        setEmployees(res.data);
        setLoading(false);
      }
    } catch (err) {
      setIsError({ message: err.message });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
          <div className="h-full flex justify-center mb-8">
            <div className="flex flex-col h-full bg-slate-50 p-[20px] border-[0.5px] border-solid border-slate-200 my-8">
              <h2 className="underline mt-0">Employees</h2>
              <div className="flex flex-wrap justify-start h-full">
                {!loading &&
                  employees.map((e: EmployeeType) => (
                    <EmployeeCard key={e.id} {...e} />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
