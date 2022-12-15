import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
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
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { evaluate } from "mathjs";

const Creation = () => {
  useEffect(() => {
    // console.log("eval", evaluate("log(1,1)"));
  }, []);
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
        A tabela a seguir ilustra os comandos que podem ser utilizados para se
        criar uma dada expressão matemática como coordenadas do vetor:
      </p>
      <table id={styles.commandtable}>
        <tr>
          <td className={styles.tableitems}>
            <strong>Tipo de Expressão</strong>
          </td>
          <td className={styles.tableitems}>
            <strong>Exemplo</strong>
          </td>
          <td className={styles.tableitems}>
            <strong>Comando</strong>
          </td>
        </tr>
        <tr>
          <td className={styles.tableitems}>Fração</td>
          <td className={styles.tableitems}>
            <InlineMath math={String.raw`\frac{1}{2}`} />
          </td>
          <td className={styles.tableitems}>1/2</td>
        </tr>
        <tr>
          <td className={styles.tableitems}>Fatorial</td>
          <td className={styles.tableitems}>
            <InlineMath math={String.raw`3!`} />
          </td>
          <td className={styles.tableitems}>3!</td>
        </tr>
        <tr>
          <td className={styles.tableitems}>Módulo</td>
          <td className={styles.tableitems}>
            <InlineMath math={String.raw`\left|-1\right|`} />
          </td>
          <td className={styles.tableitems}>abs(-1)</td>
        </tr>
        <tr>
          <td className={styles.tableitems}>Raíz Quadrada</td>
          <td className={styles.tableitems}>
            <InlineMath math={String.raw`\sqrt{2}`} />
          </td>
          <td className={styles.tableitems}>sqrt(2)</td>
        </tr>
        <tr>
          <td className={styles.tableitems}>Raíz Cúbica</td>
          <td className={styles.tableitems}>
            <InlineMath math={String.raw`\sqrt[3]{27}`} />
          </td>
          <td className={styles.tableitems}>cbrt(27)</td>
        </tr>
        <tr>
          <td className={styles.tableitems}>Raíz Enésima</td>
          <td className={styles.tableitems}>
            <InlineMath math={String.raw`\sqrt[5]{32}`} />
          </td>
          <td className={styles.tableitems}>nthRoot(32,5)</td>
        </tr>
        <tr>
          <td className={styles.tableitems}>Logaritmo</td>
          <td className={styles.tableitems}>
            <InlineMath math={String.raw`\log_{2}\left(4\right)`} />
          </td>
          <td className={styles.tableitems}>log(4, 2)</td>
        </tr>
        <tr>
          <td className={styles.tableitems}>Logaritmo de Base 2</td>
          <td className={styles.tableitems}>
            <InlineMath math={String.raw`\log_{2}\left(4\right)`} />
          </td>
          <td className={styles.tableitems}>log2(4)</td>
        </tr>
        <tr>
          <td className={styles.tableitems}>Logaritmo de Base 10</td>
          <td className={styles.tableitems}>
            <InlineMath math={String.raw`\log_{10}\left(10000\right)`} />
          </td>
          <td className={styles.tableitems}>log10(10000)</td>
        </tr>
        <tr>
          <td className={styles.tableitems}>Logaritmo Base Natural</td>
          <td className={styles.tableitems}>
            <InlineMath math={String.raw`\ln\left(2\right)`} />
          </td>
          <td className={styles.tableitems}>log(2)</td>
        </tr>
        <tr>
          <td className={styles.tableitems}>Potência</td>
          <td className={styles.tableitems}>
            <InlineMath math={String.raw`{3}^{2}`} />
          </td>
          <td className={styles.tableitems}>3^2 ou pow(3,2)</td>
        </tr>
        <tr>
          <td className={styles.tableitems}>Seno</td>
          <td className={styles.tableitems}>
            <InlineMath math={String.raw`\sin\left(2\right)`} />
          </td>
          <td className={styles.tableitems}>sin(2)</td>
        </tr>
        <tr>
          <td className={styles.tableitems}>Cosseno</td>
          <td className={styles.tableitems}>
            <InlineMath
              math={String.raw`\cos\left(\left(\left(180\right)  ^\circ\right)\right)`}
            />
          </td>
          <td className={styles.tableitems}>cos(unit(180, deg))</td>
        </tr>
        <tr>
          <td className={styles.tableitems}>Tangente</td>
          <td className={styles.tableitems}>
            <InlineMath math={String.raw`\tan\left(\frac{\pi}{4}\right)`} />
          </td>
          <td className={styles.tableitems}>tan(pi/4)</td>
        </tr>
        <tr>
          <td className={styles.tableitems}>Inversa do Seno</td>
          <td className={styles.tableitems}>
            <InlineMath math={String.raw`\sin^{-1}\left(2\right)`} />
          </td>
          <td className={styles.tableitems}>asin(2)</td>
        </tr>
        <tr>
          <td className={styles.tableitems}>Inversa do Cosseno</td>
          <td className={styles.tableitems}>
            <InlineMath math={String.raw`\cos^{-1}\left(2\right)`} />
          </td>
          <td className={styles.tableitems}>acos(2)</td>
        </tr>
        <tr>
          <td className={styles.tableitems}>Inversa da Tangente</td>
          <td className={styles.tableitems}>
            <InlineMath math={String.raw`\tan^{-1}\left(\tan\left(1.5\right)\right)`} />
          </td>
          <td className={styles.tableitems}>atan(tan(1.5))</td>
        </tr>
        <tr>
          <td className={styles.tableitems}>Secante</td>
          <td className={styles.tableitems}>
            <InlineMath math={String.raw`\sec\left(2\right)`} />
          </td>
          <td className={styles.tableitems}>sec(3)</td>
        </tr>
        <tr>
          <td className={styles.tableitems}>Cotangente</td>
          <td className={styles.tableitems}>
            <InlineMath math={String.raw`\cot\left(\frac{1}{2}\right)`} />
          </td>
          <td className={styles.tableitems}>cot(1/2)</td>
        </tr>
        <tr>
          <td className={styles.tableitems}>Cosecante</td>
          <td className={styles.tableitems}>
            <InlineMath math={String.raw`\csc\left(2\right)`} />
          </td>
          <td className={styles.tableitems}>csc(2)</td>
        </tr>
        <tr>
          <td className={styles.tableitems}>Inverso da Secante</td>
          <td className={styles.tableitems}>
            <InlineMath math={String.raw`\sec^{-1}\left(2\right)`} />
          </td>
          <td className={styles.tableitems}>asec(5)</td>
        </tr>
        <tr>
          <td className={styles.tableitems}>Inverso da Cotangente</td>
          <td className={styles.tableitems}>
            <InlineMath math={String.raw`\cot^{-1}\left(2\right)`} />
          </td>
          <td className={styles.tableitems}>acot(2)</td>
        </tr>
        <tr>
          <td className={styles.tableitems}>Pi</td>
          <td className={styles.tableitems}>
            <InlineMath math={String.raw`\pi`} />
          </td>
          <td className={styles.tableitems}>pi</td>
        </tr>
        <tr>
          <td className={styles.tableitems}>Número de Euler</td>
          <td className={styles.tableitems}>
            <InlineMath math={String.raw`e`} />
          </td>
          <td className={styles.tableitems}>e</td>
        </tr>
        <tr>
          <td className={styles.tableitems}>Combinações de Expressões</td>
          <td className={styles.tableitems}>
            <InlineMath
              math={String.raw`\frac{\left(\sin\left(\frac{\pi}{2}\right)-1\right)}{4}`}
            />
          </td>
          <td className={styles.tableitems}>(sin(pi/2)-1)/4</td>
        </tr>
      </table>
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
        Nesta caixa pode-se editar a transformação clicando no botão superior
        esquerdo, mudar sua definição clicando no botão superior direito ou
        excluí-la clicando no botão inferior direito.
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
        <Image src={sidebar} alt="Barra de funções" width={260} height={320} />
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
