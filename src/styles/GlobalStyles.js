import { createGlobalStyle } from "styled-components";
import NanumSquareRound from "../static/fonts/NanumSquareRoundR.ttf";
import NanumSquareRoundEB from "../static/fonts/NanumSquareRoundEB.ttf";

export const GlobalStyles = createGlobalStyle`
@font-face {
    font-family: 'NanumSquareRound';
    src: url(${NanumSquareRound});
}
@font-face {
    font-family: 'NanumSquareRoundEB';
    src: url(${NanumSquareRoundEB});
}
  body {
    font-family: 'NanumSquareRound';
  }
  html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
    font-family: "NanumSquareRound";
}

input::placeholder {
    font-family: "NanumSquareRound";
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
html {
    margin: 0;
    padding: 0;
}
body {
	line-height: 1;
    width: 100%;
    margin: 0;
    padding: 0;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
a {
    text-decoration: none;
    color: inherit;
    &:visited {
        color: default;
    }
}
button {
    background-color: transparent;
    outline: 0;
    border: 0;
    margin: 0;
    padding: 0;
    cursor: pointer;
}
input[type="button"], input[type="submit"] {
    cursor: pointer;
}
input, input::placeholder {
    font-family: "NanumSquareRound";
}
input::placeholder {
    font-size: 0.8rem;
}
html {
            ${({ theme }) => theme.media.mobile} {
                font-size: 9px;
            }
            ${({ theme }) => theme.media.tablet} {
                font-size: 10px;
            }
            ${({ theme }) => theme.media.laptop1440} {
                font-size: 11px;
            }
            ${({ theme }) => theme.media.laptop1680} {
                font-size: 13px;
            }
        }
`;
