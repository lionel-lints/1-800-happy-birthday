import React from "react";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

import BradleyDisplay from "@/assets/fonts/BradleyDJR-Display.ttf";
import BradleyMicro from "@/assets/fonts/BradleyDJR-Micro.ttf";
import BradleyRegular from "@/assets/fonts/BradleyDJR-Regular.ttf";
import BradleySmall from "@/assets/fonts/BradleyDJR-Small.ttf";
import BradleyVariable from "@/assets/fonts/BradleyDJRVariable-VF.ttf";
import PinionScript from "@/assets/fonts/PinyonScript-Regular.ttf";

import MontserratExtraBold from "@/assets/fonts/Montserrat-ExtraBold.ttf";
import MontserratMedium from "@/assets/fonts/Montserrat-Medium.ttf";

const GlobalStyleReset = createGlobalStyle`
  ${reset}

  /* Webfont: MontserratExtraBold */
  @font-face {
    font-family: 'MontserratExtraBold';
    src: url('${MontserratExtraBold}') format('truetype'); /* Safari, Android, iOS */
    font-style: normal;
    font-weight: normal;
    text-rendering: optimizeLegibility;
  }

  /* Webfont: MontserratMedium*/
  @font-face {
    font-family: 'MontserratMedium';
    src: url('${MontserratMedium}') format('truetype'); /* Safari, Android, iOS */
    font-style: normal;
    font-weight: normal;
    text-rendering: optimizeLegibility;
  }

  /* Webfont: BradleyDJR-Display */
  @font-face {
    font-family: 'BradleyDisplay';
    src: url('${BradleyDisplay}') format('truetype'); /* Safari, Android, iOS */
    font-style: normal;
    font-weight: normal;
    text-rendering: optimizeLegibility;
  }

  /* Webfont: BradleyDJR-Micro*/
  @font-face {
    font-family: 'BradleyMicro';
    src: url('${BradleyMicro}') format('truetype'); /* Safari, Android, iOS */
    font-style: normal;
    font-weight: normal;
    text-rendering: optimizeLegibility;
  }

  /* Webfont: BradleyDJR-Regular*/
  @font-face {
    font-family: 'BradleyRegular';
    src: url('${BradleyRegular}') format('truetype'); /* Safari, Android, iOS */
    font-style: normal;
    font-weight: normal;
    text-rendering: optimizeLegibility;
  }

  /* Webfont: BradleyDJR-Small*/
  @font-face {
    font-family: 'BradleySmall';
    src: url('${BradleySmall}') format('truetype'); /* Safari, Android, iOS */
    font-style: normal;
    font-weight: normal;
    text-rendering: optimizeLegibility;
  }

  /* Webfont: BradleyDJR-Variable*/
  @font-face {
    font-family: 'BradleyVariable';
    src: url('${BradleyVariable}') format('truetype'); /* Safari, Android, iOS */
    font-style: normal;
    font-weight: normal;
    text-rendering: optimizeLegibility;
  }

  /* Webfont: Pinyon Script */
  @font-face {
    font-family: 'Pinyon Script', cursive;
    src: url('${PinionScript}') format('truetype'); /* Safari, Android, iOS */
    font-style: normal;
    font-weight: normal;
    text-rendering: optimizeLegibility;
  }

`;

export default GlobalStyleReset;
