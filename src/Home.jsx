import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import jaqueta from "./assets/jaquetaH2.png";
import "./layout/home.css";
import insta from "./assets/instagram.png";
import git from "./assets/github.png";
import link from "./assets/linkedin.png";

function Home() {
  useLayoutEffect(() => {
    let tl = gsap.timeline();

    tl.fromTo(
      ".imgJaquetaH",
      { y: 200, opacity: 0 },
      { y: -100, opacity: 1, duration: 1 }
    )
      .fromTo(
        ".h1",
        { y: 200, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        "-=0.6"
      )
      .fromTo(
        ".h2",
        { y: 200, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        "-=0.9"
      )
      .fromTo(
        ".esque",
        { y: 200, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        "-=0.5"
      )
      .fromTo(
        ".dire",
        { y: 200, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        "-=0.5"
      )
      .fromTo(
        ".name",
        { y: 200, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        "-=0.1"
      )
      .fromTo(
        ".planoDeFundo",
        { y: 200, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        "-=0.1"
      )
      // ANIMAÇÃO DE FLUTUAR DO TÊNIS
      .to(".tenisNike", {
        y: "=20",
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      })
      // ANIMAÇÃO DE FLUTUAR DA SOMBRA
      .to(
        ".sombra",
        {
          scale: 1.2, // diminui a sombra
          duration: 2,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        },
        "<" // "<" significa iniciar junto com a animação anterior do tênis
      );
  }, []);

  return (
    <>
      <div className="pai">
        <div className="centerPage">
          <h1 className="h1">style</h1>
          <h2 className="h2">hiddie</h2>
          <img src={jaqueta} alt="" className="imgJaquetaH" />
        </div>
      </div>
        <div className="icons">
          <a href=""><img src={insta} alt="" /></a>
          <a href=""><img src={link} alt="" /></a>
          <a href="https://github.com/GabrielSilva077"><img src={git} alt="" /></a>
        </div>
    </>
  );
}

export default Home;
