import React from "react";
import TutorialContainer from "../../../components/pagesections/tutorialPage/TutorialContainer";

const Creation = () => {
  return (
    <TutorialContainer>
      <p>
        A (tela de criação de transformações) possui em seu centro um gráfico
        bidimensional que pode ser movimentado e ampliado. Logo abaixo do
        gráfico encontra-se uma seção na qual vetores podem ser inseridos no
        gráfico através de suas coordenadas.
      </p>
      <p>
        Para inserir um vetor você pode escrever, na caixa de entrada, as suas
        coordenadas entre parênteses, do seguinte modo: (x, y). Caso deseje
        criar um vetor com um nome, insira-o do seguinte modo: v_i=(x, y). Para
        editar um vetor criado, clique no ícone com um lápis, ou dê um clique
        duplo em cima de suas coordenadas. Para inserir uma transformação
        linear, clique no botão abaixo e insira os valores de sua matriz de
        transformação. Um novo gráfico será gerado, exibindo o efeito da
        transformação nos vetores inseridos, e uma caixa mostrará a
        transformação criada. Nesta caixa você poderá editar a transformação
        clicando no ícone com um lápis, exluí-la clicando na lixeirinha e mudar
        sua definição clicando no ícone das setinhas girando. O sistema irá
        calcular as imagens dos vetores inseridos com base na matriz de
        transformação. Você pode visualizar esse cálculo passando o mouse em
        cima da imagem de um determinado vetor. Para adicionar uma nova
        transformação a ser aplica após a transformação inserida, clique no
        ícone com um mais, no qual o mesmo processo ocorrerá.
      </p>
      <p>
        À esquerda apresenta-se uma barra de funções. O primeiro botão permite
        movimentar gráfico. O segundo permite adicionar um vetor novo clicando
        no gráfico. O terceiro permite adicionar transformações
        pré-determinadas. O último redireciona para a (página de animação).
      </p>
    </TutorialContainer>
  );
};

export default Creation;
