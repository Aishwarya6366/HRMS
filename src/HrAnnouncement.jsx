import AnnouncementForm from "./AnnouncementForm";
import AnnouncementList from "./AnnouncementList";

function HrAnnouncement() {
  return (
    <div>
      <h2>HR Announcements</h2>
      <AnnouncementForm />
      <AnnouncementList isHr={true} />
    </div>
  );
}

export default HrAnnouncement;
