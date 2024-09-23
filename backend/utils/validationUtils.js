// This file contains validation methods for various attributes.
const { validate } = require("uuid");
const { dateFormat, parseDate } = require("./dateUtils");

// Validate the name by checking if it's not empty
const validateName = (name) => {
  if (!name || name.trim() === "") {
    return { valid: false, message: "Name cannot be empty" };
  }
  return { valid: true };
};

// Validate that the employee's ID matches the 'UIXXXXXXX' format
const validateEmployeeId = (id) => {
  const regex = /^UI[A-Z0-9]{7}$/;
  if (!regex.test(id)) {
    return { valid: false, message: "Invalid Employee ID format, must match UIXXXXXXX" };
  }
  return { valid: true };
};

// Validate the cafe's ID format
const validateCafeId = (id) => {
  if (!validate(id)) {
    return { valid: false, message: "Invalid Cafe ID format" };
  }
  return { valid: true };
};

// Validate that the email address is in the correct format and not empty
const validateEmail = (email) => {
  if (!email || email.trim() === "") {
    return { valid: false, message: "Email cannot be empty" };
  }
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!regex.test(email)) {
    return { valid: false, message: "Email does not fit the required format" };
  }
  return { valid: true };
};

// Validate that the phone number is in the correct format and not empty
const validatePhoneNumber = (phone_number) => {
  if (!phone_number || phone_number.trim() === "") {
    return { valid: false, message: "Phone number cannot be empty" };
  }
  const regex = /^[89]\d{7}$/; // Starts with 8 or 9, and 8 digits long
  if (!regex.test(phone_number)) {
    return {
      valid: false,
      message: "Phone number must start with 8 or 9 and be 8 digits long",
    };
  }
  return { valid: true };
};

// Validate the gender and check if it's not empty
const validateGender = (gender) => {
  if (!gender || gender.trim() === "") {
    return { valid: false, message: "Gender cannot be empty" };
  }
  if (!["male", "female"].includes(gender.toLowerCase())) {
    return { valid: false, message: "Gender must be either Male or Female" };
  }
  return { valid: true };
};

// Validate the date syntax
const validateDate = (date) => {
  const parsedDate = parseDate(date);
  if (!parsedDate.isValid()) {
    return { valid: false, message: `Invalid date format, it must be in the format ${dateFormat}` };
  }
  return { valid: true };
};

// Validate the description by checking if it's not empty
const validateDescription = (description) => {
  if (!description || description.trim() === "") {
    return { valid: false, message: "Description cannot be empty" };
  }
  return { valid: true };
};

// Validate the location by checking if it's not empty
const validateLocation = (location) => {
  if (!location || location.trim() === "") {
    return { valid: false, message: "Location cannot be empty" };
  }
  return { valid: true };
};

module.exports = {
  validateName,
  validateEmployeeId,
  validateCafeId,
  validateEmail,
  validatePhoneNumber,
  validateGender,
  validateDate,
  validateDescription,
  validateLocation,
};
