function Validation(value) {
  let error = {};
  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

  if (value.name === "") {
    error.name = "Name should not be empty";
  } else {
    error.name = "";
  }

  if (value.email === "") {
    error.email = "Email should not be empty";
  } else if (!email_pattern.test(value.email)) {
    error.email = "Invalid email format";
  } else {
    error.email = "";
  }

  if (value.password === "") {
    error.password = "Password should not be empty";
  } else if (!password_pattern.test(value.password)) {
    error.password = "Password must contain at least 8 characters, including uppercase, lowercase, and a number";
  } else {
    error.password = "";
  }

  return error;
}

export default Validation;
