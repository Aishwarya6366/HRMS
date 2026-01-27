import React, { useEffect, useState } from "react";
import CalendarForm from "./CalendarForm";
import "./Calendar.css";

const BASE = "http://localhost:8080";

export default function CalendarPage({ isHR }) {
  const [events, setEvents] = useState([]);
  const [editEvent, setEditEvent] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const res = await fetch(`${BASE}/calender`, {
        credentials: "include",
      });
      const data = await res.json();
      setEvents(Array.isArray(data) ? data : []);
      setError("");
    } catch {
      setError("Failed to load calendar events");
    }
  };

  const deleteEvent = async (id) => {
    if (!window.confirm("Delete this event?")) return;

    await fetch(`${BASE}/calender/delete/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    loadEvents();
  };

  return (
    <div className="calendar-container">
      <h2>Company Calendar {isHR && "(HR)"}</h2>

      {/* HR ONLY FORM */}
      {isHR && (
        <CalendarForm
          editEvent={editEvent}
          setEditEvent={setEditEvent}
          reload={loadEvents}
        />
      )}

      {error && <p className="error">{error}</p>}

      {events.length === 0 && <p>No calendar events available</p>}

      <div className="calendar-list">
        {events.map((e) => (
          <div className="calendar-card" key={e.id}>
            <div>
              <h4>{e.title}</h4>
              <p>{e.type}</p>
              <span>{e.date}</span>
            </div>

            {/* HR ONLY ACTIONS */}
            {isHR && (
              <div className="calendar-actions">
                <button onClick={() => setEditEvent(e)}>Edit</button>
                <button
                  className="danger"
                  onClick={() => deleteEvent(e.id)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
