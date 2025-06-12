import React, { useEffect, useState } from "react";
import {
  fetchEvents,
  deleteEvent,
  createEvent,
  updateEvent,
} from "../../api/eventApi";
import { Link, useNavigate } from "react-router-dom";
import "./eventList.css";
import Button from "../../component/button/Button.js";
import Table from "../../component/table/Table.js";
import Form from "../../component/form/Form.js";
import {
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
} from "@ant-design/icons";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ location: "", tags: "", date: "" });
  const [totalPages, setTotalPages] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const navigate = useNavigate();

  const loadEvents = async () => {
    const params = {
      page,
      limit,
      search,
      ...filters,
    };
    const res = await fetchEvents(params);
    setEvents(res.data.data.events);
    setTotalPages(res.data.data.pagination.totalPages);
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      loadEvents();
    }, 400); // wait for user to stop typing

    return () => clearTimeout(delayDebounce); // cleanup on change
  }, [page, search, filters]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      await deleteEvent(id);
      loadEvents();
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editMode) {
        await updateEvent(editId, formData);
        alert("Event updated successfully!");
      } else {
        await createEvent(formData);
        alert("Event created successfully!");
      }

      
      setFormData({});
      setEditId(null);
      setShowForm(false);
      loadEvents();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to save event. Please try again.");

    }
  };

  // handle edit
  const handleEdit = (event) => {
    const eventDate = new Date(event.date);
    const now = new Date();

    if (eventDate < now.setHours(0, 0, 0, 0)) {
      alert("You cannot edit a past event.");
      return;
    }

    setFormData(event);
    setEditMode(true);
    setEditId(event.id);
    setShowForm(true);
  };

  const columns = [
    { header: "Name", accessor: "name" },
    // { header: "Date", accessor: "date" },
    { header: "Capacity", accessor: "capacity" },
    { header: "Location", accessor: "location" },
    // { header: "Created by", accessor: "created_by" },
    { header: "Remaining capacity", accessor: "remaining_capacity" },
  ];

  return (
    <div>
      <div className="container">
        <h2 className="head-title">Events</h2>
        <div className=" search-bar">
          <input
            type="text"
            placeholder="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <Button variant="register" onClick={() => setShowForm(true)}>
          <PlusOutlined />
          New Event
        </Button>
      </div>

      {/* Events Table */}
      <Table
        columns={columns}
        data={events}
        actions={(event) => (
          <>
            <div className="action-buttons">
              {event.remaining_capacity > 0 ? (
                <Link to={`/register/${event.id}`}>Register attendees</Link>
              ) : (
                <span className="disabled-link">Full</span>
              )}
              <Button
                onClick={() => navigate(`/event/details/${event.id}`)}
                variant=""
              >
                <EyeOutlined />
              </Button>
              <Button onClick={() => handleEdit(event)}>
                <EditOutlined />
              </Button>
              <Button onClick={() => handleDelete(event.id)} variant="danger">
                <DeleteOutlined />
              </Button>
            </div>
          </>
        )}
      />

      {/* Pagination */}
      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>

      {/* form data */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-box">
            <Form
              fields={[
                {
                  name: "name",
                  label: "Event Name",
                  placeholder: "Enter name",
                  required: true,
                },
                {
                  name: "description",
                  label: "Description",
                  placeholder: "Description",
                  required: true,
                },
                { name: "date", label: "Date", type: "date", required: true },

                {
                  name: "location",
                  label: "Location",
                  placeholder: "Location",
                  required: true,
                },
                {
                  name: "created_by",
                  label: "Created By",
                  placeholder: "Created By",
                  required: true,
                },
                {
                  name: "capacity",
                  label: "Capacity",
                  type: "number",
                  placeholder: "Capacity",
                  required: true,
                },
                {
                  name: "remaining_capacity",
                  label: "Remaining capacity ",
                  placeholder: "Remaining capacity ",
                  required: true,
                },
                {
                  name: "tags",
                  label: "Tags ",
                  placeholder: "Tags ",
                  required: true,
                },
              ]}
              values={formData}
              onChange={handleFormChange}
              onSubmit={handleFormSubmit}
              showForm={true}
              onClose={() => setShowForm(false)}
              title={editMode ? "Edit Event" : "Add New Event"}
              submitText={editMode ? "Update" : "Create"}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EventList;
