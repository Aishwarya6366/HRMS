const BASE = "http://localhost:8080";

// GET – HR & EMPLOYEE
export const getAnnouncements = async () => {
  const res = await fetch(`${BASE}/annocement`, {
    credentials: "include",
  });
  return res.json();
};

// POST – HR
export const createAnnouncement = async (data) => {
  return fetch(`${BASE}/annocement`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};

// PUT – HR
export const updateAnnouncement = async (id, data) => {
  return fetch(`${BASE}/annocement/${id}`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};

// DELETE – HR
export const deleteAnnouncement = async (id) => {
  return fetch(`${BASE}/annocement/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
};
