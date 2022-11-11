import { DarkModeToggle, Mode } from "@anatoliygatt/dark-mode-toggle";
import { useTheme } from "next-themes";
import Link from "next/link";
import { FunctionComponent, useState } from "react";
import { Aperture } from "react-feather";
import { PropsChildren } from "../../../interfaces/interfaces";
import styles from "../../../styles/modules/pages/tutorial.module.css";
import ListItem from "./ListItem";

const listItems = [
  {
    href: "/tutorial",
    linkText: "O que é o VectorSpace?",
  },
  {
    href: "/tutorial/vectorstransformations",
    linkText: "Transformações Lineares",
  },
  {
    href: "/tutorial/vectorstransformations/creation",
    linkText: "Criação de transformações",
    isSubItem: true,
  },
  {
    href: "/tutorial/vectorstransformations/animation",
    linkText: "Animação de transformações",
    isSubItem: true,
  },
  {
    href: "/tutorial/configs",
    linkText: "Configurações variadas",
  },
];

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
              {listItems.map(({ href, linkText, isSubItem }, i) => {
                return (
                  <ListItem
                    key={i}
                    href={href}
                    linkText={linkText}
                    isSubItem={isSubItem}
                  />
                );
              })}
            </ul>
          </aside>
          <article className={styles.tutorialcontent}>{children}</article>
        </main>
      </div>
    </div>
  );
};

export default TutorialContainer;
