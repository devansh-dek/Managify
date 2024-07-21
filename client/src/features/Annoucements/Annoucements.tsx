import axios from "axios";
import React, { useEffect, useState } from "react";

interface Announcement {
  _id: string;
  annoucement: string;
}

function Announcements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/showannoucements",
        );
        setAnnouncements(response.data.data);
      } catch (error) {
        console.error("Error fetching announcements:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto ">
      <h1 className="text-3xl font-bold mb-4">Announcements</h1>
      {announcements.length > 0 ? (
        <ul className="space-y-4">
          {announcements.map((announcement) => (
            <li
              key={announcement._id}
              className="p-4 bg-white rounded-lg shadow-md border border-gray-200"
            >
              <p className="text-lg">{announcement.annoucement}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="p-4 bg-white rounded-lg shadow-md border border-gray-200">
          <p className="text-lg">No announcements</p>
        </div>
      )}
    </div>
  );
}

export default Announcements;
