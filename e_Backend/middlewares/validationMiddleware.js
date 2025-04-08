import { validationResult, check } from "express-validator";

// Validation for product creation
export const validateProduct = [
  check("name").notEmpty().withMessage("Product name is required"),
  check("price").isNumeric().withMessage("Price must be a number"),
  check("description").notEmpty().withMessage("Description is required"),
  check("category").notEmpty().withMessage("Category is required"),
];

// Validate user signup request
export const validateSignup = [
  check("name").notEmpty().withMessage("Name is required"),
  check("email").isEmail().withMessage("Invalid email format"),
  check("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
];

// Validate user signin request
export const validateSignin = [
  check("email").isEmail().withMessage("Invalid email format"),
  check("password").notEmpty().withMessage("Password is required"),
];

// Middleware to check for validation errors
export const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
