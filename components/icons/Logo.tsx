import { useTheme } from "next-themes";
import React, { FunctionComponent, useEffect, useState } from "react";
import { LogoProps } from "../../interfaces/interfaces";

const Logo: FunctionComponent<LogoProps> = ({ className }) => {
  const { theme, setTheme } = useTheme();
  const [logoTheme, setLogoTheme] = useState("#ffffff");

  //   useEffect(() => {
  //     setLogoTheme(theme === "dark" ? "dark" : "light");
  //   }, [theme]);

  return (
    <svg
      version="1.1"
      id="Layer_1"
      x="0px"
      y="0px"
      viewBox="0 0 511.999 511.999"
      xmlSpace="preserve"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs id="defs113" />

      <g id="g30"></g>

      <g id="g2892" style={{ fill: logoTheme }}>
        <g
          id="g28"
          transform="rotate(-60,256.00005,255.99931)"
          style={{ fill: logoTheme }}
        >
          <path
            d="M 255.998,0 34.297,128 v 255.999 l 221.703,128 221.703,-128 V 128 Z M 240.473,467.179 65.35,366.071 V 163.856 L 240.473,264.964 Z M 255.998,238.072 80.876,136.964 255.998,35.856 431.121,136.964 Z m 15.527,229.107 V 264.963 L 446.647,163.855 v 202.216 h 0.001 z"
            id="path26"
            style={{ fill: logoTheme }}
          />
        </g>
        <path
          style={{ fill: logoTheme }}
          d="m 147.05604,161.06137 58.82241,9.80374"
          id="path1437"
        />
        <path
          style={{ fill: logoTheme }}
          d="M 198.87578,86.833089 303.91581,159.66084"
          id="path1439"
        />
        <g
          id="g770"
          transform="rotate(-90,256.00007,255.99938)"
          style={{ fill: logoTheme }}
        >
          <g
            id="g36"
            transform="matrix(0.50768399,0.27892558,-0.29311148,0.48311329,187.65171,61.374872)"
            style={{ fill: logoTheme }}
          >
            <g id="g34" style={{ fill: logoTheme }}>
              <path
                id="rect32"
                transform="matrix(0.866,-0.5,0.5,0.866,-111.4352,144.5599)"
                d="m 199.914,264.689 h 28.226 v 31.052 h -28.226 z"
                style={{ fill: logoTheme }}
              />
            </g>
          </g>
          <g
            id="g42"
            transform="matrix(0.50768399,0.27892558,-0.29311148,0.48311329,187.65171,61.374872)"
            style={{ fill: logoTheme }}
          >
            <g id="g40" style={{ fill: logoTheme }}>
              <path
                id="rect38"
                transform="matrix(0.866,-0.5,0.5,0.866,-163.1138,92.8945)"
                d="M 77.668999,335.289 H 105.895 v 31.052 H 77.668999 Z"
                style={{ fill: logoTheme }}
              />
            </g>
          </g>
          <g
            id="g48"
            transform="matrix(0.50768399,0.27892558,-0.29311148,0.48311329,187.65171,61.374872)"
            style={{ fill: logoTheme }}
          >
            <g id="g46" style={{ fill: logoTheme }}>
              <path
                id="rect44"
                transform="matrix(0.866,-0.5,0.5,0.866,-128.6691,127.341)"
                d="m 159.168,288.23801 h 28.226 v 31.052 h -28.226 z"
                style={{ fill: logoTheme }}
              />
            </g>
          </g>
          <g
            id="g54"
            transform="matrix(0.50768399,0.27892558,-0.29311148,0.48311329,187.65171,61.374872)"
            style={{ fill: logoTheme }}
          >
            <g id="g52" style={{ fill: logoTheme }}>
              <path
                id="rect50"
                transform="matrix(0.866,-0.5,0.5,0.866,-145.888,110.1181)"
                d="m 118.42,311.75601 h 28.226 v 31.052 H 118.42 Z"
                style={{ fill: logoTheme }}
              />
            </g>
          </g>
          <g
            id="g36-7"
            transform="matrix(0.50768399,0.27892558,-0.29311148,0.48311329,78.039224,61.780215)"
            style={{ fill: logoTheme }}
          >
            <g
              id="g34-7"
              transform="translate(-3.8405633,2.2173502)"
              style={{ fill: logoTheme }}
            >
              <path
                id="rect32-3"
                transform="matrix(0.866,-0.5,0.5,0.866,-111.4352,144.5599)"
                d="m 199.914,264.689 h 28.226 v 31.052 h -28.226 z"
                style={{ fill: logoTheme }}
              />
            </g>
          </g>
          <g
            id="g36-7-7"
            transform="matrix(0.11831289,0.54637179,-0.57415975,0.11258683,199.01402,109.13962)"
            style={{ fill: logoTheme }}
          >
            <g
              id="g34-7-3"
              transform="translate(-3.8405633,2.2173502)"
              style={{ fill: logoTheme }}
            >
              <path
                id="rect32-3-2"
                transform="matrix(0.866,-0.5,0.5,0.866,-111.4352,144.5599)"
                d="m 199.914,264.689 h 28.226 v 31.052 h -28.226 z"
                style={{ fill: logoTheme }}
              />
            </g>
          </g>
          <g
            id="g42-3"
            transform="matrix(-0.54851929,0.19683215,-0.20684286,-0.52197225,228.50143,370.6263)"
            style={{ fill: logoTheme }}
          >
            <g id="g40-7" style={{ fill: logoTheme }}>
              <path
                id="rect38-6"
                transform="matrix(0.866,-0.5,0.5,0.866,-163.1138,92.8945)"
                d="M 77.668999,335.289 H 105.895 v 31.052 H 77.668999 Z"
                style={{ fill: logoTheme }}
              />
            </g>
          </g>
          <g
            id="g48-2"
            transform="matrix(0.50768399,0.27892558,-0.29311148,0.48311329,71.53992,61.780215)"
            style={{ fill: logoTheme }}
          >
            <g
              id="g46-7"
              transform="translate(-4.7524546,2.7438309)"
              style={{ fill: logoTheme }}
            >
              <path
                id="rect44-7"
                transform="matrix(0.866,-0.5,0.5,0.866,-128.6691,127.341)"
                d="m 159.168,288.23801 h 28.226 v 31.052 h -28.226 z"
                style={{ fill: logoTheme }}
              />
            </g>
            <g
              id="g46-7-3"
              transform="rotate(36.572585,195.16967,281.74428)"
              style={{ fill: logoTheme }}
            >
              <path
                id="rect44-7-5"
                transform="matrix(0.866,-0.5,0.5,0.866,-128.6691,127.341)"
                d="m 159.168,288.23801 h 28.226 v 31.052 h -28.226 z"
                style={{ fill: logoTheme }}
              />
            </g>
            <g
              id="g46-7-3-4"
              transform="matrix(-0.1144618,-0.99342765,-0.99342765,0.1144618,505.44003,457.41644)"
              style={{ fill: logoTheme }}
            >
              <path
                id="rect44-7-5-1"
                transform="matrix(0.866,-0.5,0.5,0.866,-128.6691,127.341)"
                d="m 159.168,288.23801 h 28.226 v 31.052 h -28.226 z"
                style={{ fill: logoTheme }}
              />
            </g>
          </g>
          <g
            id="g54-2"
            transform="matrix(-0.54851929,0.19683215,-0.20684286,-0.52197225,228.50143,370.6263)"
            style={{ fill: logoTheme }}
          >
            <g id="g52-1" style={{ fill: logoTheme }}>
              <path
                id="rect50-4"
                transform="matrix(0.866,-0.5,0.5,0.866,-145.888,110.1181)"
                d="m 118.42,311.75601 h 28.226 v 31.052 H 118.42 Z"
                style={{ fill: logoTheme }}
              />
            </g>
          </g>
          <g
            id="g42-3-6"
            transform="matrix(-0.55368857,-0.1832578,-0.19257812,0.52689136,224.53175,139.89797)"
            style={{ fill: logoTheme }}
          >
            <g id="g40-7-5" style={{ fill: logoTheme }}>
              <path
                id="rect38-6-3"
                transform="matrix(0.866,-0.5,0.5,0.866,-163.1138,92.8945)"
                d="M 77.668999,335.289 H 105.895 v 31.052 H 77.668999 Z"
                style={{ fill: logoTheme }}
              />
            </g>
          </g>
          <g
            id="g54-2-5"
            transform="matrix(-0.55368857,-0.1832578,-0.19257812,0.52689136,227.60571,137.92948)"
            style={{ fill: logoTheme }}
          >
            <g id="g52-1-0" style={{ fill: logoTheme }}>
              <path
                id="rect50-4-8"
                style={{ strokeWidth: 0.999978, fill: logoTheme }}
                transform="rotate(-30.000728)"
                d="M -62.227238,340.44278 H -34.00186 V 371.4941 H -62.227238 Z"
              />
            </g>
          </g>
        </g>
        <g
          id="g770-2"
          transform="rotate(29.21633,258.54568,258.54011)"
          style={{ fill: logoTheme }}
        >
          <g
            id="g36-8"
            transform="matrix(0.50768399,0.27892558,-0.29311148,0.48311329,187.65171,61.374872)"
            style={{ fill: logoTheme }}
          >
            <g id="g34-4" style={{ fill: logoTheme }}>
              <path
                id="rect32-6"
                transform="matrix(0.866,-0.5,0.5,0.866,-111.4352,144.5599)"
                d="m 199.914,264.689 h 28.226 v 31.052 h -28.226 z"
                style={{ fill: logoTheme }}
              />
            </g>
          </g>
          <g
            id="g42-6"
            transform="matrix(0.50768399,0.27892558,-0.29311148,0.48311329,187.65171,61.374872)"
            style={{ fill: logoTheme }}
          >
            <g id="g40-4" style={{ fill: logoTheme }}>
              <path
                id="rect38-0"
                transform="matrix(0.866,-0.5,0.5,0.866,-163.1138,92.8945)"
                d="M 77.668999,335.289 H 105.895 v 31.052 H 77.668999 Z"
                style={{ fill: logoTheme }}
              />
            </g>
          </g>
          <g
            id="g48-9"
            transform="matrix(0.50768399,0.27892558,-0.29311148,0.48311329,187.65171,61.374872)"
            style={{ fill: logoTheme }}
          >
            <g id="g46-3" style={{ fill: logoTheme }}>
              <path
                id="rect44-5"
                transform="matrix(0.866,-0.5,0.5,0.866,-128.6691,127.341)"
                d="m 159.168,288.23801 h 28.226 v 31.052 h -28.226 z"
                style={{ fill: logoTheme }}
              />
            </g>
          </g>
          <g
            id="g54-7"
            transform="matrix(0.50768399,0.27892558,-0.29311148,0.48311329,187.65171,61.374872)"
            style={{ fill: logoTheme }}
          >
            <g id="g52-8" style={{ fill: logoTheme }}>
              <path
                id="rect50-3"
                transform="matrix(0.866,-0.5,0.5,0.866,-145.888,110.1181)"
                d="m 118.42,311.75601 h 28.226 v 31.052 H 118.42 Z"
                style={{ fill: logoTheme }}
              />
            </g>
          </g>
          <g
            id="g36-7-6"
            transform="matrix(0.50768399,0.27892558,-0.29311148,0.48311329,78.039224,61.780215)"
            style={{ fill: logoTheme }}
          >
            <g
              id="g34-7-7"
              transform="translate(-3.8405633,2.2173502)"
              style={{ fill: logoTheme }}
            >
              <path
                id="rect32-3-8"
                transform="matrix(0.866,-0.5,0.5,0.866,-111.4352,144.5599)"
                d="m 199.914,264.689 h 28.226 v 31.052 h -28.226 z"
                style={{ fill: logoTheme }}
              />
            </g>
          </g>
          <g
            id="g36-7-7-5"
            transform="matrix(0.11831289,0.54637179,-0.57415975,0.11258683,199.01402,109.13962)"
            style={{ fill: logoTheme }}
          >
            <g
              id="g34-7-3-7"
              transform="translate(-3.8405633,2.2173502)"
              style={{ fill: logoTheme }}
            >
              <path
                id="rect32-3-2-9"
                transform="matrix(0.866,-0.5,0.5,0.866,-111.4352,144.5599)"
                d="m 199.914,264.689 h 28.226 v 31.052 h -28.226 z"
                style={{ fill: logoTheme }}
              />
            </g>
          </g>
          <g
            id="g42-3-3"
            transform="matrix(-0.54851929,0.19683215,-0.20684286,-0.52197225,228.50143,370.6263)"
            style={{ fill: logoTheme }}
          >
            <g id="g40-7-3" style={{ fill: logoTheme }}>
              <path
                id="rect38-6-7"
                transform="matrix(0.866,-0.5,0.5,0.866,-163.1138,92.8945)"
                d="M 77.668999,335.289 H 105.895 v 31.052 H 77.668999 Z"
                style={{ fill: logoTheme }}
              />
            </g>
          </g>
          <g
            id="g48-2-7"
            transform="matrix(0.50768399,0.27892558,-0.29311148,0.48311329,71.53992,61.780215)"
            style={{ fill: logoTheme }}
          >
            <g
              id="g46-7-35"
              transform="translate(-4.7524546,2.7438309)"
              style={{ fill: logoTheme }}
            >
              <path
                id="rect44-7-0"
                transform="matrix(0.866,-0.5,0.5,0.866,-128.6691,127.341)"
                d="m 159.168,288.23801 h 28.226 v 31.052 h -28.226 z"
                style={{ fill: logoTheme }}
              />
            </g>
            <g
              id="g46-7-3-2"
              transform="rotate(36.572585,195.16967,281.74428)"
              style={{ fill: logoTheme }}
            >
              <path
                id="rect44-7-5-3"
                transform="matrix(0.866,-0.5,0.5,0.866,-128.6691,127.341)"
                d="m 159.168,288.23801 h 28.226 v 31.052 h -28.226 z"
                style={{ fill: logoTheme }}
              />
            </g>
            <g
              id="g46-7-3-4-2"
              transform="matrix(-0.1144618,-0.99342765,-0.99342765,0.1144618,505.44003,457.41644)"
              style={{ fill: logoTheme }}
            >
              <path
                id="rect44-7-5-1-2"
                transform="matrix(0.866,-0.5,0.5,0.866,-128.6691,127.341)"
                d="m 159.168,288.23801 h 28.226 v 31.052 h -28.226 z"
                style={{ fill: logoTheme }}
              />
            </g>
          </g>
          <g
            id="g54-2-2"
            transform="matrix(-0.54851929,0.19683215,-0.20684286,-0.52197225,228.50143,370.6263)"
            style={{ fill: logoTheme }}
          >
            <g id="g52-1-07" style={{ fill: logoTheme }}>
              <path
                id="rect50-4-6"
                transform="matrix(0.866,-0.5,0.5,0.866,-145.888,110.1181)"
                d="m 118.42,311.75601 h 28.226 v 31.052 H 118.42 Z"
                style={{ fill: logoTheme }}
              />
            </g>
          </g>
          <g
            id="g42-3-6-5"
            transform="matrix(-0.55368857,-0.1832578,-0.19257812,0.52689136,224.53175,139.89797)"
            style={{ fill: logoTheme }}
          >
            <g id="g40-7-5-2" style={{ fill: logoTheme }}>
              <path
                id="rect38-6-3-2"
                transform="matrix(0.866,-0.5,0.5,0.866,-163.1138,92.8945)"
                d="M 77.668999,335.289 H 105.895 v 31.052 H 77.668999 Z"
                style={{ fill: logoTheme }}
              />
            </g>
          </g>
          <g
            id="g54-2-5-0"
            transform="matrix(-0.55368857,-0.1832578,-0.19257812,0.52689136,227.60571,137.92948)"
            style={{ fill: logoTheme }}
          >
            <g id="g52-1-0-2" style={{ fill: logoTheme }}>
              <path
                id="rect50-4-8-2"
                style={{ strokeWidth: 0.999978, fill: logoTheme }}
                transform="rotate(-30.000728)"
                d="M -62.227238,340.44278 H -34.00186 V 371.4941 H -62.227238 Z"
              />
            </g>
          </g>
        </g>
        <g
          id="g770-2-1"
          transform="rotate(150.44529,255.28819,256.07071)"
          style={{ fill: logoTheme }}
        >
          <g
            id="g36-8-6"
            transform="matrix(0.50768399,0.27892558,-0.29311148,0.48311329,187.65171,61.374872)"
            style={{ fill: logoTheme }}
          >
            <g id="g34-4-0" style={{ fill: logoTheme }}>
              <path
                id="rect32-6-0"
                transform="matrix(0.866,-0.5,0.5,0.866,-111.4352,144.5599)"
                d="m 199.914,264.689 h 28.226 v 31.052 h -28.226 z"
                style={{ fill: logoTheme }}
              />
            </g>
          </g>
          <g
            id="g42-6-1"
            transform="matrix(0.50768399,0.27892558,-0.29311148,0.48311329,187.65171,61.374872)"
            style={{ fill: logoTheme }}
          >
            <g id="g40-4-3" style={{ fill: logoTheme }}>
              <path
                id="rect38-0-5"
                transform="matrix(0.866,-0.5,0.5,0.866,-163.1138,92.8945)"
                d="M 77.668999,335.289 H 105.895 v 31.052 H 77.668999 Z"
                style={{ fill: logoTheme }}
              />
            </g>
          </g>
          <g
            id="g48-9-1"
            transform="matrix(0.50768399,0.27892558,-0.29311148,0.48311329,187.65171,61.374872)"
            style={{ fill: logoTheme }}
          >
            <g id="g46-3-3" style={{ fill: logoTheme }}>
              <path
                id="rect44-5-1"
                transform="matrix(0.866,-0.5,0.5,0.866,-128.6691,127.341)"
                d="m 159.168,288.23801 h 28.226 v 31.052 h -28.226 z"
                style={{ fill: logoTheme }}
              />
            </g>
          </g>
          <g
            id="g54-7-1"
            transform="matrix(0.50768399,0.27892558,-0.29311148,0.48311329,187.65171,61.374872)"
            style={{ fill: logoTheme }}
          >
            <g id="g52-8-8" style={{ fill: logoTheme }}>
              <path
                id="rect50-3-1"
                transform="matrix(0.866,-0.5,0.5,0.866,-145.888,110.1181)"
                d="m 118.42,311.75601 h 28.226 v 31.052 H 118.42 Z"
                style={{ fill: logoTheme }}
              />
            </g>
          </g>
          <g
            id="g36-7-6-4"
            transform="matrix(0.50768399,0.27892558,-0.29311148,0.48311329,78.039224,61.780215)"
            style={{ fill: logoTheme }}
          >
            <g
              id="g34-7-7-9"
              transform="translate(-3.8405633,2.2173502)"
              style={{ fill: logoTheme }}
            >
              <path
                id="rect32-3-8-4"
                transform="matrix(0.866,-0.5,0.5,0.866,-111.4352,144.5599)"
                d="m 199.914,264.689 h 28.226 v 31.052 h -28.226 z"
                style={{ fill: logoTheme }}
              />
            </g>
          </g>
          <g
            id="g36-7-7-5-2"
            transform="matrix(0.11831289,0.54637179,-0.57415975,0.11258683,199.01402,109.13962)"
            style={{ fill: logoTheme }}
          >
            <g
              id="g34-7-3-7-9"
              transform="translate(-3.8405633,2.2173502)"
              style={{ fill: logoTheme }}
            >
              <path
                id="rect32-3-2-9-7"
                transform="matrix(0.866,-0.5,0.5,0.866,-111.4352,144.5599)"
                d="m 199.914,264.689 h 28.226 v 31.052 h -28.226 z"
                style={{ fill: logoTheme }}
              />
            </g>
          </g>
          <g
            id="g42-3-3-0"
            transform="matrix(-0.54851929,0.19683215,-0.20684286,-0.52197225,228.50143,370.6263)"
            style={{ fill: logoTheme }}
          >
            <g id="g40-7-3-7" style={{ fill: logoTheme }}>
              <path
                id="rect38-6-7-4"
                transform="matrix(0.866,-0.5,0.5,0.866,-163.1138,92.8945)"
                d="M 77.668999,335.289 H 105.895 v 31.052 H 77.668999 Z"
                style={{ fill: logoTheme }}
              />
            </g>
          </g>
          <g
            id="g48-2-7-8"
            transform="matrix(0.50768399,0.27892558,-0.29311148,0.48311329,71.53992,61.780215)"
            style={{ fill: logoTheme }}
          >
            <g
              id="g46-7-35-8"
              transform="translate(-4.7524546,2.7438309)"
              style={{ fill: logoTheme }}
            >
              <path
                id="rect44-7-0-3"
                transform="matrix(0.866,-0.5,0.5,0.866,-128.6691,127.341)"
                d="m 159.168,288.23801 h 28.226 v 31.052 h -28.226 z"
                style={{ fill: logoTheme }}
              />
            </g>
            <g
              id="g46-7-3-2-0"
              transform="rotate(36.572585,195.16967,281.74428)"
              style={{ fill: logoTheme }}
            >
              <path
                id="rect44-7-5-3-9"
                transform="matrix(0.866,-0.5,0.5,0.866,-128.6691,127.341)"
                d="m 159.168,288.23801 h 28.226 v 31.052 h -28.226 z"
                style={{ fill: logoTheme }}
              />
            </g>
            <g
              id="g46-7-3-4-2-1"
              transform="matrix(-0.1144618,-0.99342765,-0.99342765,0.1144618,505.44003,457.41644)"
              style={{ fill: logoTheme }}
            >
              <path
                id="rect44-7-5-1-2-6"
                transform="matrix(0.866,-0.5,0.5,0.866,-128.6691,127.341)"
                d="m 159.168,288.23801 h 28.226 v 31.052 h -28.226 z"
                style={{ fill: logoTheme }}
              />
            </g>
          </g>
          <g
            id="g54-2-2-8"
            transform="matrix(-0.54851929,0.19683215,-0.20684286,-0.52197225,228.50143,370.6263)"
            style={{ fill: logoTheme }}
          >
            <g id="g52-1-07-4" style={{ fill: logoTheme }}>
              <path
                id="rect50-4-6-8"
                transform="matrix(0.866,-0.5,0.5,0.866,-145.888,110.1181)"
                d="m 118.42,311.75601 h 28.226 v 31.052 H 118.42 Z"
                style={{ fill: logoTheme }}
              />
            </g>
          </g>
          <g
            id="g42-3-6-5-7"
            transform="matrix(-0.55368857,-0.1832578,-0.19257812,0.52689136,224.53175,139.89797)"
            style={{ fill: logoTheme }}
          >
            <g id="g40-7-5-2-8" style={{ fill: logoTheme }}>
              <path
                id="rect38-6-3-2-1"
                transform="matrix(0.866,-0.5,0.5,0.866,-163.1138,92.8945)"
                d="M 77.668999,335.289 H 105.895 v 31.052 H 77.668999 Z"
                style={{ fill: logoTheme }}
              />
            </g>
          </g>
          <g
            id="g54-2-5-0-9"
            transform="matrix(-0.55368857,-0.1832578,-0.19257812,0.52689136,227.60571,137.92948)"
            style={{ fill: logoTheme }}
          >
            <g id="g52-1-0-2-1" style={{ fill: logoTheme }}>
              <path
                id="rect50-4-8-2-4"
                style={{ strokeWidth: 0.999978, fill: logoTheme }}
                transform="rotate(-30.000728)"
                d="M -62.227238,340.44278 H -34.00186 V 371.4941 H -62.227238 Z"
              />
            </g>
          </g>
        </g>
      </g>

      <g id="g80"></g>
      <g id="g82"></g>
      <g id="g84"></g>
      <g id="g86"></g>
      <g id="g88"></g>
      <g id="g90"></g>
      <g id="g92"></g>
      <g id="g94"></g>
      <g id="g96"></g>
      <g id="g98"></g>
      <g id="g100"></g>
      <g id="g102"></g>
      <g id="g104"></g>
      <g id="g106"></g>
      <g id="g108"></g>
    </svg>
  );
};

export default Logo;
