import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";
class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    const options = { abortEarly: false }; // Ensure all errors are collected, not just the first one.
    const results = Joi.validate(this.state.data, this.Schema, options); // Validate the data data against the schema.

    if (!results.error) return null; // If there are no errors, return null.

    const errors = {}; // Initialize an empty object to store error messages.

    // Loop through each error detail returned by Joi validation.
    for (let item of results.error.details) {
      // Map each error's field name to its corresponding error message.
      errors[item.path[0]] = item.message; // `item.path[0]` gives the field name (e.g., 'username' or 'password'), and `item.message` gives the error message.
    }

    return errors; // Return the object containing all error messages.
  };
  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.Schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handelSubmit = (e) => {
    // Prevents the default form submission behavior (which reloads the page)
    // In the form tag, the onSubmit event triggers the handleSubmit method
    e.preventDefault();

    const errors = this.validate();

    this.setState({ errors: errors || {} }); // the object cannt be null so we are assignment errors if no erros are present it is empty object
    this.doSubmit(); // caloing server or axios call
  };

  //while entering data validation
  handleChange = (e) => {
    // Make a copy of the existing errors from the state (so we can update it without mutating the original state)
    const errors = { ...this.state.errors };

    // Validate the current input field (username or password) using validateProperty
    // errorMessage will either be the error message string or undefined
    const errorMessage = this.validateProperty(e.currentTarget);

    // If there is an error message, add it to the errors object for the corresponding input field
    if (errorMessage) errors[e.currentTarget.name] = errorMessage;
    // If there's no error message, remove the existing error for that input field (if any)
    else delete errors[e.currentTarget.name];

    // Update the data state with the current input field's value (this reflects the user typing in the input)
    const data = { ...this.state.data };
    data[e.currentTarget.name] = e.currentTarget.value;

    // Update the state with the new data values and errors
    this.setState({ data, errors });
  };
  renderSelect(name, label, options) {
    const { data, errors } = this.state;

    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;
    return (
      <Input
        label={label}
        name={name}
        type={type}
        onHandle={this.handleChange}
        value={data[name]}
        errors={errors[name]}
      />
    );
  }

  renderButton(label) {
    return (
      <button disabled={this.validate()} className="btn btn-primary btn-sm m-2">
        {label}
      </button>
    );
  }
}

export default Form;
