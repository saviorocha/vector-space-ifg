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
      <h2 className={styles.text404}>Oops :(</h2>
      <p className="text-2xl">Parece que hove algum erro.</p>
      <p className="text-xl">Desculpe pelo inconveniente, tente novamente mais tarde.</p>
    </div>
  );
}
