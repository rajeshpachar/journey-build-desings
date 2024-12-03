import React, { useState, useEffect } from "react";
import { Form, Input } from "antd";

const PasswordValidation = (props) => {
  const [password, setPassword] = useState("");
  const [lowerCase, setLowerCase] = useState(false);
  const [upperCase, setUpperCase] = useState(false);
  const [charCount, setCharCount] = useState(false);

  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  const validatePassword = () => {
    const hasLowerCase = /.*[a-z].*/;
    const hasUpperCase = /.*[A-Z].*/;
    const characters = /.{8,}/;

    if (password !== "") {
      hasLowerCase.test(password) ? setLowerCase(true) : setLowerCase(false);
      hasUpperCase.test(password) ? setUpperCase(true) : setUpperCase(false);
      characters.test(password) ? setCharCount(true) : setCharCount(false);
    }
  };

  const ValidationMessage = () => {
    return (
      <div style={{ color: "red" }}>
        {!lowerCase && <p>Need lowercase character</p>}
        {!upperCase && <p>Need uppercase character</p>}
        {!charCount && <p>Need at least 8 characters</p>}
      </div>
    );
  };

  // For every password change run validation
  useEffect(() => validatePassword(), [password]);

  return (
    <Form layout="inline">
      <Form.Item>
        <Input type="password" placeholder="Password" onChange={handleChange} />
      </Form.Item>
      {password !== "" && <ValidationMessage />}
    </Form>
  );
};

export default Form.create()(PasswordValidation);
