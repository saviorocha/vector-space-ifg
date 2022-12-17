import React, { FunctionComponent } from "react";
import { IConfigItemProp } from "../../../interfaces/interfaces";
import stylesconfig from "../../../styles/modules/ui/config.module.css";

const ConfigListItem: FunctionComponent<IConfigItemProp> = ({
  children,
  icon,
  title,
}) => {
  return (
    <li className={stylesconfig.popupitem}>
      <div className={stylesconfig.configicon}>{icon}</div>
      <p className={stylesconfig.itemtext}>{title}</p>
      <div className={stylesconfig.configcontrol}>{children}</div>
    </li>
  );
};

export default ConfigListItem;
