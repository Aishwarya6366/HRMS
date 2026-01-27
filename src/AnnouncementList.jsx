import { useEffect, useState } from "react";
import axios from "axios";
import "./Announcement.css";

const API_URL = "http://localhost:8080/annocement"; // ✅ FIXED

function AnnouncementList({ isHr }) {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    axios
      .get(API_URL)
      .then(res => setAnnouncements(res.data))
      .catch(err => console.error(err));
  }, []);

  const deleteAnnouncement = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    setAnnouncements(prev => prev.filter(a => a.id !== id));
  };

  return (
    <div>
      {announcements.map(a => (
        <div className="announcement-card" key={a.id}>
          <h4>{a.title}</h4>
          <p>{a.description}</p>

          {isHr && (
            <button
              className="delete-btn"
              onClick={() => deleteAnnouncement(a.id)}
            >
              Delete
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default AnnouncementList;
