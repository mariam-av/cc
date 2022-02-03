import React, { useState, useEffect } from "react";
import useFetch from "./customHooks/useFetch";
import { toDateTime } from "./utils";

const Info = () => {
  let api = useFetch();
  const [info, setInfo] = useState({});

  useEffect(() => {
    (async () => {
      //   const { data } = await api(`/info`);
      //   const result = data;
      let info = { totalTime: 9945, avgSubmitTime: 5412, totalSessiosCount: 3 };
      setInfo(info);
    })();
  }, []);

  return (
    <>
      <h1>
        User spend time: {info.totalTime ? toDateTime(info.totalTime) : 0}
      </h1>
      <h1>Average Submission time: {toDateTime(info.avgSubmitTime)} </h1>
      <h1>
        Average Session time:
        {toDateTime(info.totalTime / info.totalSessiosCount)}
      </h1>
    </>
  );
};

export default Info;
