import { DarkModeToggle, Mode } from "@anatoliygatt/dark-mode-toggle";
import { useTheme } from "next-themes";
import Link from "next/link";
import { FunctionComponent, useState } from "react";
import { PropsChildren } from "../../../interfaces/interfaces";
import styles from "../../../styles/modules/pages/tutorial.module.css";
import Logo from "../../icons/Logo";
import BottomNavigation from "./BottomNavigation";
import ListItem from "./ListItem";
import { pagesItems } from "../../../utils";

const TutorialContainer: FunctionComponent<PropsChildren> = ({ children }) => {
  const [mode, setMode] = useState<Mode>("dark");
  const { theme, setTheme } = useTheme();

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <Link href="/">
          <a className={styles.logo}>
            <Logo className={styles.headerlogo} logoColor="#fff" />
            <p className={styles.logotext}>VectorSpace</p>
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
              {pagesItems.map(({ href, linkText, isSubItem }, i) => {
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
          <article className={styles.tutorialcontent}>
            <div className={styles.content}>{children}</div>
            <div>
              <BottomNavigation />
            </div>
          </article>
        </main>
      </div>
    </section>
  );
};

export default TutorialContainer;
