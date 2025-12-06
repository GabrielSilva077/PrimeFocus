// src/hooks/useContent.js
import { useEffect, useState } from "react";

export function useContent() {
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState({
    hero: {},
    about: {},
    servicos: [],
    portfolio: [],
    contact: {},
    footer: {},
    gallery_texts: {},
  });

  useEffect(() => {
    async function fetchContent() {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:4000/api/conteudo");
        const data = await res.json();

        setContent({
          hero: data.hero || {},
          about: data.about || data.sobre || {},
          servicos: data.servicos || [],
          portfolio: data.portfolio || [],
          contact: data.contact || {},
          footer: data.footer || {},
          gallery_texts: data.gallery_texts || {},
        });
      } catch (err) {
        console.error("Erro ao buscar conteúdo:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchContent();
  }, []);

  return { content, loading };
}
