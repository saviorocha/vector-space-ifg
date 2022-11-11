import React from "react";
import TutorialContainer from "../../components/pagesections/tutorialPage/TutorialContainer";

const Configs = () => {
  return (
    <TutorialContainer>
      <p>
        Algumas configurações podem ser realizadas clicando sobre o ícone com
        uma engrenagem. Essas configurações são:
      </p>
      <ul>
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
