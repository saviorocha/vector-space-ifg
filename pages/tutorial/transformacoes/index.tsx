import Link from "next/link";
import React from "react";
import TutorialContainer from "../../../components/pagesections/tutorialPage/TutorialContainer";
import styles from "../../../styles/modules/pages/tutorial.module.css";

const VectorsTransformations = () => {
  return (
    <TutorialContainer>
      <p>
        No que diz respeito às transformações lineares, duas telas são
        oferecidas pelo VectorSpace:
      </p>
      <ul className={styles.genericlist}>
        <li>
          <Link href="/transformacaolinear/editartransformacoes">
            <a className={styles.link}>Uma tela de criação </a>
          </Link>
          para a criação e manipulação das transformações
        </li>
        <li>
          <Link href="/transformacaolinear/animartransformacoes">
            <a className={styles.link}>Uma tela de animação </a>
          </Link>
          para visualizar a transformação a partir de uma animação gráfica.
        </li>
      </ul>
    </TutorialContainer>
  );
};

export default VectorsTransformations;
