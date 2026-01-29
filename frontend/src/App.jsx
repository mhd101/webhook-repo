import { useEffect, useState } from "react";
import { fetchEvents } from "./api";

function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchEvents();
        setEvents(data);
      } catch (err) {
        console.error("Failed to fetch events", err);
      }
    };

    (async () => {
      await load(); // initial fetch
    })();

    const interval = setInterval(() => {
      load(); // poll every 15 seconds
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <h2>Latest GitHub Activity</h2>
      <ul>
        {events.map((e, i) => (
          <li key={i}>{formatEvent(e)}</li>
        ))}
      </ul>
    </div>
  );
}

function formatEvent(e) {
  if (e.action === "PUSH") {
    return `${e.author} pushed to ${e.to_branch} on ${e.timestamp}`;
  }

  if (e.action === "PULL_REQUEST") {
    return `${e.author} submitted a pull request from ${e.from_branch} to ${e.to_branch} on ${e.timestamp}`;
  }

  if (e.action === "MERGE") {
    return `${e.author} merged branch ${e.from_branch} to ${e.to_branch} on ${e.timestamp}`;
  }

  return "";
}

export default App;
