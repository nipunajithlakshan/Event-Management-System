import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // import useNavigate
import Form from "../../component/form/Form";
import { registerAttendee } from "../../api/eventApi";
import { message } from "antd";

const EventRegister = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // initialize navigate
  const [formData, setFormData] = useState({});
  const [showForm, setShowForm] = useState(false);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleFormSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await registerAttendee(id, formData);

    if (!response.success) {
      alert(response.message || "Registration Successful!");
      setFormData({});
      navigate("/events");
    } else {
      // Handle known errors like existing email
      alert("Attendee already Exist. Please try again.");
    }
  } catch (error) {
    // Handle unexpected errors (e.g., network issues)
    const message =
      error.response?.data?.message ||
      error.message ||
      "An unexpected error occurred. Please try again later.";
    alert(message);
  }
};


  useEffect(() => {
    // Automatically open the modal when the page loads
    setShowForm(true);
  }, []);

  

  return (
    <div className="form-container">
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-box">
            
            <Form
              fields={[
                {
                  name: "name",
                  label: "Name",
                  placeholder: "Enter name",
                  required: true,
                },
                {
                  name: "email",
                  label: "Email",
                  placeholder: "Email",
                  required: true,
                },
              ]}
              values={formData}
              onChange={handleFormChange}
              onSubmit={handleFormSubmit}
              onClose={() => navigate("/events")}
              title="Register for Event"
              submitText="Register"
            />
            
          </div>
        </div>
      )}
    </div>
  );
};

export default EventRegister;
