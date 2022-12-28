import styles from "../styles/modules/pages/404.module.css";
import logostyles from "../styles/modules/pages/editartransformacoes.module.css"
import Logo from "../components/icons/Logo";
import Link from "next/link";

export default function Custom404() {
  return (
    <div className={styles.container}>
      <Link href="/">
        <a className={logostyles.logo}>
          <Logo className={logostyles.headerlogo} />
          <p className={logostyles.logotext}>VectorSpace</p>
        </a>
      </Link>
      <h2 className={styles.text404}>404</h2>
      <h2 className={styles.text}>A página que você tentou acessar não existe!</h2>
    </div>
  );
}
