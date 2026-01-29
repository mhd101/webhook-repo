const API_URL = "http://backend:5000";

export async function fetchEvents() {
  const res = await fetch(`${API_URL}/events`);
  return res.json();
}
