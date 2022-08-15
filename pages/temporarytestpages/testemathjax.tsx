import { re } from "mathjs";
import React, { useEffect } from "react";

const TesteMathjax = ({ teste }) => {
  useEffect(() => {
    console.log("props:", teste);
  }, []);

  return (
    <>
      <div>TesteMathjax</div>

        <svg
        //   style="vertical-align: -1.814ex;"
          xmlns="http://www.w3.org/2000/svg"
          width="7.174ex"
          height="4.851ex"
          role="img"
          focusable="false"
          viewBox="0 -1342 3171 2143.9"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <defs>
            <path
              id="MJX-1-TEX-N-31"
              d="M213 578L200 573Q186 568 160 563T102 556H83V602H102Q149 604 189 617T245 641T273 663Q275 666 285 666Q294 666 302 660V361L303 61Q310 54 315 52T339 48T401 46H427V0H416Q395 3 257 3Q121 3 100 0H88V46H114Q136 46 152 46T177 47T193 50T201 52T207 57T213 61V578Z"
            ></path>
            <path
              id="MJX-1-TEX-I-1D465"
              d="M52 289Q59 331 106 386T222 442Q257 442 286 424T329 379Q371 442 430 442Q467 442 494 420T522 361Q522 332 508 314T481 292T458 288Q439 288 427 299T415 328Q415 374 465 391Q454 404 425 404Q412 404 406 402Q368 386 350 336Q290 115 290 78Q290 50 306 38T341 26Q378 26 414 59T463 140Q466 150 469 151T485 153H489Q504 153 504 145Q504 144 502 134Q486 77 440 33T333 -11Q263 -11 227 52Q186 -10 133 -10H127Q78 -10 57 16T35 71Q35 103 54 123T99 143Q142 143 142 101Q142 81 130 66T107 46T94 41L91 40Q91 39 97 36T113 29T132 26Q168 26 194 71Q203 87 217 139T245 247T261 313Q266 340 266 352Q266 380 251 392T217 404Q177 404 142 372T93 290Q91 281 88 280T72 278H58Q52 284 52 289Z"
            ></path>
            <path
              id="MJX-1-TEX-N-32"
              d="M109 429Q82 429 66 447T50 491Q50 562 103 614T235 666Q326 666 387 610T449 465Q449 422 429 383T381 315T301 241Q265 210 201 149L142 93L218 92Q375 92 385 97Q392 99 409 186V189H449V186Q448 183 436 95T421 3V0H50V19V31Q50 38 56 46T86 81Q115 113 136 137Q145 147 170 174T204 211T233 244T261 278T284 308T305 340T320 369T333 401T340 431T343 464Q343 527 309 573T212 619Q179 619 154 602T119 569T109 550Q109 549 114 549Q132 549 151 535T170 489Q170 464 154 447T109 429Z"
            ></path>
            <path
              id="MJX-1-TEX-N-2212"
              d="M84 237T84 250T98 270H679Q694 262 694 250T679 230H98Q84 237 84 250Z"
            ></path>
          </defs>
          <g
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            transform="scale(1,-1)"
          >
            <g data-mml-node="math">
              <g data-mml-node="mfrac">
                <g data-mml-node="mn" transform="translate(1335.5,676)">
                  <use data-c="31" xmlnsXlink="#MJX-1-TEX-N-31"></use>
                </g>
                <g data-mml-node="mrow" transform="translate(220,-719.9)">
                  <g data-mml-node="msup">
                    <g data-mml-node="mi">
                      <use data-c="1D465" xmlnsXlink="#MJX-1-TEX-I-1D465"></use>
                    </g>
                    <g
                      data-mml-node="mn"
                      transform="translate(605,289) scale(0.707)"
                    >
                      <use data-c="32" xmlnsXlink="#MJX-1-TEX-N-32"></use>
                    </g>
                  </g>
                  <g data-mml-node="mo" transform="translate(1230.8,0)">
                    <use data-c="2212" xmlnsXlink="#MJX-1-TEX-N-2212"></use>
                  </g>
                  <g data-mml-node="mn" transform="translate(2231,0)">
                    <use data-c="31" xmlnsXlink="#MJX-1-TEX-N-31"></use>
                  </g>
                </g>
                <rect width="2931" height="60" x="120" y="220"></rect>
              </g>
            </g>
          </g>
        </svg>
    </>
  );
};
export async function getStaticProps() {
  // prettier-ignore
  const svg = require("mathjax")
    .init({
      loader: { load: ["input/tex", "output/svg"] },
    }).then((MathJax: any) => {
      const svg = MathJax.tex2svg("\\frac{1}{x^2-1}", { display: true });
      console.log(MathJax.startup.adaptor.outerHTML(svg));
      console.log(svg);
      
      return MathJax.startup.adaptor.outerHTML(svg);
    }).catch((err: any) => console.log(err.message));
  // console.log(svg)

  return {
    props: {
      teste: "svg",
    },
  };
}
export default TesteMathjax;
