import Link from "next/link";
import { useRouter } from "next/router";
import { FunctionComponent, useEffect, useState } from "react";
import { ChevronRight, Minus } from "react-feather";
import { ListItemProps } from "../../../interfaces/interfaces";
import styles from "../../../styles/modules/pages/tutorial.module.css";

const ListItem: FunctionComponent<ListItemProps> = ({
  href,
  linkText,
  isSubItem = false,
}) => {
  const { route } = useRouter();
  const [currentPage, setCurrentPage] = useState(route);

  useEffect(() => {
    setCurrentPage(route);
  }, [route]);

  return (
    <li className={href === route ? styles.listitemcurrent : styles.listitem}>
      {isSubItem ? <Minus size={11} /> : <ChevronRight size={15} />}
      <Link href={href}>{linkText}</Link>
    </li>
  );
};

export default ListItem;
