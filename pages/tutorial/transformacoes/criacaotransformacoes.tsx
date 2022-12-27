import "katex/dist/katex.min.css";
import Image from "next/image";
import { useEffect } from "react";
import { InlineMath } from "react-katex";
import TutorialContainer from "../../../components/pagesections/tutorialPage/TutorialContainer";
import calchover from "../../../public/images/calchover.png";
import predefinedtrn from "../../../public/images/predefinedtrns.png";
import transformationbox from "../../../public/images/trnbox.gif";
import transformationplots from "../../../public/images/transformationplots.png";
import transformationplots2 from "../../../public/images/transformationplots2.png";
import trnbtn from "../../../public/images/trncreation.gif";
import styles from "../../../styles/modules/pages/tutorial.module.css";

// import { ToastContainer, toast } from "material-react-toastify";
// import "material-react-toastify/dist/ReactToastify.css";

const Creation = () => {
  // const notify = () => toast("Wow so easy!");
  useEffect(() => {}, []);
  return (
    <TutorialContainer>
      {/* <button onClick={notify}>teste</button> */}
      <h1 className={styles.heading}>Criando Transformações</h1>
      <p>
        Para adicionar uma transformação linear, clique no botão{" "}
        <b>Adicionar Transformação Linear</b> e insira os valores de sua matriz
        de transformação.
      </p>
      <div className={styles.imgwrapper}>
        <Image
          src={trnbtn}
          alt="Botão para adição de uma transformação"
          width={450}
          height={500}
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
          width={850}
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
      <h1 className={styles.heading}>Transformações Predefinidas</h1>
      <p>
        O botão <b>Transformações Predefinidas</b> oferece a opção de se
        adicionar uma transformação já pronta.
      </p>
      <div className={styles.imgwrapper}>
        <Image
          src={predefinedtrn}
          alt="Barra de funções"
          width={500}
          height={150}
        />
      </div>
      <p>
        As transformações predefinidas disponíveis no momento são definidas da
        seguinte forma:{" "}
      </p>
      <table id={styles.commandtable}>
        <thead>
          <tr>
            <td className={styles.tableitems}>
              <strong>Transformação</strong>
            </td>
            <td className={styles.tableitems}>
              <strong>Definição</strong>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={styles.tableitems}>Reflexão pelo Eixo y</td>
            <td className={styles.tableitems}>
              <InlineMath
                math={String.raw`
                T(a, b) = \begin{bmatrix}
                  -1 & 0\\
                  0 & 1
                \end{bmatrix}\begin{bmatrix}
                  a\\
                  b
                \end{bmatrix} = (-a, b)`}
              />
            </td>
          </tr>
          <tr>
            <td className={styles.tableitems}>Cisalhamento</td>
            <td className={styles.tableitems}>
              <InlineMath
                math={String.raw`
                T(a, b) = \begin{bmatrix}
                  1 & 2\\
                  0 & 1
                \end{bmatrix}\begin{bmatrix}
                  a\\
                  b
                \end{bmatrix} = (a + 2b, b) 
              `}
              />
            </td>
          </tr>
          <tr>
            <td className={styles.tableitems}>Contração</td>
            <td className={styles.tableitems}>
              <InlineMath
                math={String.raw`
                T(a, b) = \begin{bmatrix}
                  \frac{1}{2} & 0\\
                  0 & \frac{1}{2}
                \end{bmatrix}\begin{bmatrix}
                  a\\
                  b
                \end{bmatrix} = (\frac{1}{2}a, \frac{1}{2}b)`}
              />
            </td>
          </tr>
          <tr>
            <td className={styles.tableitems}>Dilatação</td>
            <td className={styles.tableitems}>
              <InlineMath
                math={String.raw`
                T(a, b) = \begin{bmatrix}
                  2 & 0\\
                  0 & 2
                \end{bmatrix}\begin{bmatrix}
                  a\\
                  b 
                \end{bmatrix} = (2a, 2b)`}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </TutorialContainer>
  );
};

export default Creation;
