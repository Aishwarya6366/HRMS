import { useState } from "react";
import axios from "axios";
import "./Announcement.css";

const API_URL = "http://localhost:8080/annocement"; // ✅ FIXED

function AnnouncementForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    axios
      .post(API_URL, {
        title,
        description,
        posted: true
      })
      .then(() => {
        setTitle("");
        setDescription("");
        window.location.reload();
      })
      .catch(err => console.error(err));
  };

  return (
    <form className="announcement-form" onSubmit={submitHandler}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        required
      />

      <button type="submit">Create Announcement</button>
    </form>
  );
}

export default AnnouncementForm;
