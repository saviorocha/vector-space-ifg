import { NextPage } from "next";
import React, { useContext, useEffect } from "react";
import { useListContext } from "../../context";

const TestContextComponent: NextPage = () => {
  const { list, setList } = useListContext();
  useEffect(() => {
    // console.log("TestContextComponent; list[2]: ", list.getAt(2));
    // console.log("Home; list[2]: ", list.getAt(2));
  }, []);

  return (
    <>
      <div>TestContextComponent: </div>
      
    </>
  );
};

export default TestContextComponent;
