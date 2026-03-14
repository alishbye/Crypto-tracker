import React from "react";
import Lottie from "lottie-react";
import Crypto from "./Crypto.json";

const LottieLogo = () => {
  return (
    <div>
      <Lottie
        animationData={Crypto}
        loop={true}
        className="w-64 h-64 sm:h-80 sm:w-80 md:w-96 md:h-96 lg:w-90 lg:h-80 mb-11"
      />
    </div>
  );
};

export default LottieLogo;

