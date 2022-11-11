import { DarkModeToggle, Mode } from "@anatoliygatt/dark-mode-toggle";
import { useTheme } from "next-themes";
import Link from "next/link";
import { FunctionComponent, useState } from "react";
import { Aperture, ChevronRight, Minus } from "react-feather";
import { PropsChildren } from "../../../interfaces/interfaces";
import styles from "../../../styles/modules/pages/tutorial.module.css";

const TutorialContainer: FunctionComponent<PropsChildren> = ({ children }) => {
  const [mode, setMode] = useState<Mode>("dark");
  const { theme, setTheme } = useTheme();
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/">
          <a className={styles.logo}>
            <Aperture />
            VectorSpace
          </a>
        </Link>
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
                <Link href="/tutorial">
                  <a>
                    O que é o <em>VectorSpace</em>?
                  </a>
                </Link>
              </li>
              <li className={styles.listitem}>
                <ChevronRight size={15} />
                <Link href="/tutorial/vectorstransformations/creation">
                  Vetores e transformações
                </Link>
              </li>
              <li className={styles.listsubitem}>
                <Minus size={11} />
                <Link href="/tutorial/vectorstransformations/creation">
                  Criação de transformações
                </Link>
              </li>
              <li className={styles.listsubitem}>
                <Minus size={11} />
                <Link href="/tutorial/vectorstransformations/animation">
                  Animação de transformações
                </Link>
              </li>
              <li className={styles.listitem}>
                <ChevronRight size={15} />
                <Link href="/tutorial/configs">Configurações variadas</Link>
              </li>
            </ul>
          </aside>
          <article className={styles.tutorialcontent}>{children}</article>
        </main>
      </div>
    </div>
  );
};

export default TutorialContainer;
