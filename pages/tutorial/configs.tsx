import React from "react";
import TutorialContainer from "../../components/pagesections/tutorialPage/TutorialContainer";
import styles from "../../styles/modules/pages/tutorial.module.css";

const Configs = () => {
  return (
    <TutorialContainer>
      <p>
        Algumas configurações podem ser realizadas clicando sobre o ícone com
        uma engrenagem.
      </p>
      <br />
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
      <br />
      <p>Essas configurações possuem as seguintes funções:</p>
      <ul className={styles.genericlist}>
        <li>Tema: muda o esquema de cores, para escuro ou claro.</li>
        <li>
          Mostrar números do gráfico: controla se aparecem ou não os números do
          gráfico
        </li>
        <li>
          Configurar casas decimais: configura o ponteiro das casas decimais a
          ser apresentado pelo sistema.
        </li>
        <li>
          Incluir vetores canônicos: permite demonstrar como os vetores
          canônicos são transformados.
        </li>
      </ul>
    </TutorialContainer>
  );
};

export default Configs;
