import Link from "next/link";
import React from "react";
import TutorialContainer from "../../../components/pagesections/tutorialPage/TutorialContainer";
import styles from "../../../styles/modules/pages/tutorial.module.css";

const Animation = () => {
  return (
    <TutorialContainer>
      <p>
        Na{" "}
        <Link href="/transformacaolinear/animartransformacoes">
          <a className={styles.link}>tela de animação das transformações</a>
        </Link>{" "}
        é possível obser ao centro um plano de coordenadas bidimensionais
        contendo os vetores previamente adicionados na
        <Link href="/tutorial/transformacoes/criacao">
          <a className={styles.link}> tela de criação das transformações</a>
        </Link>
        . Essa página realiza uma representação visual do efeito da
        transformação nos vetores através de uma animação, na qual os vetores
        são deslocados de acordo com a transformação aplicada.
      </p>
      <div
        style={{
          width: "200px",
          height: "200px",
          border: "1px solid gray",
          margin: "0 auto",
        }}
      >
        *imagem*
      </div>
      <p>
        Abaixo do plano de coordenadas é possível encontrar três botões e uma
        barra de progresso. O primeiro botão retorna à tela de criação de
        transformações. O segundo botão reinicia a animação. O terceiro botão
        inicia/pausa a animação dos vetores.
      </p>
      <div
        style={{
          width: "200px",
          height: "200px",
          border: "1px solid gray",
          margin: "0 auto",
        }}
      >
        *imagem*
      </div>
    </TutorialContainer>
  );
};

export default Animation;
