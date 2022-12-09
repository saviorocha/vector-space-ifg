import { Tooltip } from "@mui/material";
import Link from "next/link";
import { CornerUpLeft } from "react-feather";
import styles from "../../../styles/modules/pages/animation.module.css";
import logostyles from "../../../styles/modules/pages/editartransformacoes.module.css"
import D3PlotAnimation from "../../d3/D3plotAnimation";
import Logo from "../../icons/Logo";
import ConfigPopup from "../../ui/inputs/ConfigPopup";

const MainSectionAnimationPage = () => {
  return (
    <main className="mx-auto" id={styles.main}>
      <Link href="/">
        <a className={logostyles.logo}>
          <Logo className={logostyles.headerlogo} />
          <p className={logostyles.logotext}>VectorSpace</p>
        </a>
      </Link>
      <section
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
      <section id={styles.return} className="absolute top-16 right-5 z-10">
        <Tooltip title="Voltar para criação de transformações">
          <Link href="/transformacaolinear/editartransformacoes">
            <a id={styles.returnbtn}>
              <CornerUpLeft size={35} />
            </a>
          </Link>
        </Tooltip>
      </section>
    </main>
  );
};

export default MainSectionAnimationPage;
