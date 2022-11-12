import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Aperture, HelpCircle, PlayCircle, PlusCircle } from "react-feather";
import styles from "../styles/modules/pages/homepage.module.css";

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <section className={styles.greetings}>
        <div className={styles.logo}>
          <Aperture size={170} />
          VectorSpace
        </div>
        <h1 className={styles.greetingstext}>
          Bem-vindo ao VectorSpace, um sistema de visualização e manipualação de
          conceitos de Álgebra Linear!
        </h1>
      </section>
      <section className={styles.pages}>
        <fieldset className={styles.textborder}>
          <legend>Tutorial</legend>
          <div
            className={styles.pagecard}
            onClick={() => {
              router.push("/tutorial");
            }}
          >
            <button className="">
              <HelpCircle />
            </button>
            <p>Tela de tutorial</p>
          </div>
        </fieldset>
        <fieldset className={styles.textborder}>
          <legend>Transformações Lineares</legend>
          <div className={styles.transformationpages}>
            <div
              className={styles.pagecard}
              onClick={() => {
                router.push("/transformacaolinear/editartransformacoes");
              }}
            >
              <button>
                <PlusCircle />
              </button>
              <p>Criar Transformações</p>
            </div>
            <div
              className={styles.pagecard}
              onClick={() => {
                router.push("/transformacaolinear/animartransformacoes");
              }}
            >
              <button>
                <PlayCircle />
              </button>
              <p>Animar Transformações</p>
            </div>
          </div>
        </fieldset>
      </section>
    </div>
  );
};

export default Home;
