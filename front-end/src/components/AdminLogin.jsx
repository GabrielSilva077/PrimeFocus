// src/components/AdminLogin.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api"; // você vai criar esse arquivo depois
import "../layout/adm.css";
import { icons } from "./images";
import "../assets/imgSobre.png"

export default function AdminLogin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);

  // Se já estiver logado → ir direto para o painel
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/admin/panel");
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setErr(null);
    setLoading(true);

    try {
      const data = await login(username, password);
      localStorage.setItem("token", data.token);

      navigate("/admin/panel"); // redireciona
    } catch (error) {
      setErr(error?.error || "Usuário ou senha incorretos");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="admin-login-container">
      <form onSubmit={handleSubmit} className="admin-login-form">
        <img src={icons.Cadeado} alt="" className="cadeado" />
        <h2 className="TitleAdm">Área Administrativa</h2>

        <p className="subTitle">Digite a senha para acessar o painel</p>

        {err && <div className="admin-error">{err}</div>}

        <input
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="admin-input"
        />

        <input
          placeholder="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="admin-input"
        />

        <button type="submit" disabled={loading} className="admin-button">
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}
