import { DarkModeToggle, Mode } from "@anatoliygatt/dark-mode-toggle";
import { useTheme } from "next-themes";
import React, { useState } from "react";
import { Aperture, ChevronRight } from "react-feather";
import styles from "../../styles/modules/pages/tutorial.module.css";

const Tutorial = () => {
  const [mode, setMode] = useState<Mode>("dark");
  const { theme, setTheme } = useTheme();
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <a className={styles.logo}>
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
                <a href="#">Lorem</a>
              </li>
              <li className={styles.listitem}>
                <ChevronRight size={15} />
                <a href="#">ipsum</a>
              </li>
              <li className={styles.listitem}>
                <ChevronRight size={15} />
                <a href="#">dolor</a>
              </li>
            </ul>
          </aside>
          <article className={styles.tutorialcontent}>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
              nostrum, odio explicabo dolore molestiae quod recusandae magnam
              quos, commodi quibusdam, nam incidunt placeat perferendis.
              Praesentium excepturi eius cumque eligendi illo. Lorem ipsum dolor
              sit amet consectetur adipisicing elit. Facilis nostrum, odio
              explicabo dolore molestiae quod recusandae magnam quos, commodi
              quibusdam, nam incidunt placeat perferendis. Praesentium excepturi
              eius cumque eligendi illo.Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Facilis nostrum, odio explicabo dolore molestiae
              quod recusandae magnam quos, commodi quibusdam, nam incidunt
              placeat perferendis. Praesentium excepturi eius cumque eligendi
              illo. Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Facilis nostrum, odio explicabo dolore molestiae quod recusandae
              magnam quos, commodi quibusdam, nam incidunt placeat perferendis.
              Praesentium excepturi eius cumque eligendi illo. Lorem ipsum dolor
              sit amet consectetur adipisicing elit. Facilis nostrum, odio
              explicabo dolore molestiae quod recusandae magnam quos, commodi
              quibusdam, nam incidunt placeat perferendis. Praesentium excepturi
              eius cumque eligendi illo. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Facilis nostrum, odio explicabo dolore molestiae
              quod recusandae magnam quos, commodi quibusdam, nam incidunt
              placeat perferendis. Praesentium excepturi eius cumque eligendi
              illo. Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Facilis nostrum, odio explicabo dolore molestiae quod recusandae
              magnam quos, commodi quibusdam, nam incidunt placeat perferendis.
              Praesentium excepturi eius cumque eligendi illo. Lorem ipsum dolor
              sit amet consectetur adipisicing elit. Facilis nostrum, odio
              explicabo dolore molestiae quod recusandae magnam quos, commodi
              quibusdam, nam incidunt placeat perferendis. Praesentium excepturi
              eius cumque eligendi illo. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Facilis nostrum, odio explicabo dolore molestiae
              quod recusandae magnam quos, commodi quibusdam, nam incidunt
              placeat perferendis. Praesentium excepturi eius cumque eligendi
              illo. Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Facilis nostrum, odio explicabo dolore molestiae quod recusandae
              magnam quos, commodi quibusdam, nam incidunt placeat perferendis.
              Praesentium excepturi eius cumque eligendi illo. Lorem ipsum dolor
              sit amet consectetur adipisicing elit. Facilis nostrum, odio
              explicabo dolore molestiae quod recusandae magnam quos, commodi
              quibusdam, nam incidunt placeat perferendis. Praesentium excepturi
              eius cumque eligendi illo. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Facilis nostrum, odio explicabo dolore molestiae
              quod recusandae magnam quos, commodi quibusdam, nam incidunt
              placeat perferendis. Praesentium excepturi eius cumque eligendi
              illo.
            </p>
          </article>
        </main>
      </div>
    </div>
  );
};

export default Tutorial;
