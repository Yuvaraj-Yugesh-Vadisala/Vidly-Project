import React from "react";
const Input = ({ name, onHandle, value, label, errors, type }) => {
  return (
    <React.Fragment>
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <input
          autoFocus
          onChange={onHandle} // onChange is predifined function that occurs when they is change in forms
          name={name}
          value={value}
          className="form-control"
          id={name}
          type={type}
        />
      </div>
      {errors && <div className="alert alert-danger">{errors}</div>}
      {/*if the errors is truth then after && will display if we dont keep condition the
      error div will display without any error in UI*/}
    </React.Fragment>
  );
};

export default Input;
