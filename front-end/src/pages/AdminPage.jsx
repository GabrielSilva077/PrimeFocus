// src/pages/AdminPage.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../layout/admPage.css";

export default function AdminPage() {
  const navigate = useNavigate();

  const [tab, setTab] = useState("portfolio");
  const [loading, setLoading] = useState(false);

  // Estados do conteúdo
  const [hero, setHero] = useState({ title: "", subtitle: "", cta_button: "" });
  const [about, setAbout] = useState({ title: "", paragraphs: ["", ""] });
  const [servicos, setServicos] = useState([
    { titulo: "", descricao: "" },
    { titulo: "", descricao: "" },
    { titulo: "", descricao: "" },
    { titulo: "", descricao: "" },
  ]);
  const [contact, setContact] = useState({
    title: "",
    contacts: [],
    cta_button: "",
    subtitle_1: "",
    subtitle_2: "",
  });
  const [footer, setFooter] = useState({
    copyright: "",
    brand_title: "",
    brand_subtitle: "",
    social_links: [],
    social_title: "",
  });
  const [galleryTexts, setGalleryTexts] = useState({
    title: "",
    filters: [],
    subtitle: "",
  });

  const [portfolio, setPortfolio] = useState([]);

  // Estados da imagem nova
  const [newImageFile, setNewImageFile] = useState(null);
  const [newImagePreview, setNewImagePreview] = useState("");
  const [newImageTitle, setNewImageTitle] = useState("");
  const [newImageCategory, setNewImageCategory] = useState("");
  const [newImageSize, setNewImageSize] = useState("1x1");
  const [newImageDescription, setNewImageDescription] = useState("");

  // Estados do modal de edição
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editImage, setEditImage] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editSize, setEditSize] = useState("1x1");

  const carregarImagens = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        "https://primefocus.onrender.com/api/admin/portfolio",
        {
          headers: { Authorization: "Bearer " + token },
        }
      );

      const result = await res.json();

      if (result.success) setPortfolio(result.data);
    } catch (error) {
      console.error("Erro ao carregar imagens:", error);
    }
  };

  // Redireciona se não tiver token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/admin");
  }, []);

  // Logout
  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/admin");
  }

  // Buscar dados do banco + portfolio
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        const res = await fetch(
          "https://primefocus.onrender.com/api/admin/conteudo",
          {
            headers: { Authorization: "Bearer " + token },
          }
        );
        const data = await res.json();

        setHero({
          title: data.hero?.title || data.hero?.titulo || "",
          subtitle: data.hero?.subtitle || data.hero?.subtitulo || "",
          cta_button: data.hero?.cta_button || data.hero?.cta || "",
        });

        setAbout({
          title: data.about?.title || data.sobre?.titulo || "",
          paragraphs: data.about?.paragraphs || [
            data.sobre?.p1 || "",
            data.sobre?.p2 || "",
          ],
        });

        if (data.servicos && Array.isArray(data.servicos))
          setServicos(data.servicos);

        setContact(data.contact || {});
        setFooter(data.footer || {});
        setGalleryTexts(data.gallery_texts || {});

        const resPort = await fetch(
          "https://primefocus.onrender.com/api/admin/portfolio",
          {
            headers: { Authorization: "Bearer " + token },
          }
        );
        const portData = await resPort.json();

        setPortfolio(portData.data || []);
      } catch (err) {
        console.error("Erro ao buscar conteúdo:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Remover imagem
  async function removerImagem(id) {
    if (!confirm("Deseja realmente remover esta imagem?")) return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `https://primefocus.onrender.com/api/admin/portfolio/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: "Bearer " + token },
        }
      );

      const data = await res.json();

      if (data.success) {
        alert("Imagem removida com sucesso!");
        setPortfolio((prev) => prev.filter((img) => img.id !== id));
      } else alert("Erro ao remover imagem");
    } catch (err) {
      console.error("Erro ao remover imagem:", err);
      alert("Erro ao remover imagem");
    }
  }

  // Abrir modal de edição
  function editarImagem(index) {
    const img = portfolio[index];

    setEditImage(img);
    setEditTitle(img.title || "");
    setEditCategory(img.category || "");
    setEditDescription(img.description || "");
    setEditSize(img.grid_size || "1x1");

    setEditModalOpen(true);
  }

  // Salvar edição
  async function salvarEdicao() {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `https://primefocus.onrender.com/api/admin/portfolio/${editImage.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            image_url: editImage.image_url,
            title: editTitle,
            category: editCategory,
            description: editDescription,
            grid_size: editSize,
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        alert("Imagem atualizada!");
        setPortfolio((prev) =>
          prev.map((item) => (item.id === editImage.id ? data.data : item))
        );
        setEditModalOpen(false);
      } else alert("Erro ao salvar edição");
    } catch (err) {
      console.error("Erro ao salvar edição:", err);
      alert("Erro ao salvar edição");
    }
  }

  const adicionarImagemDoPC = async () => {
    try {
      if (!newImageFile) {
        alert("Selecione uma imagem primeiro!");
        return;
      }

      if (!newImageCategory.trim()) {
        alert("A categoria é obrigatória!");
        return;
      }

      if (!newImageTitle.trim()) {
        alert("O título é obrigatório!");
        return;
      }

      setLoading(true);

      const token = localStorage.getItem("token");

      // 🔥 Criando FormData para enviar arquivo
      const formData = new FormData();
      formData.append("image", newImageFile);
      formData.append("title", newImageTitle);
      formData.append("category", newImageCategory);
      formData.append("grid_size", newImageSize);
      formData.append("description", newImageDescription);

      const res = await fetch(
        "https://primefocus.onrender.com/api/admin/portfolio",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            // ❌ NÃO usar "Content-Type": multipart/form-data
            // O browser define automaticamente
          },
          body: formData,
        }
      );

      const data = await res.json();

      if (!data.success) {
        alert("Erro ao adicionar imagem");
        return;
      }

      alert("Imagem adicionada com sucesso!");

      setNewImageFile(null);
      setNewImagePreview("");
      setNewImageTitle("");
      setNewImageCategory("");
      setNewImageDescription("");

      carregarImagens();
    } catch (error) {
      console.error("Erro ao enviar imagem:", error);
      alert("Erro ao enviar imagem");
    } finally {
      setLoading(false);
    }
  };

  // Salvar conteúdo geral
  async function salvarConteudo() {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const payload = {
        hero: {
          titulo: hero.title,
          subtitulo: hero.subtitle,
          cta_button: hero.cta_button,
        },
        about: {
          title: about.title,
          paragraphs: about.paragraphs,
        },
        servicos,
        contact,
        footer,
        gallery_texts: galleryTexts,
        portfolio,
      };

      const res = await fetch(
        "https://primefocus.onrender.com/api/admin/conteudo",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (data.success) alert("Conteúdo salvo com sucesso!");
      else alert("Erro ao salvar conteúdo");
    } catch (err) {
      console.error("Erro ao salvar conteúdo:", err);
      alert("Erro ao salvar conteúdo");
    } finally {
      setLoading(false);
    }
  }

  // ---------------------------------------------------------
  // RENDER
  // ---------------------------------------------------------
  return (
    <div className="admin-wrapper">
      <aside className="admin-sidebar">
        <h2>Painel Administrativo</h2>

        <button
          className={tab === "portfolio" ? "active" : ""}
          onClick={() => setTab("portfolio")}
        >
          Gerenciar Portfólio
        </button>

        <button
          className={tab === "conteudo" ? "active" : ""}
          onClick={() => setTab("conteudo")}
        >
          Editar Conteúdo
        </button>

        <button
          className={tab === "config" ? "active" : ""}
          onClick={() => setTab("config")}
        >
          Configurações
        </button>

        <button className="logout-btn" onClick={handleLogout}>
          Sair
        </button>
      </aside>

      <main className="admin-main">
        {loading && <p>Carregando...</p>}

        {/* PORTFÓLIO */}
        {tab === "portfolio" && (
          <div>
            <h2>Gerenciar Portfólio</h2>

            <div className="add-image-box">
              <h3>Adicionar Nova Imagem</h3>

              <div className="file-input-wrapper">
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setNewImageFile(file);
                      setNewImagePreview(URL.createObjectURL(file));
                    }
                  }}
                />
                <label htmlFor="fileInput" className="custom-file-btn">
                  Selecionar imagem do PC
                </label>
              </div>

              {newImagePreview && (
                <img
                  src={newImagePreview}
                  alt="Preview da imagem"
                  className="image-preview"
                />
              )}

              <input
                placeholder="Título"
                value={newImageTitle}
                onChange={(e) => setNewImageTitle(e.target.value)}
              />

              <input
                placeholder="Categoria"
                value={newImageCategory}
                onChange={(e) => setNewImageCategory(e.target.value)}
                className={!newImageCategory.trim() ? "input-error" : ""}
              />

              <select
                value={newImageSize}
                onChange={(e) => setNewImageSize(e.target.value)}
              >
                <option value="1x1">Pequeno (1x1)</option>
                <option value="2x2">Médio (2x2)</option>
              </select>

              <textarea
                placeholder="Descrição"
                value={newImageDescription}
                onChange={(e) => setNewImageDescription(e.target.value)}
              ></textarea>

              <button className="save-btn" onClick={adicionarImagemDoPC}>
                Adicionar
              </button>
            </div>

            <h3>Imagens Existentes</h3>
            <p className="pAdmPage">
              Esta é a ordem em que as imagens aparecerão na Prévia do
              Portfólio.
            </p>

            <div className="portfolio-grid">
              {portfolio.length === 0 && (
                <p>Nenhuma imagem adicionada ainda.</p>
              )}

              {portfolio.map((item, index) => (
                <div key={item.id} className="portfolio-item">
                  <img
                    src={item.image_url}
                    alt={item.title || "Imagem do Portfólio"}
                  />

                  <h4>{item.title || "Sem título"}</h4>

                  <button onClick={() => editarImagem(index)}>Editar</button>

                  <button
                    className="delete-btn"
                    onClick={() => removerImagem(item.id)}
                  >
                    Remover
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CONTEÚDO */}
        {tab === "conteudo" && (
          <div>
            <h2>Editar Conteúdo</h2>

            <section>
              <h3>Sobre Mim</h3>
              <input
                placeholder="Título"
                value={about.title}
                onChange={(e) => setAbout({ ...about, title: e.target.value })}
              />

              <textarea
                placeholder="Parágrafo 1"
                value={about.paragraphs[0]}
                onChange={(e) =>
                  setAbout({
                    ...about,
                    paragraphs: [e.target.value, about.paragraphs[1]],
                  })
                }
              />
            </section>

            <section>
              <h3>Serviços</h3>

              {servicos.map((srv, i) => (
                <div key={i} className="service-box">
                  <input
                    placeholder={`Serviço ${i + 1} - Título`}
                    value={srv.titulo}
                    onChange={(e) => {
                      const novo = [...servicos];
                      novo[i].titulo = e.target.value;
                      setServicos(novo);
                    }}
                  />

                  <textarea
                    placeholder="Descrição"
                    value={srv.descricao}
                    onChange={(e) => {
                      const novo = [...servicos];
                      novo[i].descricao = e.target.value;
                      setServicos(novo);
                    }}
                  />
                </div>
              ))}
            </section>

            <button className="save-btn" onClick={salvarConteudo}>
              Salvar Alterações
            </button>
          </div>
        )}

        {/* CONFIG */}
        {tab === "config" && (
          <div>
            <h2>Configurações</h2>
            <p>Futuramente você pode adicionar troca de senha, tema, etc.</p>
          </div>
        )}

        {/* ======================== */}
        {/*       MODAL DE EDIÇÃO       */}
        {/* ======================== */}
        {editModalOpen && editImage && (
          <div className="modal-overlayEdit">
            <div className="modal-box">
              <h3>Editar Imagem</h3>

              <img
                src={editImage.image_url}
                alt="Preview"
                className="modal-preview"
              />

              <input
                placeholder="Título"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />

              <input
                placeholder="Categoria"
                value={editCategory}
                onChange={(e) => setEditCategory(e.target.value)}
              />

              <select
                value={editSize}
                onChange={(e) => setEditSize(e.target.value)}
              >
                <option value="1x1">Pequeno (1x1)</option>
                <option value="2x2">Médio (2x2)</option>
              </select>

              <textarea
                placeholder="Descrição"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
              />

              <div className="modal-buttons">
                <button className="save-btn" onClick={salvarEdicao}>
                  Salvar
                </button>

                <button
                  className="cancel-btn"
                  onClick={() => setEditModalOpen(false)}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
