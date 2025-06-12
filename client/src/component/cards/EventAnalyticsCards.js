import React from "react";
import "./EventAnalyticsCards.css"; // optional for styling

const EventAnalyticsCards = ({ analytics }) => {
  if (!analytics) return null;

  const {
    eventName,
    totalAttendees,
    capacityUtilization,
  } = analytics;

  const cardData = [
    { label: "Event Name", value: eventName },
    { label: "Total Attendees", value: totalAttendees },
   
    
    { label: "Capacity Utilization", value: capacityUtilization },
  ];

  return (
    <div className="analytics-cards-container">
      {cardData.map((item, index) => (
        <div className="analytics-card" key={index}>
          <h3 className="analytics-card-title">{item.label}</h3>
          <p className="analytics-card-value">{item.value}</p>
        </div>
      ))}
    </div>
  );
};

export default EventAnalyticsCards;
