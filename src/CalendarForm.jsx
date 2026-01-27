import { useState, useEffect } from "react";
import { Calendar, X, Plus, Edit2, Tag, CalendarDays, Clock, Hash } from "lucide-react";
import "./CalendarForm.css";

const BASE = "http://localhost:8080";

export default function CalendarForm({ editEvent, reload, clearEdit }) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState({});

  useEffect(() => {
    if (editEvent) {
      setTitle(editEvent.title || "");
      setType(editEvent.type || "");
      setDate(editEvent.date || "");
    } else {
      const today = new Date().toISOString().split("T")[0];
      setDate(today);
    }
  }, [editEvent]);

  const submit = async () => {
    if (!title.trim() || !type || !date) {
      alert("All fields are required");
      return;
    }

    setLoading(true);
    
    const payload = {
      title: title.trim(),
      type,
      date
    };

    const url = editEvent
      ? `${BASE}/calender/${editEvent.id}`
      : `${BASE}/calender`;

    const method = editEvent ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error("Failed to add/update event");
      }

      setTitle("");
      setType("");
      const today = new Date().toISOString().split("T")[0];
      setDate(today);
      
      if (clearEdit) clearEdit();
      if (reload) reload();
      
    } catch (error) {
      alert(error.message || "Failed to save event");
    } finally {
      setLoading(false);
    }
  };

  const handleFocus = (field) => {
    setIsFocused(prev => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field) => {
    setIsFocused(prev => ({ ...prev, [field]: false }));
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case "HOLIDAY": return "🎯";
      case "EVENT": return "📌";
      case "FESTIVAL": return "🎊";
      default: return "📝";
    }
  };

  const getTypeColor = (type) => {
    switch(type) {
      case "HOLIDAY": return "#8b5cf6";
      case "EVENT": return "#06b6d4";
      case "FESTIVAL": return "#f59e0b";
      default: return "#94a3b8";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="glass-form-container">
      <div className="glass-form-header">
        <div className="glass-form-header-content">
          <div className="glass-form-icon">
            <CalendarDays size={28} />
          </div>
          <div>
            <h2 className="glass-form-title">
              {editEvent ? "Edit Event" : "New Calendar Event"}
            </h2>
            <p className="glass-form-subtitle">
              {editEvent ? "Update your event details" : "Schedule a new calendar entry"}
            </p>
          </div>
        </div>
      </div>

      <div className="glass-form-body">
        {/* Form Fields */}
        <div className="form-fields-grid">
          {/* Title Field */}
          <div className="glass-input-group">
            <label className="glass-input-label">
              <Hash size={16} />
              <span>Event Title</span>
            </label>
            <div className={`glass-input-wrapper ${isFocused.title ? 'focused' : ''}`}>
              <input
                type="text"
                className="glass-input"
                placeholder="e.g., Team Meeting, Company Holiday"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onFocus={() => handleFocus('title')}
                onBlur={() => handleBlur('title')}
                maxLength={100}
              />
              <div className="input-underline"></div>
            </div>
            <div className="input-hint">
              <span className="char-count">{title.length}/100</span>
              <span className="hint-text">Keep it concise</span>
            </div>
          </div>

          {/* Type Field */}
          <div className="glass-input-group">
            <label className="glass-input-label">
              <Tag size={16} />
              <span>Event Type</span>
            </label>
            <div className="type-selector">
              {["HOLIDAY", "EVENT", "FESTIVAL"].map((typeOption) => (
                <button
                  key={typeOption}
                  type="button"
                  className={`type-option ${type === typeOption ? 'selected' : ''}`}
                  onClick={() => setType(typeOption)}
                  style={{
                    '--type-color': getTypeColor(typeOption)
                  }}
                >
                  <span className="type-emoji">{getTypeIcon(typeOption)}</span>
                  <span className="type-text">{typeOption.toLowerCase()}</span>
                  {type === typeOption && (
                    <div className="type-check">
                      <div className="check-dot"></div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Date Field */}
          <div className="glass-input-group">
            <label className="glass-input-label">
              <Clock size={16} />
              <span>Event Date</span>
            </label>
            <div className="date-picker-container">
              <div className="date-input-wrapper">
                <Calendar size={18} className="date-icon" />
                <input
                  type="date"
                  className="date-input"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  onFocus={() => handleFocus('date')}
                  onBlur={() => handleBlur('date')}
                />
                <div className="date-display">
                  {formatDate(date)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          {editEvent && (
            <button
              type="button"
              className="cancel-btn"
              onClick={clearEdit}
              disabled={loading}
            >
              <X size={16} />
              <span>Cancel</span>
            </button>
          )}
          
          <button
            type="button"
            className={`submit-btn ${loading ? 'loading' : ''} ${!title || !type || !date ? 'disabled' : ''}`}
            onClick={submit}
            disabled={loading || !title || !type || !date}
          >
            {loading ? (
              <>
                <div className="spinner"></div>
                <span>Saving...</span>
              </>
            ) : (
              <>
                {editEvent ? <Edit2 size={16} /> : <Plus size={16} />}
                <span>{editEvent ? "Update Event" : "Create Event"}</span>
              </>
            )}
          </button>
        </div>

        {/* Live Preview */}
        {(title || type || date) && (
          <div className="live-preview">
            <div className="preview-header">
              <h3 className="preview-title">Live Preview</h3>
              <div className="preview-badge">Real-time</div>
            </div>
            
            <div className="preview-card">
              <div className="preview-date">
                <div className="preview-date-icon">📅</div>
                <div className="preview-date-text">{formatDate(date)}</div>
              </div>
              
              <div className="preview-content">
                <h4 className="preview-event-title">{title || "Your Event Title"}</h4>
                
                {type && (
                  <div 
                    className="preview-event-type"
                    style={{
                      backgroundColor: `${getTypeColor(type)}15`,
                      color: getTypeColor(type),
                      borderColor: getTypeColor(type)
                    }}
                  >
                    <span className="preview-type-emoji">{getTypeIcon(type)}</span>
                    <span className="preview-type-text">{type}</span>
                  </div>
                )}
              </div>
              
              <div className="preview-footer">
                <div className="preview-actions">
                  <button className="preview-action-btn" disabled>
                    <Calendar size={14} />
                    <span>Add to Calendar</span>
                  </button>
                  <button className="preview-action-btn" disabled>
                    <span>🔔</span>
                    <span>Set Reminder</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Form Status */}
        <div className="form-status">
          <div className="status-item">
            <div className="status-indicator active"></div>
            <span className="status-text">Form Ready</span>
          </div>
          <div className="status-item">
            <div className={`status-indicator ${title ? 'active' : 'inactive'}`}></div>
            <span className="status-text">Title Provided</span>
          </div>
          <div className="status-item">
            <div className={`status-indicator ${type ? 'active' : 'inactive'}`}></div>
            <span className="status-text">Type Selected</span>
          </div>
          <div className="status-item">
            <div className={`status-indicator ${date ? 'active' : 'inactive'}`}></div>
            <span className="status-text">Date Set</span>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="glass-form-decorations">
        <div className="decoration-circle circle-1"></div>
        <div className="decoration-circle circle-2"></div>
        <div className="decoration-circle circle-3"></div>
      </div>
    </div>
  );
}