import React, { useState, useEffect } from "react";
import axios from "axios";

import EmployeeCard from "./components/employee-card";
import { EmployeeType } from "./types";

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState<false | { message: string }>(false);

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
  console.log(employees);
  if (isError) return <div>{isError.message}</div>;

  return (
    <div className="h-full">
      <div className="h-[300px] flex flex-wrap justify-center my-[12px]">
        {!loading &&
          employees.map((e: EmployeeType) => (
            <EmployeeCard key={e.id} {...e} />
          ))}
      </div>
    </div>
  );
};

export default App;
