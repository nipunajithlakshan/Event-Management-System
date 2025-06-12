import React from "react";
import './Form.css'

const Form = ({ fields = [], values = {}, onChange, onSubmit, title, submitText = "Submit", onClose }) => {
  return (
    <form onSubmit={onSubmit} className="form-container">
      <h3>{title}</h3>
      {fields.map((field) => (
        <div className="form-group" key={field.name}>
          <label>{field.label}</label>
          <input
            type={field.type || "text"}
            name={field.name}
            placeholder={field.placeholder || ""}
            required={field.required || false}
            value={values[field.name] || ""}
            onChange={onChange}
          />
        </div>
      ))}
      <div className="form-actions">
        <button type="submit">{submitText}</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </div>
    </form>
  );
};

export default Form;
