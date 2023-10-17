// logic for validating the form

export const validateEmail = (email) => {
  const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
  var errorMessage = null;
  if (email.length === 0) {
    errorMessage = "Please fill up the email field.";

    return { isValid: false, errorMessage };
  }
  if (!email.match(emailPattern)) {
    errorMessage = "Please enter a valid email address.";
    return { isValid: false, errorMessage };
  } else {
    console.log(email);
    return { isValid: true, errorMessage: null };
  }
};

export const validatePassword = (password) => {
  var errorMessage = null;
  if (password.length === 0) {
    errorMessage = "Please fill up the password field.";
    return { isValid: false, errorMessage };
  } else if (password.length < 8) {
    errorMessage = "Password must be at least 8 characters long.";
    return { isValid: false, errorMessage };
  } else if (password.length > 20) {
    errorMessage = "Password must be at most 20 characters long.";
    return { isValid: false, errorMessage };
  } else if (!/[A-Z]/.test(password)) {
    errorMessage = "Password must contain at least one uppercase letter.";
    return { isValid: false, errorMessage };
  } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errorMessage = "Password must contain at least one special symbol.";
    return { isValid: false, errorMessage };
  } else {
    console.log(password);
    return { isValid: true, errorMessage: null };
  }
};

export const validateName = (name) => {
  var errorMessage = null;
  if (name.length === 0) {
    errorMessage = "Please fill up the name field.";
    return { isValid: false, errorMessage };
  } else {
    console.log(name);
    return { isValid: true, errorMessage: null };
  }
};
