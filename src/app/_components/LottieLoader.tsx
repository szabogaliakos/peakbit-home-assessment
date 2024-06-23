"use client";

import React from "react";
import Player from "lottie-react";
import animationData from "@/public/loading.json";

const LottieLoader = ({ style }: any) => {
  return <Player autoplay={true} loop={true} animationData={animationData} style={style} />;
};

export default LottieLoader;
