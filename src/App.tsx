import {
  useEffect,
  useRef,
  useState,
} from "react";
import { motion } from "framer-motion";

import "./App.scss";

import img, {
  fruit,
  touchEffect,
} from "./assets/img";
import { useStore } from "./utils/store";
import AnimatedNumber from "./utils/animated-number";
import { ITouchEffect } from "./utils/types";

const env = import.meta.env;
let timeoutId: number | NodeJS.Timeout;

function App() {
  const {
    coins,
    energy,
    level,
    coinIncrease,
    energyIncrease,
    setCoins,
    setEnergy,
    fetchUserData,
  } = useStore();
  const [touchEffects, setTouchEffecs] = useState<
    ITouchEffect[]
  >([]);
  const fruitRef = useRef<HTMLImageElement>(null);
  const fruitBoundingRect =
    fruitRef.current?.getBoundingClientRect();
  const [clickCount, setClickCount] = useState(0);
  const clickCountRef = useRef(clickCount);

  useEffect(() => {
    clickCountRef.current = clickCount;
  }, [clickCount]);
  useEffect(() => {
    fetchUserData(env.VITE_APP_USER_ID);
    const intervalId = setInterval(() => {
      coinIncrease();
      energyIncrease();
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [
    coinIncrease,
    energyIncrease,
    fetchUserData,
  ]);
  // appAxios.post(
  //   `/user_exit/${env.VITE_APP_USER_ID}?coins=${coins}&energy=${energy}`
  // );

  function handleClick(
    event: React.MouseEvent<HTMLImageElement>
  ) {
    if (energy) {
      if (
        fruitBoundingRect &&
        (touchEffects.length === 0 ||
          touchEffects[0]?.value <= clickCount)
      ) {
        setTouchEffecs([
          {
            value: clickCount + 1,
            icon: touchEffect[
              Math.floor(Math.random() * 2)
            ],
            y:
              event.clientY -
              fruitBoundingRect.top,
            x:
              event.clientX -
              fruitBoundingRect.left,
          },
        ]);
      }
      new Promise((resolve) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(resolve, 1000);
        setClickCount((prev) => prev + 1);
      }).then(() => {
        setCoins(coins + clickCountRef.current);
        setEnergy(energy - clickCountRef.current);
        setClickCount(0);
        setTouchEffecs([]);
      });
    }
  }
  function handleTouchStart(
    event: React.TouchEvent<HTMLImageElement>
  ) {
    if (
      fruitBoundingRect &&
      event.touches.length <= 3
    ) {
      setTouchEffecs(
        Object.values(event.touches).map(
          (touch, index) => {
            return {
              value: clickCount + (index + 1),
              icon: touchEffect[
                Math.floor(Math.random() * 2)
              ],
              y:
                touch.clientY -
                fruitBoundingRect.top,
              x:
                touch.clientX -
                fruitBoundingRect.left,
            };
          }
        )
      );
    }
  }

  const percentageEnergy = Math.round(
    energy >= env.VITE_APP_MAX_ENERGY
      ? 100
      : (energy * 100) / env.VITE_APP_MAX_ENERGY
  );
  return (
    <div className="app">
      <div className="coinsWrapper">
        <img
          className="coin"
          src={img.coin1}
        />
        <AnimatedNumber
          value={coins}
          className="coins"
        />
        <img
          className="blob_secondary"
          src={img.blob_secondary}
        />
      </div>
      <div
        className="fruitWrapper"
        ref={fruitRef}
      >
        <motion.img
          className="fruit"
          src={fruit[level as keyof typeof fruit]}
          onClick={handleClick}
          onTouchStart={handleTouchStart}
          whileTap={{
            scale: 0.9,
            rotate: -10,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
        />
        {touchEffects.map((item) => (
          <motion.div
            className="blobEffect"
            style={{
              top: item.y,
              left: item.x,
            }}
            initial={{
              scale: 1.1,
              opacity: 0,
              y: "-50%",
              x: "-50%",
              z: 50,
            }}
            animate={{
              scale: 1,
              opacity: 1,
              z: 0,
            }}
            transition={{
              duration: 0.5,
              repeat: 1,
              repeatType: "reverse",
            }}
            key={item.value}
          >
            <p className="plusCoins">{`+${item.value}`}</p>
            <img
              className="blob"
              src={item.icon}
            />
          </motion.div>
        ))}
      </div>
      <div className="energyWrapper">
        <p className="percent">{`Your Energy: ${percentageEnergy}%`}</p>
        <div className="progress">
          <div
            className="bar"
            style={{
              width: `${percentageEnergy}%`,
            }}
          >
            <AnimatedNumber
              value={energy}
              className="amount"
            />
          </div>
        </div>
      </div>

      <img
        className="blob_primary"
        src={img.blob_primary}
      />
      <img
        className="ellipse1"
        src={img.ellipse1}
      />
      <img
        className="ellipse2"
        src={img.ellipse2}
      />
      <img
        className="ellipse3"
        src={img.ellipse3}
      />
    </div>
  );
}

export default App;
