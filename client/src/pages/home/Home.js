import React from "react";
import bgImage from "../../assets/bg-Image.png";
import "./Home.css"; // import the CSS file
import Button from "../../component/button/Button";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="home-container">
      <img src={bgImage} alt="bg" className="bg-image" />
      <div className="overlay-text">
        <h1>Welcome to Event Management System</h1>
        <p>Join us for an unforgettable experience!</p>
        <Button
          style={{ width: "200px" }}
          variant="register"
          onClick={() => navigate(`/events`)}
        >
          Get Start
        </Button>
      </div>
    </div>
  );
};

export default Home;
