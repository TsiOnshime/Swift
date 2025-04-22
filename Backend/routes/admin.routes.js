const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const adminController = require("../controllers/admin.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  adminController.registerAdmin
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  adminController.loginAdmin
);

router.get(
  "/profile",
  authMiddleware.authAdmin,
  adminController.getAdminProfile
);

router.get("/logout", authMiddleware.authAdmin, adminController.logoutAdmin);

// After admin is added
// (Admin) Add a new scooter
router.post("/", authMiddleware.authUser, authMiddleware.authAdmin, adminController.createScooter);

// (Admin) Update scooter info
router.put("/:id", authMiddleware.authUser, authMiddleware.authAdmin, adminController.updateScooter);

// (Admin) Delete a scooter
router.delete(
  "/:id",
  authMiddleware.authAdmin,
  adminController.deleteScooter
);

// (Admin) Update battery level
router.patch(
  "/:qrCode/battery",
  authMiddleware.authAdmin,
  adminController.updateBatteryLevel
);

module.exports = router;