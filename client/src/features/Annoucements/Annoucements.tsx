import axios from "axios";
import React, { useEffect, useState } from "react";
import Icon from "../../assets/megaphone.png";
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

  const getRandomColor = () => {
    const colors = ["#e78284", "#ea999c", "#e5c890", "#a6d189"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-10  max-w-4xl mx-auto bg-[#232634] m-4 rounded-[10px] mb-10">
      <img src={Icon} className="h-12" />
      <h1 className="text-3xl font-bold mb-4 text-[#ca9ee6] pb-[20px]">
        Announcements
      </h1>
      {announcements.length > 0 ? (
        <ul className="space-y-6">
          {announcements.map((announcement) => (
            <li
              key={announcement._id}
              className="p-4 rounded-[5px] bg-[#292c3c] "
            >
              <p
                className="text-lg text-white"
                style={{ color: getRandomColor() }}
              >
                {announcement.annoucement}
              </p>
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
