import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  Schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  // userName = createRef();
  // componentDidMount() { //after rendering data we can perform this
  //   this.userName.current.focus();   //we can create field fous like this butdont over use ref
  // }

  doSubmit = () => {
    //server
    console.log("submitted ");
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handelSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;

// validate = () => {       to validate manually
//   const errors = {};
//   if (this.state.data.username.trim() === "")
//     errors.username = "User name is required";

//   if (this.state.data.password.trim() === "")
//     errors.password = "Password is required";

//   return Object.keys(errors).length === 0 ? null : errors;
// };
// validateProperty = (input) => {
//   if (input.name === "username")
//     if (input.value.trim() === "") return "Username Cant be Empty";

//   if (input.name === "password")
//     if (input.value.trim() === "") return "Pssword Cant be Empty";
// };
