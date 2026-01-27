import { useEffect, useState } from "react";
import "./Calendar.css";

const BASE = "http://localhost:8080";

export default function EmpCalendar() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch(`${BASE}/calender`, {
      credentials: "include"
    })
      .then((res) => res.json())
      .then(setEvents);
  }, []);

  return (
    <div className="calendar-container">
      <h2 className="calendar-title">Company Calendar</h2>

      {events.length === 0 && <p>No calendar events available</p>}

      {events.map((e) => (
        <div className="calendar-card" key={e.id}>
          <div>
            <h4>{e.title}</h4>
            <p>{e.type}</p>
            <small>{e.date}</small>
          </div>
        </div>
      ))}
    </div>
  );
}
