import { parse } from "mathjs";
import React, { useEffect } from "react";

const Testemath = () => {
  useEffect(() => {
    const node1 = parse("2");
    const node2 = parse("log(2)");
    const node3 = parse("2/3");
    const node4 = parse("pi");
    const node5 = parse("sqrt(2)+1/2");

    console.log("node1", node1.toTex());
    // console.log("node2", node2);
    // console.log("node3", node3);
    // console.log("node4", node4); 
    // console.log("node5", node5);
    
  }, []);
  return <div>Testemath</div>;
};

export default Testemath;
