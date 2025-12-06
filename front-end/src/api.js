// src/api.js
const API = import.meta.env.VITE_API_URL || 'http://localhost:4000';

function getToken() {
  return localStorage.getItem('token');
}

function authHeaders() {
  const token = getToken();
  return token ? { 'Authorization': 'Bearer ' + token } : {};
}

export async function login(username, password) {
  const res = await fetch(`${API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  if (!res.ok) throw await res.json();
  return res.json();
}

export async function fetchPortfolio() {
  const res = await fetch(`${API}/portfolio`);
  if (!res.ok) throw await res.json();
  return res.json();
}

export async function createPortfolioImage(payload) {
  const res = await fetch(`${API}/portfolio`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw await res.json();
  return res.json();
}

export async function updatePortfolioImage(id, payload) {
  const res = await fetch(`${API}/portfolio/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw await res.json();
  return res.json();
}

export async function deletePortfolioImage(id) {
  const res = await fetch(`${API}/portfolio/${id}`, {
    method: 'DELETE',
    headers: { ...authHeaders() }
  });
  if (!res.ok) throw await res.json();
  return res.json();
}

export async function fetchSiteContent() {
  const res = await fetch(`${API}/site-content`);
  if (!res.ok) throw await res.json();
  return res.json();
}

export async function saveSiteContent(payload) {
  const res = await fetch(`${API}/site-content`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw await res.json();
  return res.json();
}
