import React from "react";
import TutorialContainer from "../../components/pagesections/tutorialPage/TutorialContainer";
import styles from "../../styles/modules/pages/tutorial.module.css";
import Image from "next/image";
import configbox from "../../public/images/configbox.png";
import "katex/dist/katex.min.css";
import { InlineMath } from "react-katex";

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
          width={400}
          height={300}
        />
      </div>
      <br />
      <p>Essas configurações possuem as seguintes funções:</p>
      <ul className={styles.genericlist}>
        <li>
          <b>Tema</b>: muda o esquema de cores, para escuro ou claro.
        </li>
        <li>
          <b>Mostrar números do gráfico</b>: controla se aparecem ou não os
          números do gráfico
        </li>
        <li>
          <b>Configurar casas decimais</b>: configura o ponteiro das casas
          decimais a ser apresentado pelo sistema.
        </li>
        <li>
          <b>Incluir vetores canônicos</b>: permite demonstrar como os vetores
          canônicos são transformados.
        </li>
        <li>
          <b>Mostrar Expressões Matemáticas</b>: controla se os valores aparecem
          como expressões matemáticas (como <InlineMath math={"\\pi"} />
          ), ou de forma numérica (como <InlineMath math={"3.14"} />
          ).
        </li>
        <li>
          <b>Alterar cor padrão dos vetores</b>: permite alterar a cor dos
          vetores renderizados.
        </li>
        <li>
          <b>Alterar nome das variáveis das transformações</b>: permite alterar
          o nome das variáveis que aparecem nas definições das transformações
          lineares.
        </li>
      </ul>
    </TutorialContainer>
  );
};

export default Configs;
