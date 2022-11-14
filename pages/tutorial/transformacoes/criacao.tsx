import Image from "next/image";
import Link from "next/link";
import React from "react";
import TutorialContainer from "../../../components/pagesections/tutorialPage/TutorialContainer";
import styles from "../../../styles/modules/pages/tutorial.module.css";
import plot from "../../../public/images/tutorial-plot.png";
import vectorinsertion from "../../../public/images/vectorinsertion.png";
import vectorinsertionname from "../../../public/images/vectorinsertion2.png";
import trnbtn from "../../../public/images/tst1.png";
import trnbtn2 from "../../../public/images/tst2.png";
import transformationplots from "../../../public/images/transformationplots.png";
import transformationplots2 from "../../../public/images/transformationplots2.png";
import transformationbox from "../../../public/images/transformationbox.png";
import calchover from "../../../public/images/calchover.png";
import sidebar from "../../../public/images/sidebar.png";

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
      <div className={styles.imgwrapper}>
        <Image src={plot} alt="Plano de coordenadas" width={350} height={500} />
      </div>
      <p>
        Um vetor pode ser inserido escrevendo as suas coordenadas entre
        parênteses na caixa de entrada e apertando a tecla enter, ou clicando no
        botão com um mais:
      </p>
      <div className={styles.imgwrapper}>
        <Image
          src={vectorinsertion}
          alt="Criação de um vetor"
          width={440}
          height={170}
        />
      </div>
      <p>
        Caso se deseje criar um vetor com um nome, insira-o do seguinte modo:
      </p>
      <div className={styles.imgwrapper}>
        <Image
          src={vectorinsertionname}
          alt="Criação de um vetor com nome customizado"
          width={440}
          height={170}
        />
      </div>
      <p>
        Para editar um vetor criado, clique no botão com um lápis, ou dê um
        clique duplo em cima de suas coordenadas. Para excluí-lo clique na
        lixeirinha.
      </p>
      <br />
      <p>
        Para adicionar uma transformação linear, clique no botão escrito{" "}
        <b>Adicionar Transformação Linear</b>, localizado abaixo da caixa de
        inserção dos vetores, e insira os valores de sua matriz de
        transformação.
      </p>
      <div className={styles.imgwrapper}>
        <Image
          src={trnbtn}
          alt="Botão para adição de uma transformação"
          width={145}
          height={120}
        />
        <Image
          src={trnbtn2}
          alt="Botão para adição de uma transformação"
          width={145}
          height={120}
        />
      </div>
      <p>
        Um novo gráfico será gerado, exibindo o efeito da transformação nos
        vetores inseridos, com uma caixa contendo a definição da transformação
        criada e alguns botões.
      </p>
      <div className={styles.imgwrapper}>
        <Image
          src={transformationplots}
          alt="Visualização de uma transformação"
          width={800}
          height={400}
        />
      </div>
      <p>
        Nesta caixa pode-se editar a transformação clicando no botão
        superior esquerdo, mudar sua definição clicando no botão superior
        direito ou excluí-la clicando no botão inferior direito.
      </p>
      <div className={styles.imgwrapper}>
        <Image
          src={transformationbox}
          alt="Caixa contendo a transformação"
          width={300}
          height={150}
        />
      </div>
      <p>
        É possível também adicionar mais uma transformação ao clicar no botão
        inferior esquerdo e inserir os dados de sua matriz de transformação.
        Essa nova transformação será aplicada sobre as imagens dos vetores da
        transformação anterior.
      </p>
      <div className={styles.imgwrapper}>
        <Image
          src={transformationplots2}
          alt="Visualização de duas transformações"
          width={900}
          height={300}
        />
      </div>
      <p>
        O sistema irá calcular as imagens dos vetores inseridos com base na
        matriz de transformação. Você pode visualizar esse cálculo passando o
        mouse em cima da imagem de um determinado vetor.
      </p>
      <div className={styles.imgwrapper}>
        <Image
          src={calchover}
          alt="Cálculo com base na matriz de transformação"
          width={350}
          height={150}
        />
      </div>
      <br />
      <h1 className={styles.heading}>Barra de Funções</h1>
      <p>À esquerda apresenta-se uma barra de funções com três botões:</p>
      <div className={styles.imgwrapper}>
        <Image
          src={sidebar}
          alt="Barra de funções"
          width={260}
          height={320}
        />
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
