import { DarkModeToggle, Mode } from "@anatoliygatt/dark-mode-toggle";
import { useTheme } from "next-themes";
import { useState } from "react";
import { Hash, Moon } from "react-feather";
import { useConfigContext } from "../../../context/ConfigContext";
import { validateTransformationVar } from "../../../utils";
import AbcIcon from "../../icons/AbcIcon";
import BasisVectorIcon from "../../icons/BasisVectorIcon";
import ColorIcon from "../../icons/ColorIcon";
import DecimalIcon from "../../icons/DecimalIcon";
import MathSymbolIcon from "../../icons/MathSymbolIcon";
import ConfigListItem from "./ConfigListItem";
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

  return (
    <PopupWindow>
      <ul className="mt-3">
        <ConfigListItem icon={<Moon />} title="Tema">
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
        </ConfigListItem>
        <ConfigListItem icon={<Hash />} title="Esconder números do gráfico">
          <input
            type="checkbox"
            checked={hideNumbers}
            onChange={() => {
              setHideNumbers(!hideNumbers);
            }}
          />
        </ConfigListItem>

        <ConfigListItem
          icon={<DecimalIcon />}
          title="Configurar casas decimais"
        >
          <input
            type="number"
            className="w-10 h-5 mt-2"
            value={decimalPoint}
            onChange={(event: any) => {
              setDecimalPoint(event.target.value);
            }}
            min={0}
          />
        </ConfigListItem>

        <ConfigListItem
          icon={<BasisVectorIcon />}
          title="Incluir vetores canônicos"
        >
          <input
            type="checkbox"
            checked={showBasisVectors}
            onChange={() => {
              setShowBasisVectors(!showBasisVectors);
            }}
          />
        </ConfigListItem>

        <ConfigListItem
          icon={<MathSymbolIcon />}
          title="Mostrar Expressões Matemáticas"
        >
          <input
            type="checkbox"
            checked={showMathSymbols}
            onChange={() => {
              setShowMathSymbols(!showMathSymbols);
            }}
          />
        </ConfigListItem>

        <ConfigListItem
          icon={<ColorIcon />}
          title="Alterar cor padrão dos vetores"
        >
          <input
            type="color"
            value={vectorColor}
            onChange={(event) => {
              event.preventDefault();
              setVectorColor(event.target.value);
            }}
            className="w-10 h-5 mt-2"
          />
        </ConfigListItem>

        <ConfigListItem
          icon={<AbcIcon />}
          title="Alterar nome das variáveis das transformações"
        >
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
        </ConfigListItem>
      </ul>
    </PopupWindow>
  );
};

export default ConfigPopup;
