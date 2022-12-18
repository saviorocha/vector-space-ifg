import Image from "next/image";
import Link from "next/link";
import React from "react";
import TutorialContainer from "../../../components/pagesections/tutorialPage/TutorialContainer";
import styles from "../../../styles/modules/pages/tutorial.module.css";
import animationplane from "../../../public/images/animationplane.gif";
import animationbar from "../../../public/images/animationbar.png";
import trnplay from "../../../public/images/trnplay.png";

const Animation = () => {
  return (
    <TutorialContainer>
      <p>
        A{" "}
        <Link href="/transformacaolinear/animartransformacoes">
          <a className={styles.link}>tela de animação das transformações</a>
        </Link>{" "}
        pode ser acessada pela página inicial, ou através do botão{" "}
        <b>Executar Transformações</b>.
      </p>
      <div className={styles.imgwrapper}>
        <Image
          src={trnplay}
          alt="Botão Executar Transformações"
          width={400}
          height={50}
        />
      </div>
      <p>
        Nessa tela, é possível observar ao centro um plano de coordenadas
        bidimensionais contendo os vetores previamente adicionados na
        <Link href="/tutorial/transformacoes/criacaotransformacao">
          <a className={styles.link}> tela de criação das transformações</a>
        </Link>
        . É realizada uma representação visual do efeito da transformação nos
        vetores através de uma animação, na qual os vetores são deslocados de
        acordo com a transformação aplicada.
      </p>
      <div className={styles.imgwrapper}>
        <Image
          src={animationplane}
          alt="Animação do plano"
          width={360}
          height={320}
        />
      </div>
      <p>
        Abaixo do plano de coordenadas é possível encontrar uma barra de
        progresso da animação. O primeiro botão dessa barra reinicia a animação, ao passo
        que o botão ao seu lado inicia/pausa a animação dos vetores.
      </p>
      <div className={styles.imgwrapper}>
        <Image
          src={animationbar}
          alt="Barra de funções de animação"
          width={500}
          height={50}
        />
      </div>
    </TutorialContainer>
  );
};

export default Animation;
