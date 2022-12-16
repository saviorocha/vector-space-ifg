import { DarkModeToggle, Mode } from "@anatoliygatt/dark-mode-toggle";
import { useTheme } from "next-themes";
import { useState } from "react";
import { Hash, Moon } from "react-feather";
import { useConfigContext } from "../../../context/ConfigContext";
import stylesconfig from "../../../styles/modules/ui/config.module.css";
import { validateTransformationVar } from "../../../utils";
import AbcIcon from "../../icons/AbcIcon";
import BasisVectorIcon from "../../icons/BasisVectorIcon";
import ColorIcon from "../../icons/ColorIcon";
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
    showMathSymbols,
    setShowMathSymbols,
    vectorColor,
    setVectorColor,
    transformationVars,
    setTransformationVars,
  } = useConfigContext();
  const { theme, setTheme } = useTheme();
  const [mode, setMode] = useState<Mode>("dark");

  const handleVarSubmit = (event: any) => {
    event.preventDefault();

    if (
      !validateTransformationVar(event.target.value) ||
      event.target.a.value === event.target.b.value
    ) {
      alert("Nome inválido");
      return;
    }

    setTransformationVars([event.target.a.value, event.target.b.value]);
  };

  return (
    <PopupWindow>
      <ul className="mt-3">
        <li className={stylesconfig.popupitem}>
          <div className={stylesconfig.configicon}>
            <Moon />
          </div>
          <p className={stylesconfig.itemtext}>Tema</p>
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
          <p className={stylesconfig.itemtext}>Mostrar linhas grid</p>
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
          <p className={stylesconfig.itemtext}>Esconder números do gráfico</p>
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
          <p className={stylesconfig.itemtext}>Configurar casas decimais</p>
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
          <p className={stylesconfig.itemtext}>Incluir vetores canônicos</p>
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
            <MathSymbolIcon />
          </div>
          <p className={stylesconfig.itemtext}>
            Mostrar Expressões Matemáticas
          </p>
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
        <li className={stylesconfig.popupitem}>
          <div className={stylesconfig.configicon}>
            <ColorIcon />
          </div>
          <p className={stylesconfig.itemtext}>
            Alterar cor padrão dos vetores
          </p>
          <div className={stylesconfig.configcontrol}>
            <input
              type="color"
              value={vectorColor}
              onChange={(event) => {
                event.preventDefault();
                setVectorColor(event.target.value);
              }}
              className="w-10 h-5 mt-2"
            />
          </div>
        </li>
        <li className={stylesconfig.popupitem}>
          <div className={stylesconfig.configicon}>
            <AbcIcon />
          </div>
          <p className={stylesconfig.itemtext}>
            Alterar nome das variáveis das transformações
          </p>
          <div className={stylesconfig.configcontrol}>
            <input
              type="text"
              value={transformationVars[0]}
              onChange={(event) => {
                if (
                  !validateTransformationVar(event.target.value) ||
                  event.target.value === transformationVars[1]
                ) {
                  alert("Nome inválido");
                  return;
                }

                setTransformationVars([
                  event.target.value,
                  transformationVars[1],
                ]);
              }}
              className="w-10 h-5 mt-2 border border-gray-200"
            />
            <input
              type="text"
              value={transformationVars[1]}
              onChange={(event) => {
                if (
                  !validateTransformationVar(event.target.value) ||
                  event.target.value === transformationVars[0]
                ) {
                  alert("Nome inválido");
                  return;
                }

                setTransformationVars([
                  event.target.value,
                  transformationVars[0],
                ]);
              }}
              className="w-10 h-5 mt-2 mr-2 border border-gray-200"
            />
          </div>
        </li>
      </ul>
    </PopupWindow>
  );
};

export default ConfigPopup;
