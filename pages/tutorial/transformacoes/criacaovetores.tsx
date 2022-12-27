import "katex/dist/katex.min.css";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { InlineMath } from "react-katex";
import TutorialContainer from "../../../components/pagesections/tutorialPage/TutorialContainer";
import plot from "../../../public/images/tutorial-plot.png";
import vectoredit from "../../../public/images/vectoredit.gif";
import vectorinsertion from "../../../public/images/vectorinsertion.gif";
import vectorinsertionname from "../../../public/images/vectorinsertion2.gif";
import vectorinsertionclick from "../../../public/images/vectorinsertclick.gif";
import styles from "../../../styles/modules/pages/tutorial.module.css";

const VectorCreation = () => {
  useEffect(() => {
    // console.log("eval", evaluate("log(1,1)"));
  }, []);
  return (
    <TutorialContainer>
      <h1 className={styles.heading}>Criando Vetores</h1>
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
        <thead>
          <tr>
            <td className={styles.tableitems}>
              <strong>Tipo de Expressão</strong>
            </td>
            <td className={styles.tableitems}>
              <strong>Comando</strong>
            </td>
            <td className={styles.tableitems}>
              <strong>Exemplo</strong>
            </td>
            <td className={styles.tableitems}>
              <strong>Representação</strong>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={styles.tableitems}>Fração</td>
            <td className={styles.tableitems}>a/b</td>
            <td className={styles.tableitems}>1/2</td>
            <td className={styles.tableitems}>
              <InlineMath math={String.raw`\frac{1}{2}`} />
            </td>
          </tr>
          <tr>
            <td className={styles.tableitems}>Fatorial</td>
            <td className={styles.tableitems}>a!</td>
            <td className={styles.tableitems}>
              <InlineMath math={String.raw`3!`} />
            </td>
            <td className={styles.tableitems}>3!</td>
          </tr>
          <tr>
            <td className={styles.tableitems}>Módulo</td>
            <td className={styles.tableitems}>abs(a)</td>
            <td className={styles.tableitems}>abs(-1)</td>
            <td className={styles.tableitems}>
              <InlineMath math={String.raw`\left|-1\right|`} />
            </td>
          </tr>
          <tr>
            <td className={styles.tableitems}>Raíz Quadrada</td>
            <td className={styles.tableitems}>sqrt(a)</td>
            <td className={styles.tableitems}>sqrt(2)</td>
            <td className={styles.tableitems}>
              <InlineMath math={String.raw`\sqrt{2}`} />
            </td>
          </tr>
          <tr>
            <td className={styles.tableitems}>Raíz Cúbica</td>
            <td className={styles.tableitems}>cbrt(a)</td>
            <td className={styles.tableitems}>cbrt(27)</td>
            <td className={styles.tableitems}>
              <InlineMath math={String.raw`\sqrt[3]{27}`} />
            </td>
          </tr>
          <tr>
            <td className={styles.tableitems}>Raíz Enésima</td>
            <td className={styles.tableitems}>nthRoot(a,b)</td>
            <td className={styles.tableitems}>nthRoot(32,5)</td>
            <td className={styles.tableitems}>
              <InlineMath math={String.raw`\sqrt[5]{32}`} />
            </td>
          </tr>
          <tr>
            <td className={styles.tableitems}>Logaritmo</td>
            <td className={styles.tableitems}>log(a, b)</td>
            <td className={styles.tableitems}>log(9, 3)</td>
            <td className={styles.tableitems}>
              <InlineMath math={String.raw`\log_{3}\left(9\right)`} />
            </td>
          </tr>
          <tr>
            <td className={styles.tableitems}>Logaritmo de Base 2</td>
            <td className={styles.tableitems}>log2(a)</td>
            <td className={styles.tableitems}>log2(4)</td>
            <td className={styles.tableitems}>
              <InlineMath math={String.raw`\log_{2}\left(4\right)`} />
            </td>
          </tr>
          <tr>
            <td className={styles.tableitems}>Logaritmo de Base 10</td>
            <td className={styles.tableitems}>log10(a)</td>
            <td className={styles.tableitems}>log10(10000)</td>
            <td className={styles.tableitems}>
              <InlineMath math={String.raw`\log_{10}\left(10000\right)`} />
            </td>
          </tr>
          <tr>
            <td className={styles.tableitems}>Logaritmo Base Natural</td>
            <td className={styles.tableitems}>log(a)</td>
            <td className={styles.tableitems}>log(2)</td>
            <td className={styles.tableitems}>
              <InlineMath math={String.raw`\ln\left(2\right)`} />
            </td>
          </tr>
          <tr>
            <td className={styles.tableitems}>Potência</td>
            <td className={styles.tableitems}>a^b ou pow(a,b)</td>
            <td className={styles.tableitems}>3^2</td>
            <td className={styles.tableitems}>
              <InlineMath math={String.raw`{3}^{2}`} />
            </td>
          </tr>
          <tr>
            <td className={styles.tableitems}>Seno</td>
            <td className={styles.tableitems}>sin(a)</td>
            <td className={styles.tableitems}>sin(pi/6)</td>
            <td className={styles.tableitems}>
              <InlineMath math={String.raw`\sin\left(\frac{\pi}{6}\right)`} />
            </td>
          </tr>
          <tr>
            <td className={styles.tableitems}>Cosseno</td>
            <td className={styles.tableitems}>cos(a)</td>
            <td className={styles.tableitems}>cos(0)</td>
            <td className={styles.tableitems}>
              <InlineMath math={String.raw`\cos\left(0\right)`} />
            </td>
          </tr>
          <tr>
            <td className={styles.tableitems}>Tangente</td>
            <td className={styles.tableitems}>tan(a)</td>
            <td className={styles.tableitems}>tan(pi/4)</td>
            <td className={styles.tableitems}>
              <InlineMath math={String.raw`\tan\left(\frac{\pi}{4}\right)`} />
            </td>
          </tr>
          <tr>
            <td className={styles.tableitems}>Arco Seno</td>
            <td className={styles.tableitems}>asin(a)</td>
            <td className={styles.tableitems}>asin(1/2)</td>
            <td className={styles.tableitems}>
              <InlineMath
                math={String.raw`\sin^{-1}\left(\frac{1}{2}\right)`}
              />
            </td>
          </tr>
          <tr>
            <td className={styles.tableitems}>Arco Cosseno</td>
            <td className={styles.tableitems}>acos(a)</td>
            <td className={styles.tableitems}>acos(1)</td>
            <td className={styles.tableitems}>
              <InlineMath math={String.raw`\cos^{-1}\left(1\right)`} />
            </td>
          </tr>
          <tr>
            <td className={styles.tableitems}>Arco Tangente</td>
            <td className={styles.tableitems}>atan(a)</td>
            <td className={styles.tableitems}>atan(1)</td>
            <td className={styles.tableitems}>
              <InlineMath
                math={String.raw`\tan^{-1}\left(1\right)`}
                // tirar tangente
              />
            </td>
          </tr>
          <tr>
            <td className={styles.tableitems}>Secante</td>
            <td className={styles.tableitems}>sec(a)</td>
            <td className={styles.tableitems}>sec(3)</td>
            <td className={styles.tableitems}>
              <InlineMath math={String.raw`\sec\left(3\right)`} />
            </td>
          </tr>
          <tr>
            <td className={styles.tableitems}>Cotangente</td>
            <td className={styles.tableitems}>cot(a)</td>
            <td className={styles.tableitems}>cot(1/2)</td>
            <td className={styles.tableitems}>
              <InlineMath math={String.raw`\cot\left(\frac{1}{2}\right)`} />
            </td>
          </tr>
          <tr>
            <td className={styles.tableitems}>Cosecante</td>
            <td className={styles.tableitems}>csc(a)</td>
            <td className={styles.tableitems}>csc(pi/2)</td>
            <td className={styles.tableitems}>
              <InlineMath math={String.raw`\csc\left(\frac{\pi}{2}\right)`} />
            </td>
          </tr>
          <tr>
            <td className={styles.tableitems}>Arco Secante</td>
            <td className={styles.tableitems}>asec(a)</td>
            <td className={styles.tableitems}>asec(2)</td>
            <td className={styles.tableitems}>
              <InlineMath math={String.raw`\sec^{-1}\left(2\right)`} />
            </td>
          </tr>
          <tr>
            <td className={styles.tableitems}>Arco Cotangente</td>
            <td className={styles.tableitems}>acot(a)</td>
            <td className={styles.tableitems}>acot(2)</td>
            <td className={styles.tableitems}>
              <InlineMath math={String.raw`\cot^{-1}\left(2\right)`} />
            </td>
          </tr>
          <tr>
            <td className={styles.tableitems}>Pi</td>
            <td className={styles.tableitems}>pi</td>
            <td className={styles.tableitems}>pi</td>
            <td className={styles.tableitems}>
              <InlineMath math={String.raw`\pi`} />
            </td>
          </tr>
          <tr>
            <td className={styles.tableitems}>Número de Euler</td>
            <td className={styles.tableitems}>e</td>
            <td className={styles.tableitems}>e</td>
            <td className={styles.tableitems}>
              <InlineMath math={String.raw`e`} />
            </td>
          </tr>
          <tr>
            <td className={styles.tableitems}>Combinações de Expressões</td>
            <td className={styles.tableitems}>(sin(pi/2)-1)/4</td>
            <td className={styles.tableitems}>(sin(pi/2)-1)/4</td>
            <td className={styles.tableitems}>
              <InlineMath
                math={String.raw`\frac{\left(\sin\left(\frac{\pi}{2}\right)-1\right)}{4}`}
              />
            </td>
          </tr>
        </tbody>
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
        Os nomes dos vetores devem conter uma única letra (como{" "}
        <InlineMath math={String.raw`u`} />
        ), ou podem ser numerados (como <InlineMath math={String.raw`u_{1}`} />
        ). Para editar um vetor criado, clique no botão com um lápis, ou dê um
        clique duplo em cima de suas coordenadas. Para excluí-lo clique na
        lixeirinha.
      </p>
      <div className={styles.imgwrapper}>
        <Image
          src={vectoredit}
          alt="Edição e exclusão de um vetor"
          width={440}
          height={170}
        />
      </div>
      <p>
        Um vetor pode ainda ser inserido clicando no gráfico através do botão{" "}
        <b>Inserir Vetor</b>.
      </p>
      <div className={styles.imgwrapper}>
        <Image
          src={vectorinsertionclick}
          alt="Criação de um vetor por clique"
          width={400}
          height={500}
        />
      </div>
    </TutorialContainer>
  );
};

export default VectorCreation;
