import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEvent, getAttendees, getAnalytics } from "../../api/eventApi";

import Table from "../../component/table/Table";
import "./EventDetails.css";
import EventAnalyticsCards from "../../component/cards/EventAnalyticsCards";

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [attendees, setAttendees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [analytics, setAnalytics] = useState(null);

  // Fetch event and attendees
  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventRes = await getEvent(id);
        const eventData = eventRes.data;

        if (eventData.success) {
          setEvent(eventData.data); // Fix: set the event object directly
        } else {
          setError(eventRes.message || "Event not found");
        }

        const attendeeRes = await getAttendees(id);

        if (attendeeRes.data.success) {
          setAttendees(attendeeRes.data.data); // ✅ fixed: access the actual array
        } else {
          setError(attendeeRes.data.message || "No attendees found");
        }
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    const fetchAnalytics = async () => {
      const res = await getAnalytics(id);
      if (res.data.success) {
        setAnalytics(res.data.data);
      }
    };

    fetchAnalytics();

    fetchData();
  }, [id]);

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="event-container">
      <h1 className="head-title">Event Details </h1>
      <h1 className="event-title">{event.name}</h1>
      <h2 className="sub-title">Event Analytics</h2>
      <EventAnalyticsCards analytics={analytics} />
      <div className="event-details-grid">
        <div className="event-details-col">
          <p>
            <strong>Description:</strong> {event.description}
          </p>
          <p>
            <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
          </p>
          <p>
            <strong>Location:</strong> {event.location}
          </p>
        </div>
        <div className="event-details-col">
          <p>
            <strong>Capacity:</strong> {event.capacity}
          </p>
          <p>
            <strong>Remaining Capacity:</strong> {event.remaining_capacity}
          </p>
          <p>
            <strong>Tags:</strong>
            <span className="tags">
              {event.tags.split(",").map((tag, i) => (
                <span className="tag" key={i}>
                  {tag.trim()}
                </span>
              ))}
            </span>
          </p>
        </div>
      </div>

      <h2 className="sub-title">Attendees</h2>
      {attendees.length > 0 ? (
        <Table
          columns={[
            { header: "Name", accessor: "name" },
            { header: "Email", accessor: "email" },
          ]}
          data={attendees}
        />
      ) : (
        <p>No attendees registered yet.</p>
      )}
    </div>
  );
};

export default EventDetail;
