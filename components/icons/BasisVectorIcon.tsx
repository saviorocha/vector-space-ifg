import { useTheme } from "next-themes";
import React, { FunctionComponent, useEffect, useState } from "react";
import { CustomIconProps } from "../../interfaces/interfaces";

const BasisVectorIcon: FunctionComponent<CustomIconProps> = ({
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
      className="feather feather-airplay"
      version="1.1"
      id="svg16"
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
        aria-label="e"
        transform="scale(1.0216486,0.97881014)"
        id="text644"
        style={{
          fontSize: "28.5912px",
          lineHeight: 0,
          fontFamily: "Cambria Math",
          fill: logoColor ? logoColor : logoTheme,
          strokeWidth: 0.518327,
        }}
      >
        <path
          d="M 16.595462,12.512705 H 5.1059316 q 0,1.437936 0.432777,2.512898 0.4327769,1.061002 1.1866464,1.745068 0.7259485,0.670107 1.7171473,1.00516 1.0051594,0.335053 2.2057667,0.335053 1.591502,0 3.196965,-0.628225 1.619423,-0.642185 2.30349,-1.256449 h 0.139606 v 2.861912 q -1.326252,0.558422 -2.708346,0.935357 -1.382095,0.376935 -2.903794,0.376935 -3.8810322,0 -6.0588775,-2.094082 -2.1778453,-2.108043 -2.1778453,-5.975114 0,-3.8251903 2.0801214,-6.0728384 2.0940821,-2.247648 5.5004554,-2.247648 3.155084,0 4.85827,1.8427922 1.717148,1.8427922 1.717148,5.2352052 z m -2.55478,-2.010319 Q 14.026721,8.4362249 12.993641,7.3054207 11.974521,6.1746164 9.8804386,6.1746164 q -2.1080425,0 -3.3644918,1.2424886 -1.2424886,1.2424887 -1.4100152,3.085281 z"
          style={{
            fontFamily: "Verdana",
            fill: logoColor ? logoColor : logoTheme,
          }}
          id="path1759"
        />
      </g>
      <g
        aria-label="1"
        id="text1739"
        style={{
          fontSize: "10.5682px",
          lineHeight: 0,
          fontFamily: "Verdana",
          fill: logoColor ? logoColor : logoTheme,
          strokeWidth: 0.183476,
        }}
      >
        <path
          d="m 20.963108,20.872752 q 0,0.299294 0.03096,0.454102 0.03612,0.149647 0.118686,0.247692 0.08772,0.09288 0.247692,0.149647 0.159968,0.0516 0.4025,0.08256 0.242532,0.0258 0.639871,0.03612 v 0.376699 h -3.813427 v -0.376699 q 0.572788,-0.0258 0.81532,-0.06708 0.247692,-0.04644 0.376698,-0.134167 0.129007,-0.08772 0.185769,-0.247692 0.06192,-0.159968 0.06192,-0.521185 v -4.184966 q 0,-0.206411 -0.07224,-0.299295 -0.07224,-0.09804 -0.211571,-0.09804 -0.165128,0 -0.469583,0.170288 -0.304455,0.170289 -0.753397,0.469583 l -0.227051,-0.397339 2.414999,-1.439711 h 0.283814 q -0.03096,0.495384 -0.03096,1.372628 z"
          style={{
            fontFamily: "Cambria Math",
          }}
          id="path1762"
        />
      </g>
    </svg>
  );
};

export default BasisVectorIcon;
