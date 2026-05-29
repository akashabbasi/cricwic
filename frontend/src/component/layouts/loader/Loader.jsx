import React from "react";
import loaderSvg from "../../../Image/Loader-svg/LoaderBlack.svg";
import "./Loader.css";

const CricketBallLoader = () => (
  <div className="cricket-ball-loader">
    {/* <CricketBall className="spinner" /> */}
    <img src={loaderSvg} alt="Loading..." />
  </div>
);

export default CricketBallLoader;
