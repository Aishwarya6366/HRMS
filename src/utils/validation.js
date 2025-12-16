// =================== REUSABLE VALIDATION UTILITY ===================
// Import this file anywhere you need field validation

export const validators = {
  // 1. Employee ID: Alphanumeric, 1-10 characters
  employeeId: (value) => {
    if (!value || value.trim() === '') return 'Employee ID is required';
    if (value.length < 1 || value.length > 10) return 'Employee ID must be 1-10 characters';
    if (!/^[A-Za-z0-9]{1,10}$/.test(value)) return 'Employee ID must be alphanumeric only';
    return null;
  },

  // 2. Name: Letters, spaces, hyphen, dot, 2-50 characters
  name: (value) => {
    if (!value || value.trim() === '') return 'Name is required';
    const trimmed = value.trim();
    if (trimmed.length < 2 || trimmed.length > 50) return 'Name must be 2-50 characters';
    if (!/^[A-Za-z .'-]{1,50}$/.test(trimmed)) return 'Name can only contain letters, spaces, dots, hyphens, and apostrophes';
    return null;
  },

  // 3. Surname: Same as name validation
  surname: (value) => {
    if (!value || value.trim() === '') return 'Surname is required';
    const trimmed = value.trim();
    if (trimmed.length < 2 || trimmed.length > 50) return 'Surname must be 2-50 characters';
    if (!/^[A-Za-z .'-]{1,50}$/.test(trimmed)) return 'Surname can only contain letters, spaces, dots, hyphens, and apostrophes';
    return null;
  },

  // 4. UID (Aadhaar): 12 digits, starts with 2-9
  uid: (value) => {
    if (!value || value.trim() === '') return 'UID is required';
    const trimmed = value.trim();
    if (trimmed.length !== 12) return 'UID must be exactly 12 digits';
    if (!/^[2-9]/.test(trimmed)) return 'UID must start with digit 2-9';
    if (!/^[2-9][0-9]{11}$/.test(trimmed)) return 'UID must contain only numbers';
    return null;
  },

  // 5. Gender: Only Male/Female/Other/Prefer not to say
  gender: (value) => {
    if (!value) return 'Gender is required';
    const validGenders = ['Male', 'Female', 'Other', 'Prefer not to say'];
    if (!validGenders.includes(value)) return `Gender must be one of: ${validGenders.join(', ')}`;
    return null;
  },

  // 6. Nationality: Letters and spaces, 3-30 characters
  nationality: (value) => {
    if (!value || value.trim() === '') return 'Nationality is required';
    const trimmed = value.trim();
    if (trimmed.length < 3 || trimmed.length > 30) return 'Nationality must be 3-30 characters';
    if (!/^[A-Za-z ]{2,30}$/.test(trimmed)) return 'Nationality can only contain letters and spaces';
    return null;
  },

  // 7. PAN Number: Strict 10-character format
  panNumber: (value) => {
    if (!value || value.trim() === '') return 'PAN Number is required';
    const trimmed = value.trim();
    if (trimmed.length !== 10) return 'PAN Number must be exactly 10 characters';
    if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(trimmed)) return 'PAN Number must match format: ABCDE1234F';
    return null;
  },

  // 8. Date of Birth: At least 18 years old
  dateOfBirth: (value) => {
    if (!value) return 'Date of Birth is required';
    const dob = new Date(value);
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    
    if (dob > today) return 'Date of Birth cannot be in the future';
    if (age < 18 || (age === 18 && monthDiff < 0)) return 'Must be at least 18 years old';
    return null;
  },

  // 9. Marital Status: Single/Married/Divorced/Widowed/Separated
  maritalStatus: (value) => {
    if (!value) return 'Marital Status is required';
    const validStatus = ['Single', 'Married', 'Divorced', 'Widowed', 'Separated'];
    if (!validStatus.includes(value)) return `Marital Status must be one of: ${validStatus.join(', ')}`;
    return null;
  },

  // 10. Password: 8-20 chars, upper, lower, digit, special character
  password: (value) => {
    if (!value) return 'Password is required';
    if (value.length < 8 || value.length > 20) return 'Password must be 8-20 characters';
    if (!/(?=.*[a-z])/.test(value)) return 'Password must contain at least one lowercase letter';
    if (!/(?=.*[A-Z])/.test(value)) return 'Password must contain at least one uppercase letter';
    if (!/(?=.*\d)/.test(value)) return 'Password must contain at least one digit';
    if (!/(?=.*[^A-Za-z0-9])/.test(value)) return 'Password must contain at least one special character';
    return null;
  },

  // 11. Email: Valid email format
  email: (value) => {
    if (!value || value.trim() === '') return 'Email is required';
    const trimmed = value.trim();
    if (trimmed.length < 6 || trimmed.length > 50) return 'Email must be 6-50 characters';
    if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(trimmed)) {
      return 'Enter a valid email address (e.g., name@example.com)';
    }
    return null;
  },

  // 12. Mobile Number: 10 digits
  mobileNumber: (value) => {
    if (!value || value.trim() === '') return 'Mobile Number is required';
    const trimmed = value.trim();
    if (trimmed.length !== 10) return 'Mobile Number must be exactly 10 digits';
    if (!/^\d{10}$/.test(trimmed)) return 'Mobile Number must contain only numbers';
    return null;
  },

  // 13. Blood Group: Valid blood group format (Optional)
  bloodGroup: (value) => {
    if (!value || value.trim() === '') return null; // Optional field
    const validGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
    if (!validGroups.includes(value.trim())) return 'Enter a valid blood group (e.g., A+, O-)';
    return null;
  },

  // 14. Address: 3-500 characters
  address: (value, fieldName = 'Address') => {
    if (!value || value.trim() === '') return `${fieldName} is required`;
    const trimmed = value.trim();
    if (trimmed.length < 3 || trimmed.length > 500) return `${fieldName} must be 3-500 characters`;
    return null;
  },

  // 15. Emergency Contact Name: Letters, spaces, 2-50 characters
  emergencyName: (value) => {
    if (!value || value.trim() === '') return 'Emergency Contact Name is required';
    const trimmed = value.trim();
    if (trimmed.length < 2 || trimmed.length > 50) return 'Name must be 2-50 characters';
    if (!/^[A-Za-z .'-]{1,50}$/.test(trimmed)) return 'Name can only contain letters, spaces, dots, hyphens, and apostrophes';
    return null;
  },

  // 16. Emergency Relation: Letters and spaces, 2-50 characters
  emergencyRelation: (value) => {
    if (!value || value.trim() === '') return 'Relationship is required';
    const trimmed = value.trim();
    if (trimmed.length < 2 || trimmed.length > 50) return 'Relationship must be 2-50 characters';
    if (!/^[A-Za-z ]{1,50}$/.test(trimmed)) return 'Relationship can only contain letters and spaces';
    return null;
  },

  // 17. Required field validation (generic)
  required: (value, fieldName = 'This field') => {
    if (!value || value.toString().trim() === '') return `${fieldName} is required`;
    return null;
  },

  // 18. Number validation
  number: (value, fieldName = 'This field') => {
    if (!value || value.toString().trim() === '') return `${fieldName} is required`;
    if (!/^\d+$/.test(value.toString().trim())) return `${fieldName} must contain only numbers`;
    return null;
  },

  // 19. Alphanumeric validation
  alphanumeric: (value, fieldName = 'This field', min = 1, max = 50) => {
    if (!value || value.toString().trim() === '') return `${fieldName} is required`;
    const trimmed = value.toString().trim();
    if (trimmed.length < min || trimmed.length > max) return `${fieldName} must be ${min}-${max} characters`;
    if (!/^[A-Za-z0-9]+$/.test(trimmed)) return `${fieldName} must be alphanumeric only`;
    return null;
  },

  // 20. Text with spaces validation
  textWithSpaces: (value, fieldName = 'This field', min = 1, max = 100) => {
    if (!value || value.toString().trim() === '') return `${fieldName} is required`;
    const trimmed = value.toString().trim();
    if (trimmed.length < min || trimmed.length > max) return `${fieldName} must be ${min}-${max} characters`;
    if (!/^[A-Za-z ]+$/.test(trimmed)) return `${fieldName} can only contain letters and spaces`;
    return null;
  }
};

// =================== REUSABLE VALIDATION HOOK ===================
// Use this hook in any component for form validation
export const useValidation = (initialState = {}) => {
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState(initialState);

  // Validate single field
  const validateField = (fieldName, value, validatorType, customMessage = null) => {
    let error = null;
    
    // Check if validatorType is a function or a string
    if (typeof validatorType === 'function') {
      error = validatorType(value);
    } else if (validators[validatorType]) {
      error = validators[validatorType](value);
    } else if (customMessage) {
      error = customMessage;
    }
    
    setErrors(prev => ({
      ...prev,
      [fieldName]: error
    }));
    
    return !error; // Returns true if valid
  };

  // Validate multiple fields at once
  const validateFields = (fieldValidations) => {
    const newErrors = {};
    let isValid = true;

    fieldValidations.forEach(({ field, value, validator, fieldName }) => {
      const error = validators[validator](value, fieldName);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  // Clear all errors
  const clearErrors = () => {
    setErrors({});
  };

  // Clear specific error
  const clearError = (fieldName) => {
    setErrors(prev => ({
      ...prev,
      [fieldName]: null
    }));
  };

  return {
    errors,
    values,
    setValues,
    validateField,
    validateFields,
    clearErrors,
    clearError
  };
};

// =================== VALIDATOR GROUPS FOR SPECIFIC FORMS ===================
// Import these groups based on your form type

export const loginValidators = {
  employeeId: validators.employeeId,
  password: validators.password
};

export const registrationValidators = {
  employeeId: validators.employeeId,
  name: validators.name,
  surname: validators.surname,
  uid: validators.uid,
  gender: validators.gender,
  nationality: validators.nationality,
  panNumber: validators.panNumber,
  dateOfBirth: validators.dateOfBirth,
  maritalStatus: validators.maritalStatus,
  email: validators.email,
  mobileNumber: validators.mobileNumber
};

export const personalInfoValidators = {
  bloodGroup: validators.bloodGroup,
  address: validators.address
};

export const emergencyContactValidators = {
  emergencyName: validators.emergencyName,
  emergencyRelation: validators.emergencyRelation,
  mobileNumber: validators.mobileNumber
};

// =================== FORM VALIDATION HELPER ===================
// Use this function to validate complete forms
export const validateForm = (formData, validationRules) => {
  const errors = {};
  let isValid = true;

  Object.keys(validationRules).forEach(field => {
    const validator = validationRules[field];
    const value = formData[field];
    
    if (typeof validator === 'function') {
      const error = validator(value);
      if (error) {
        errors[field] = error;
        isValid = false;
      }
    } else if (typeof validator === 'string' && validators[validator]) {
      const error = validators[validator](value);
      if (error) {
        errors[field] = error;
        isValid = false;
      }
    }
  });

  return { isValid, errors };
};

// =================== FIELD VALIDATION UTILITY ===================
// Simple function to validate any field
export const validateField = (fieldName, value, validatorName) => {
  if (!validators[validatorName]) {
    console.warn(`Validator "${validatorName}" not found`);
    return { isValid: true, error: null };
  }
  
  const error = validators[validatorName](value);
  return {
    isValid: !error,
    error
  };
};