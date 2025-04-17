import React, { useEffect, useState } from "react";
import { getData } from "../services/api.services";
const Home = () => {
  const [data, setData] = useState(null);
  const fetchData = async () => {
    try {
      const res = await getData();
      if (res.status === 200) {
        const temp = await res.json();
        setData(temp);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(data);
  useEffect(() => {
    fetchData();
  }, []);
  return <div>Home</div>;
};

export default Home;
