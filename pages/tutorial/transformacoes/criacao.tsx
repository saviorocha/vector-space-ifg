import Link from "next/link";
import React from "react";
import TutorialContainer from "../../../components/pagesections/tutorialPage/TutorialContainer";
import styles from "../../../styles/modules/pages/tutorial.module.css";

const Creation = () => {
  return (
    <TutorialContainer>
      <h1 className={styles.heading}>Criando Vetores e Transformações</h1>
      <p>
        Na
        <Link href="/transformacaolinear/editartransformacoes">
          <a className={styles.link}> tela de criação de transformações </a>
        </Link>
        é possível observar no centro um plano de coordenadas bidimensionais,
        que pode ser movimentado e ampliado. Logo abaixo desse plano encontra-se
        uma seção na qual vetores podem ser inseridos no gráfico através de suas
        coordenadas.
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
        Um vetor pode ser inserido escrevendo as suas coordenadas entre
        parênteses na caixa de entrada, da seguinte forma: (x, y). Caso se
        deseje criar um vetor com um nome, insira-o do seguinte modo: v_i=(x,
        y).
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
        Para editar um vetor criado, clique no ícone com um lápis, ou dê um
        clique duplo em cima de suas coordenadas.
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
        Para adicionar uma transformação linear, clique no botão escrito
        <b>Adicionar Transformação Linear</b> e insira os valores de sua matriz
        de transformação. Um novo gráfico será gerado, exibindo o efeito da
        transformação nos vetores inseridos, com uma caixa contendo a definição
        da transformação criada e alguns botões.
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
        Nesta caixa você pode-se editar a transformação clicando no botão
        superior esquerdo, mudar sua definição clicando no botão superior
        direito ou excluí-la clicando no botão inferior direito.
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
        É possível também adicionar mais uma transformação ao clicar no botão
        inferior esquerdo e inserir os dados de sua matriz de transformação.
        Essa nova transformação será aplicada sobre as imagens dos vetores da
        transformação anterior.
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
        O sistema irá calcular as imagens dos vetores inseridos com base na
        matriz de transformação. Você pode visualizar esse cálculo passando o
        mouse em cima da imagem de um determinado vetor. Uma nova transformação
        pode ser ainda inserida clicando no ícone com um mais.
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
      <br />
      <h1 className={styles.heading}>Barra de Funções</h1>
      <p>À esquerda apresenta-se uma barra de funções com três botões:</p>
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
        Ao clicar no primeiro botão é possível adicionar um vetor novo clicando
        no plano. O segundo botão permite adicionar automáticamente algumas
        transformações pré-determinadas. O último botão redireciona para a
        página que cria a animação do efeito da(s) transformações criadas.
      </p>
    </TutorialContainer>
  );
};

export default Creation;
