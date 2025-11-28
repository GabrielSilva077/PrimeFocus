import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PercentCounter({
  finalValue = 60,
  duration = 2000,
  showPercent = true,
}) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);

  const startCounting = () => {
    let start = 0;
    const end = finalValue;
    const totalMs = duration;
    const incrementTime = 20;

    const step = end / (totalMs / incrementTime);

    const interval = setInterval(() => {
      start += step;

      if (start >= end) {
        start = end;
        clearInterval(interval);
      }

      setValue(Math.floor(start));
    }, incrementTime);
  };

  useEffect(() => {
    // Trigger quando entrar na tela
    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: "top 80%", // ativa quando 20% já está visível
      onEnter: () => startCounting(),
      once: true, // só conta 1 vez
    });

    return () => trigger.kill();
  }, []);

  return (
    <h1
      ref={ref}
      style={{
        fontSize: "50px",
        color: "#614238",
        fontWeight: "bold",
      }}
    >
      {value}
      {showPercent && "%"}
    </h1>
  );
}
