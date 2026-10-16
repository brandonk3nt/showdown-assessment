import React, { useEffect, useState } from "react";
import "./styles.css";

export const MirageLoader = ({
  size = 80,
  color = '#000000',
  speed = 2.5,
  className = '',
  vertical = false,
  center = false,
  showMessaging = false,
}) => {
  const sizeInt = parseInt(size + '', 10);
  const scaledSize = sizeInt * 1.25;
  const width = scaledSize / 0.23
  const height = scaledSize;
  const fontSize = Math.min(24, Math.max(11, height));
  const [shouldShowText, setShouldShowText] = useState(false);

  useEffect(() => {
    const waitId = setTimeout(() => setShouldShowText(true), 2000);
    return () => clearTimeout(waitId);
  }, []);

  return (
    <div
      className={["mirage-wrapper", className].join(' ').trim()}
      style={{
        '--uib-font-size': fontSize + 'px',
        '--uib-size': width + 'px',
        '--uib-color': color,
        '--uib-speed': speed + 's',
        '--uib-direction': !vertical ? 'row' : 'column',
        '--uib-justify': !center ? 'start' : 'center',
      }}
    >
      <div
        className={"mirage-container"}
      >
        <div className="mirage-inner">
          <svg
            className="mirage-svg"
            x="0px"
            y="0px"
            viewBox={`0 0 ${width} ${height}`}
            height={height}
            width={width}
            preserveAspectRatio="xMidYMid meet"
          >
            <circle className="mirage-dot" />
            <circle className="mirage-dot" />
            <circle className="mirage-dot" />
            <circle className="mirage-dot" />
            <circle className="mirage-dot" />
            <defs>
              <filter id="uib-mirage-filter">
                <feGaussianBlur
                  in="SourceGraphic"
                  stdDeviation={width / 20}
                  result="blur"
                />
                <feColorMatrix
                  in="blur"
                  mode="matrix"
                  values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                  result="ooze"
                />
                <feBlend in="SourceGraphic" in2="ooze" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>

      { showMessaging
        ? <span className={["mirage-text", shouldShowText ? 'mirage-text--show' : ''].join(' ').trim()}>
            Still thinking...
          </span>
        : null
      }
    </div>
  );
};

export default MirageLoader;
