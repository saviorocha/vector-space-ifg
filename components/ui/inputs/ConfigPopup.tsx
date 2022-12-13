import { DarkModeToggle, Mode } from "@anatoliygatt/dark-mode-toggle";
import { useTheme } from "next-themes";
import { useState } from "react";
import { Hash, Moon } from "react-feather";
import { useConfigContext } from "../../../context/ConfigContext";
import stylesconfig from "../../../styles/modules/ui/config.module.css";
import BasisVectorIcon from "../../icons/BasisVectorIcon";
import DecimalIcon from "../../icons/DecimalIcon";
import MathSymbolIcon from "../../icons/MathSymbolIcon";
import PopupWindow from "./PopupWindow";

const ConfigPopup = () => {
  const {
    hideNumbers,
    setHideNumbers,
    showBasisVectors,
    setShowBasisVectors,
    decimalPoint,
    setDecimalPoint,
    showGridLines,
    setShowGridLines,
    showMathSymbols,
    setShowMathSymbols,
  } = useConfigContext();
  const { theme, setTheme } = useTheme();
  const [mode, setMode] = useState<Mode>("dark");

  return (
    <PopupWindow>
      <ul className="mt-3">
        <li className={stylesconfig.popupitem}>
          <div className={stylesconfig.configicon}>
            <Moon />
          </div>
          <p>Tema</p>
          <div className={stylesconfig.configcontrol}>
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
        </li>
        {/* <li className={stylesconfig.popupitem}>
          <div className={stylesconfig.configicon}>
            <Globe />
          </div>
          <p>Mostrar linhas grid</p>
          <div className={stylesconfig.configcontrol}>
            <input
              type="checkbox"
              checked={showGridLines}
              onChange={() => {
                setShowGridLines(!showGridLines);
              }}
            />
          </div>
        </li> */}
        <li id="toggle-numbers" className={stylesconfig.popupitem}>
          <div className={stylesconfig.configicon}>
            <Hash />
          </div>
          <p>Esconder números do gráfico</p>
          <div className={stylesconfig.configcontrol}>
            <input
              type="checkbox"
              checked={hideNumbers}
              onChange={() => {
                setHideNumbers(!hideNumbers);
              }}
            />
          </div>
        </li>
        <li className={stylesconfig.popupitem}>
          <div className={stylesconfig.configicon}>
            <DecimalIcon />
          </div>
          <p>Configurar casas decimais</p>
          <div className={stylesconfig.configcontrol}>
            <input
              type="number"
              className="w-10 h-5 mt-2"
              value={decimalPoint}
              onChange={(event: any) => {
                setDecimalPoint(event.target.value);
              }}
              min={0}
            />
          </div>
        </li>
        <li className={stylesconfig.popupitem}>
          <div className={stylesconfig.configicon}>
            <BasisVectorIcon />
          </div>
          <p>Incluir vetores canônicos</p>
          <div className={stylesconfig.configcontrol}>
            <input
              type="checkbox"
              checked={showBasisVectors}
              onChange={() => {
                setShowBasisVectors(!showBasisVectors);
              }}
            />
          </div>
        </li>
        <li className={stylesconfig.popupitem}>
          <div className={stylesconfig.configicon}>
            <MathSymbolIcon  />
          </div>
          <p>Mostrar Expressões Matemáticos</p>
          <div className={stylesconfig.configcontrol}>
            <input
              type="checkbox"
              checked={showMathSymbols}
              onChange={() => {
                setShowMathSymbols(!showMathSymbols);
              }}
            />
          </div>
        </li>
      </ul>
    </PopupWindow>
  );
};

export default ConfigPopup;
