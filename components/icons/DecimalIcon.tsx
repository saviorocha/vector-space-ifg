import { useTheme } from "next-themes";
import React, { FunctionComponent, useEffect, useState } from "react";
import { CustomIconProps } from "../../interfaces/interfaces";

const DecimalIcon: FunctionComponent<CustomIconProps> = ({
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
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs id="defs20" />

      <text
        xmlSpace="preserve"
        style={{
          fontSize: "8px",
          lineHeight: 0,
          whiteSpace: "pre",
          inlineSize: 2.10498,
          display: "inline",
          fill: logoColor ? logoColor : logoTheme,
        }}
        x="3.9922631"
        y="10.444874"
        id="text537"
      />
      <g
        aria-label=".0"
        id="text1776"
        style={{
          fontSize: "42.5835px",
          lineHeight: 0,
          fontFamily: "SymbolPi",
          fill: logoColor ? logoColor : logoTheme,
          strokeWidth: 0.739295,
        }}
      >
        <path
          d="m 3.3121854,19.938013 q -0.3638727,0 -0.6653672,-0.155945 -0.2910981,-0.145549 -0.4990254,-0.395062 -0.1975309,-0.249512 -0.3118908,-0.5718 -0.1039637,-0.322287 -0.1039637,-0.65497 0,-0.478233 0.1559455,-0.842106 0.1663418,-0.363873 0.4158545,-0.602989 0.259909,-0.249513 0.5717999,-0.374269 0.3118909,-0.124756 0.6133854,-0.124756 0.3534763,0 0.6445744,0.135152 0.3014945,0.135153 0.5094218,0.363873 0.2079272,0.218324 0.3222872,0.530215 0.11436,0.301494 0.11436,0.644574 0,0.374269 -0.1247564,0.738142 -0.1247563,0.363873 -0.3638726,0.654971 -0.22872,0.291098 -0.5614036,0.467836 -0.3222872,0.187134 -0.717349,0.187134 z"
          style={{ fontFamily: "SymbolPi" }}
          id="path2087"
        />
        <path
          d="m 15.5591,4.1771283 q 1.445094,0 2.671865,0.4782326 1.237167,0.4782327 2.120858,1.4139053 0.894087,0.9356726 1.393113,2.3079924 0.509421,1.3619235 0.509421,3.1397014 0,1.299545 -0.270305,2.443145 -0.270306,1.133204 -0.758935,2.089669 -0.478232,0.946069 -1.164392,1.694607 -0.68616,0.748538 -1.528265,1.268356 -0.831709,0.519818 -1.788175,0.790124 -0.956465,0.270305 -1.996101,0.270305 -1.424302,0 -2.661469,-0.478232 Q 10.849548,19.127097 9.934668,18.201821 9.0301845,17.266148 8.5103664,15.883432 7.9905483,14.500716 7.9905483,12.691749 q 0,-1.278753 0.2703054,-2.40156 Q 8.5311591,9.1569858 9.0197882,8.2109168 9.5188135,7.2648479 10.204973,6.5163098 10.90153,5.7677717 11.743635,5.2479536 12.58574,4.7281355 13.552602,4.45783 14.519464,4.1771283 15.5591,4.1771283 Z m -0.09357,14.5237177 q 0.998051,0 1.777778,-0.447043 0.790123,-0.45744 1.330734,-1.25796 0.551007,-0.810916 0.831709,-1.923327 0.291098,-1.122807 0.291098,-2.463938 0,-0.946069 -0.166342,-1.82976 Q 19.374565,9.8847311 19.07307,9.105004 18.771576,8.3148804 18.334929,7.670306 17.908678,7.0257315 17.357671,6.5578952 16.806664,6.0900589 16.151693,5.8301499 15.496722,5.5702408 14.748184,5.5702408 q -0.894087,0 -1.673815,0.4158545 -0.76933,0.4054581 -1.34113,1.1955817 -0.561404,0.7797271 -0.883691,1.9129306 -0.322287,1.1228074 -0.322287,2.5575054 0,1.382716 0.34308,2.661468 0.34308,1.268357 0.987654,2.245615 0.644575,0.977258 1.549058,1.559454 0.91488,0.582196 2.05848,0.582196 z"
          style={{ fontFamily: "SymbolPi" }}
          id="path2089"
        />
      </g>
    </svg>
  );
};

export default DecimalIcon;
