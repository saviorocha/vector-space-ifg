import { useRouter } from "next/router";
import React from "react";
import { CornerUpLeft } from "react-feather";
import styles from "../../../styles/modules/editpage.module.css";
import D3PlotAnimation from "../../d3/D3plotAnimation";

const MainSectionAnimationPage = () => {

  return (
    <main
      // className="
      //   mx-auto absolute h-3/4 right-0
      //   flex justify-center items-center
      // "
      className="mx-auto ml-40"
      id={styles.main}
    >
      <section
        id={styles.middlesection}
        // className="h-full flex items-center justify-center"
        className="
          relative gap-1 overflow-hidden
          flex items-center justify-center flex-col 
        "
      >
        <D3PlotAnimation />
      </section>
    </main>
  );
};

export default MainSectionAnimationPage;
