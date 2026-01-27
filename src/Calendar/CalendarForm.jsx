import React, { useEffect, useState } from "react";

const BASE = "http://localhost:8080";

export default function CalendarForm({ editEvent, setEditEvent, reload }) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("HOLIDAY");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (editEvent) {
      setTitle(editEvent.title);
      setType(editEvent.type);
      setDate(editEvent.date);
    }
  }, [editEvent]);

  const submit = async () => {
    const payload = { title, type, date };

    try {
      const url = editEvent
        ? `${BASE}/calender/${editEvent.id}`
        : `${BASE}/calender`;

      const method = editEvent ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error();

      reset();
      reload();
    } catch {
      alert("Failed to add/update event");
    }
  };

  const reset = () => {
    setTitle("");
    setType("HOLIDAY");
    setDate("");
    setEditEvent(null);
  };

  return (
    <div className="calendar-form">
      <input
        placeholder="Event Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="HOLIDAY">Holiday</option>
        <option value="EVENT">Event</option>
      </select>

      <input
        type="text"
        placeholder="dd-MM-yyyy"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <button onClick={submit}>
        {editEvent ? "Update" : "Add"}
      </button>

      {editEvent && <button onClick={reset}>Cancel</button>}
    </div>
  );
}
