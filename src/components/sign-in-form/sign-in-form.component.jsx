import { useState } from "react";
import InputForm from "../form-input/form-input.component";
import {
  signInWithGooglePopup,
  signInUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
import "./sign-in-form.styles.scss";
import Button from "../button/button.component";
const defaultFormFields = {
  email: "",
  password: "",
};
const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const clearForm = () => {
    setFormFields(defaultFormFields);
  };
  const emailPasswordSignIn = async (event) => {
    event.preventDefault();
    try {
      await signInUserWithEmailAndPassword(email, password);
      clearForm();
    } catch (error) {
      switch (error.code) {
        case "auth/user-not-found":
          alert("Incorrect Email !!!");
          break;
        case "auth/wrong-password":
          alert("Incorrect Password for email !!!");
          break;
        default:
          console.log(error);
          break;
      }
    }
  };
  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  };
  const changeHandle = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign In with your Email and Password</span>
      <form onSubmit={emailPasswordSignIn}>
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

        <div className="buttons-container">
          <Button children="SIGN IN" type="submit" />
          <Button
            children="GOOGLE SIGN IN"
            buttonType="google"
            type="button"
            onClick={signInWithGoogle}
          />
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
