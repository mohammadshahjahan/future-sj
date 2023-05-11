import { useState } from "react";
import InputForm from "../form-input/form-input.component";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import "./sign-up-form.styles.scss";
import Button from "../button/button.component";
const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
  const clearForm = () => {
    setFormFields(defaultFormFields);
  };
  const createNewUser = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Password do not matches!!!");
      return;
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      await createUserDocumentFromAuth(user, { displayName });
      clearForm();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Sorry , This email is already in use . Plz use a different one");
      }
      console.log(error);
    }
  };

  const changeHandle = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign Up with your Email and Password</span>
      <form onSubmit={createNewUser}>
        <InputForm
          label="Display Name"
          type="text"
          onChange={changeHandle}
          name="displayName"
          value={displayName}
          required
        />
        <InputForm
          label="Email"
          type="email"
          onChange={changeHandle}
          name="email"
          value={email}
          required
        />

        <InputForm
          label="Password"
          type="password"
          onChange={changeHandle}
          name="password"
          value={password}
          required
        />

        <InputForm
          label="Confirm Password"
          type="password"
          onChange={changeHandle}
          name="confirmPassword"
          value={confirmPassword}
          required
        />
        <Button children="SUBMIT" type="submit" />
      </form>
    </div>
  );
};

export default SignUpForm;
