const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5001";

export async function fetchEvents() {
  const res = await fetch(`${API_URL}/events`);
  return res.json();
}
