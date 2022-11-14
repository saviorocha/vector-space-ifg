import { Tooltip } from "@mui/material";
import Link from "next/link";
import { CornerUpLeft } from "react-feather";
import styles from "../../../styles/modules/pages/editpage.module.css";
import D3PlotAnimation from "../../d3/D3plotAnimation";
import ConfigPopup from "../../ui/inputs/ConfigPopup";

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
      <section id={styles.return} className="absolute top-5 left-5">
        <Tooltip title="Voltar para criação de transformações">
          <Link href="/transformacaolinear/editartransformacoes">
            <a id={styles.returnbtn}>
              <CornerUpLeft size={35} />
            </a>
          </Link>
        </Tooltip>
      </section>
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
      <section>
        <ConfigPopup />
      </section>
    </main>
  );
};

export default MainSectionAnimationPage;
