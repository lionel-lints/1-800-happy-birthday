import React from "react";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyleReset = createGlobalStyle`
  ${reset}

  /* Webfont: BradleyDJR-Display */
  @font-face {
    font-family: 'BradleyDisplay';
    src: url('../../assets/fonts/BradleyDJR-Display.ttf') format('truetype'); /* Safari, Android, iOS */
    font-style: normal;
    font-weight: normal;
    text-rendering: optimizeLegibility;
  }

  /* Webfont: BradleyDJR-Micro*/
  @font-face {
    font-family: 'BradleyMicro';
    src: url('../../assets/fonts/BradleyDJR-Micro.ttf') format('truetype'); /* Safari, Android, iOS */
    font-style: normal;
    font-weight: normal;
    text-rendering: optimizeLegibility;
  }

  /* Webfont: BradleyDJR-Regular*/
  @font-face {
    font-family: 'BradleyRegular';
    src: url('../../assets/fonts/BradleyDJR-Regular.ttf') format('truetype'); /* Safari, Android, iOS */
    font-style: normal;
    font-weight: normal;
    text-rendering: optimizeLegibility;
  }

  /* Webfont: BradleyDJR-Small*/
  @font-face {
    font-family: 'BradleySmall';
    src: url('../../assets/fonts/BradleyDJR-Small.ttf') format('truetype'); /* Safari, Android, iOS */
    font-style: normal;
    font-weight: normal;
    text-rendering: optimizeLegibility;
  }

  /* Webfont: BradleyDJR-Variable*/
  @font-face {
    font-family: 'BradleyVariable';
    src: url('../../assets/fonts/BradleyDJRVariable-VF.ttf') format('truetype'); /* Safari, Android, iOS */
    font-style: normal;
    font-weight: normal;
    text-rendering: optimizeLegibility;
  }

  /* Webfont: Pinyon Script */
  @font-face {
    font-family: 'Pinyon Script', cursive;
    src: url('../../assets/fonts/PinyonScript-Regular.ttf') format('truetype'); /* Safari, Android, iOS */
    font-style: normal;
    font-weight: normal;
    text-rendering: optimizeLegibility;
  }
`;

export default GlobalStyleReset;
