import { useTheme } from "next-themes";
import React, { FunctionComponent, useEffect, useState } from "react";
import { CustomIconProps } from "../../interfaces/interfaces";

const MathSymbolIcon: FunctionComponent<CustomIconProps> = ({
  className,
  logoColor = undefined,
}) => {
  const { theme } = useTheme();
  const [logoTheme, setLogoTheme] = useState("#ffffff");

  useEffect(() => {
    setLogoTheme(theme === "dark" ? "#fff" : "#000");
  }, [theme]);

  return (
    <svg
      version="1.1"
      id="Capa_1"
      x="0px"
      y="0px"
      width="30px"
      height="30px"
      viewBox="0 0 143.73 143.73"
      xmlSpace="preserve"
    >
      <g style={{
        fill: logoColor ? logoColor : logoTheme
      }}>
        <g style={{
          fill: logoColor ? logoColor : logoTheme
        }}>
          <path
            d="M7.309,74.912h5.946l29.487,41.961c1.384,1.969,3.629,3.105,5.98,3.105c0.463,0,0.933-0.045,1.398-0.137
			c2.831-0.553,5.072-2.716,5.722-5.527L73.411,38.37h63.01c4.036,0,7.31-3.271,7.31-7.309c0-4.036-3.272-7.309-7.31-7.309h-68.82
			c-3.401,0-6.354,2.349-7.121,5.662l-15.189,65.66L23.032,63.4c-1.367-1.945-3.598-3.105-5.979-3.105H7.309
			C3.272,60.295,0,63.566,0,67.604C0.001,71.64,3.273,74.912,7.309,74.912z"
          />
          <path
            d="M81.727,105.979c0,3.589,2.926,6.229,6.699,6.229c2.549,0,4.531-1.604,6.229-3.681l10.193-13.401l10.192,13.401
			c1.888,2.36,3.868,3.681,6.698,3.681c3.59,0,6.607-2.548,6.607-6.605c0-1.887-0.756-3.586-2.361-5.476l-12.646-14.532
			l12.271-14.347c1.134-1.416,1.98-2.926,1.98-4.909c0-3.589-2.926-6.231-6.701-6.231c-2.549,0-4.529,1.605-6.229,3.684
			l-9.533,12.455l-9.342-12.455c-1.89-2.361-3.869-3.684-6.699-3.684c-3.588,0-6.606,2.551-6.606,6.609
			c0,1.885,0.756,3.586,2.358,5.471l11.797,13.592l-12.93,15.289C82.482,102.486,81.727,103.996,81.727,105.979z"
          />
        </g>
      </g>
      <g style={{
        fill: logoColor ? logoColor : logoTheme
      }}></g>
      <g style={{
        fill: logoColor ? logoColor : logoTheme
      }}></g>
      <g style={{
        fill: logoColor ? logoColor : logoTheme
      }}></g>
      <g style={{
        fill: logoColor ? logoColor : logoTheme
      }}></g>
      <g style={{
        fill: logoColor ? logoColor : logoTheme
      }}></g>
      <g style={{
        fill: logoColor ? logoColor : logoTheme
      }}></g>
      <g style={{
        fill: logoColor ? logoColor : logoTheme
      }}></g>
      <g style={{
        fill: logoColor ? logoColor : logoTheme
      }}></g>
      <g style={{
        fill: logoColor ? logoColor : logoTheme
      }}></g>
      <g style={{
        fill: logoColor ? logoColor : logoTheme
      }}></g>
      <g style={{
        fill: logoColor ? logoColor : logoTheme
      }}></g>
      <g style={{
        fill: logoColor ? logoColor : logoTheme
      }}></g>
      <g style={{
        fill: logoColor ? logoColor : logoTheme
      }}></g>
      <g style={{
        fill: logoColor ? logoColor : logoTheme
      }}></g>
      <g style={{
        fill: logoColor ? logoColor : logoTheme
      }}></g>
    </svg>
  );
};

export default MathSymbolIcon;
