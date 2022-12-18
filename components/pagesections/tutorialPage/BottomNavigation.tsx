import { Tooltip } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ArrowLeftCircle, ArrowRightCircle } from "react-feather";
import styles from "../../../styles/modules/pages/tutorial.module.css";
import { pagesItems } from "../../../utils";

const BottomNavigation = () => {
  const { route } = useRouter();
  const [prev, setPrev] = useState("#");
  const [next, setNext] = useState("#");
  useEffect(() => {
    const hrefs = pagesItems.map((page, i) => {
      return page.href;
    });
    setPrev(
      hrefs[hrefs.indexOf(route) - 1] ? hrefs[hrefs.indexOf(route) - 1] : "#"
    );
    setNext(
      hrefs[hrefs.indexOf(route) + 1] ? hrefs[hrefs.indexOf(route) + 1] : "#"
    );
  }, []);

  return (
    <footer className={styles.bottomnav}>
      <Link href={prev}>
        <Tooltip title="Página anterior">
          <a className={styles.bottombtn}>
            <ArrowLeftCircle size={35} />
          </a>
        </Tooltip>
      </Link>
      <Link href={next}>
        <Tooltip title="Próxima página">
          <a className={styles.bottombtn}>
            <ArrowRightCircle size={35} />
          </a>
        </Tooltip>
      </Link>
    </footer>
  );
};

export default BottomNavigation;
