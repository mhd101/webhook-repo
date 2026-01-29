import { useEffect, useState } from "react";
import { fetchEvents } from "./api";
import {formatEvent} from "./helpers/formatEvent.jsx";
import {getEventStyle} from "./helpers/getEventStyle.js";
import "./index.css";

const ACTIONS = ["ALL", "PUSH", "PULL_REQUEST", "MERGE"];

function App() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await fetchEvents();
        setEvents(data);
      } catch (err) {
        console.error("Failed to fetch events", err);
      } finally {
        setLoading(false);
      }
    };

    load(); // initial fetch
    const interval = setInterval(load, 15000);
    return () => clearInterval(interval);
  }, []);

  const filteredEvents =
    filter === "ALL"
      ? events
      : events.filter((e) => e.action === filter);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Latest GitHub Activity
        </h2>

        {/* Filter Buttons */}
        <div className="flex gap-2 mb-4 flex-wrap">
          {ACTIONS.map((action) => (
            <button
              key={action}
              onClick={() => setFilter(action)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition
                ${
                  filter === action
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
            >
              {action.replace("_", " ")}
            </button>
          ))}
        </div>

        {/* Loader */}
        {loading && (
          <div className="flex justify-center py-6">
            <div className="h-6 w-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Events List */}
        {!loading && (
          <ul className="space-y-3">
            {filteredEvents.length === 0 && (
              <li className="text-gray-500 text-sm text-center">
                No events found
              </li>
            )}

            {filteredEvents.map((e, i) => (
              <li
                key={i}
                className={`p-3 rounded-lg border-l-4 ${getEventStyle(
                  e.action
                )}`}
              >
                <p className="text-sm text-gray-800">
                  {formatEvent(e)}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {e.action.replace("_", " ")}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
