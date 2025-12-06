import React from "react";

export default function HeaderHero({ camera, miniCamera }) {
  return (
    <section className="sectionCabecalho">
      <img src={camera} alt="Camera" className="imgCamera" />
      <img src={miniCamera} alt="Mini Camera" className="imgCameraP" />
      <h2 className="titleHome">CAPTURE</h2>
      <h2 className="titleHome">THE STORY</h2>
    </section>
  );
}
