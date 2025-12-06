import { useEffect, useState } from "react";
import { fetchSiteContent } from "../../api";

export default function AboutMini() {
  const [content, setContent] = useState({
    line1: "Capturing",
    line2: "Stories",
    line3: "in every detail",
  });

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchSiteContent();
        if (data.aboutMini) setContent(data.aboutMini);
      } catch (e) {}
    })();
  }, []);

  return (
    <section className="seSobre">
      <div className="DivSobre">
        <p className="heroSection">{content.line1}</p>
        <p className="heroSection">{content.line2}</p>
        <p className="heroSection">{content.line3}</p>
      </div>
    </section>
  );
}
