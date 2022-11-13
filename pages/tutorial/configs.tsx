import React from "react";
import TutorialContainer from "../../components/pagesections/tutorialPage/TutorialContainer";
import styles from "../../styles/modules/pages/tutorial.module.css";
import Image from "next/image";
import configbox from "../../public/images/configbox.png";

const Configs = () => {
  return (
    <TutorialContainer>
      <p>
        Algumas configurações podem ser realizadas clicando sobre o ícone com
        uma engrenagem no canto superior direito da tela:
      </p>
      <br />
      <div className={styles.imgwrapper}>
        <Image
          src={configbox}
          alt="Janela de configurações"
          width={350}
          height={200}
        />
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
