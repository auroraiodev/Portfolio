"use client";

import { motion } from "framer-motion";

export const AuraBackground = () => {
  return (
    <div className="fog-container">
      <div className="fogwrapper">
        <div id="foglayer_01" className="fog">
          <div className="image01"></div>
          <div className="image02"></div>
        </div>
        <div id="foglayer_02" className="fog">
          <div className="image01"></div>
          <div className="image02"></div>
        </div>
        <div id="foglayer_03" className="fog">
          <div className="image01"></div>
          <div className="image02"></div>
        </div>
      </div>

      <style jsx>{`
        .fog-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          pointer-events: none;
          background-color: #000;
          overflow: hidden;
        }

        .fogwrapper {
          height: 100%;
          position: absolute;
          top: 0;
          width: 100%;
          filter: blur(1px) grayscale(0.2) saturate(1.2) sepia(0.2);
        }

        #foglayer_01, #foglayer_02, #foglayer_03 {
          height: 100%;
          position: absolute;
          width: 200%;
        }

        .image01, .image02 {
          float: left;
          height: 100%;
          width: 50%;
        }

        #foglayer_01 {
          animation: foglayer_01_opacity 10s linear infinite, foglayer_moveme 15s linear infinite;
        }
        #foglayer_02, #foglayer_03 {
          animation: foglayer_02_opacity 21s linear infinite, foglayer_moveme 13s linear infinite;
        }

        #foglayer_01 .image01, #foglayer_01 .image02 {
          background: url("https://raw.githubusercontent.com/danielstuart14/CSS_FOG_ANIMATION/master/fog1.png") center center/cover no-repeat transparent;
        }
        #foglayer_02 .image01, #foglayer_02 .image02,
        #foglayer_03 .image01, #foglayer_03 .image02 {
          background: url("https://raw.githubusercontent.com/danielstuart14/CSS_FOG_ANIMATION/master/fog2.png") center center/cover no-repeat transparent;
        }

        @keyframes foglayer_01_opacity {
          0% { opacity: .1; }
          22% { opacity: .5; }
          40% { opacity: .28; }
          58% { opacity: .4; }
          80% { opacity: .16; }
          100% { opacity: .1; }
        }

        @keyframes foglayer_02_opacity {
          0% { opacity: .5; }
          25% { opacity: .2; }
          50% { opacity: .1; }
          80% { opacity: .3; }
          100% { opacity: .5; }
        }

        @keyframes foglayer_03_opacity {
          0% { opacity: .8; }
          27% { opacity: .2; }
          52% { opacity: .6; }
          68% { opacity: .3; }
          100% { opacity: .8; }
        }

        @keyframes foglayer_moveme {
          0% { left: 0; }
          100% { left: -100%; }
        }

        @media (max-width: 767px) {
          .image01, .image02 {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};
