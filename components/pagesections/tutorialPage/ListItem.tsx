import Link from "next/link";
import { useRouter } from "next/router";
import { FunctionComponent, useEffect, useState } from "react";
import { ChevronRight, Minus } from "react-feather";
import { ListItemProps } from "../../../interfaces/interfaces";
import styles from "../../../styles/modules/pages/tutorial.module.css";

/**
 * Navigation item component
 */
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
      {isSubItem ? (
        <div className="flex items-center flex-row ml-3">
          <Minus size={11} />
          <Link href={href}>{linkText}</Link>
        </div>
      ) : (
        <div className="flex items-center flex-row">
          <ChevronRight size={15} />
          <Link href={href}>{linkText}</Link>
        </div>
      )}
    </li>
  );
};

export default ListItem;
