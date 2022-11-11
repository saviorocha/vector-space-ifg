import { DarkModeToggle, Mode } from "@anatoliygatt/dark-mode-toggle";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Aperture, ChevronRight } from "react-feather";
import styles from "../../styles/modules/pages/tutorial.module.css";
import { decode } from "html-entities";

const Tutorial = () => {
  const [mode, setMode] = useState<Mode>("dark");
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <a className={styles.logo} href="#">
          <Aperture />
          VectorSpace
        </a>
        <div className={styles.darkmodetoggle}>
          <DarkModeToggle
            mode={mode}
            size="sm"
            inactiveTrackColor="#e2e8f0"
            inactiveTrackColorOnHover="#f8fafc"
            inactiveTrackColorOnActive="#cbd5e1"
            activeTrackColor="#334155"
            activeTrackColorOnHover="#1e293b"
            activeTrackColorOnActive="#0f172a"
            inactiveThumbColor="#1e293b"
            activeThumbColor="#e2e8f0"
            onChange={(mode) => {
              setMode(mode);
              setTheme(theme === "dark" ? "light" : "dark");
            }}
          />
        </div>
      </header>

      <div className={styles.page}>
        <main className={styles.pagecontent}>
          <aside className={styles.navcontent}>
            <ul>
              <li className={styles.listitem}>
                <ChevronRight size={15} />
                <a href="#">
                  O que é o <em>VectorSpace</em>?
                </a>
              </li>
              <li className={styles.listitem}>
                <ChevronRight size={15} />
                <a href="#">Vetores e transformações</a>
                <ul>
                  <li>Criação de transformações</li>
                  <li>Animação de transformações</li>
                </ul>
              </li>
              <li className={styles.listitem}>
                <ChevronRight size={15} />
                <a href="#">Configurações variadas</a>
              </li>
            </ul>
          </aside>
          <article className={styles.tutorialcontent}>
            <p>
              O <em>VectorSpace</em> é software de matemática que visa oferecer
              ferramentas de visualização e manipulação gráfica para o
              aprendizado de conceitos avançados da Álgebra Linear. Atualmente
              ele disponibiliza funções referentes a transformações lineares e,
              por extensão, vetores.
            </p>
            <p>
              <p>
                A (tela de criação de transformações) possui em seu centro um
                gráfico bidimensional que pode ser movimentado e ampliado. Logo
                abaixo do gráfico encontra-se uma seção na qual vetores podem
                ser inseridos no gráfico através de suas coordenadas.
              </p>
              <p>
                Para inserir um vetor você pode escrever, na caixa de entrada,
                as suas coordenadas entre parênteses, do seguinte modo: (x, y).
                Caso deseje criar um vetor com um nome, insira-o do seguinte
                modo: v_&#123;i&#125;=(x, y). Para editar um vetor criado,
                clique no ícone com um lápis, ou dê um clique duplo em cima de
                suas coordenadas. Para inserir uma transformação linear, clique
                no botão abaixo e insira os valores de sua matriz de
                transformação. Um novo gráfico será gerado, exibindo o efeito da
                transformação nos vetores inseridos, e uma caixa mostrará a
                transformação criada. Nesta caixa você poderá editar a
                transformação clicando no ícone com um lápis, exluí-la clicando
                na lixerinha e mudar sua definição clicando no ícone das
                setinhas girando. O sistema irá calcular as imagens dos vetores
                inseridos com base na matriz de transformação. Você pode
                visualizar esse cálculo passando o mouse em cima da imagem de um
                determinado vetor. Para adicionar uma nova transformação a ser
                aplica após a transformação inserida, clique no ícone com um
                mais, no qual o mesmo processo ocorrerá.
              </p>
              <p>
                À esquerda apresenta-se uma barra de funções. O primeiro botão
                permite movimentar gráfico. O segundo permite adicionar um vetor
                novo clicando no gráfico. O terceiro permite adicionar
                transformações pré determinadas. O último redireciona para a
                (página de animação).
              </p>
              <p>
                A tela de animação realiza uma representação visual do efeito da
                transformação nos vetores através de uma animação, na qual os
                vetores são deslocados de acordo com a transformação aplicada.
              </p>
              <p>
                Algumas configurações podem ser realizadas clicando sobre o
                ícone com uma engrenagem. Essas configurações são:
                <ul>
                  <li>Tema: muda o esquema de cores, para escuro ou claro.</li>
                  <li>
                    Mostrar números do gráfico: controla se aparecem ou não os
                    números do gráfico
                  </li>
                  <li>
                    Configurar casas decimais: configura o ponteiro das casas
                    decimais a ser apresentado pelo sistema.
                  </li>
                  <li>
                    Incluir vetores canônicos: permite demonstrar como os
                    vetores canônicos são transformados.
                  </li>
                </ul>
              </p>
            </p>
          </article>
        </main>
      </div>
    </div>
  );
};

export default Tutorial;
