import express from 'express'
import { body } from 'express-validator'
import * as adminController from '../controllers/admin.controller.js'
import * as authMiddleware from '../middlewares/auth.middleware.js'
import { adminRegisterSchema, adminLoginSchema } from "../validators/admin.validator.js";
import { validateBody } from "../middlewares/validate.middleware.js";

const router = express.Router();

router.post(
  "/register",
  validateBody(adminRegisterSchema),
  adminController.registerAdmin
);

router.post(
  "/login",
  validateBody(adminLoginSchema),
  adminController.loginAdmin
);

router.get(
  "/profile",authMiddleware.authUser,
  authMiddleware.authAdmin,
  adminController.getAdminProfile
);

router.get(
  "/logout",
  authMiddleware.authUser,
  authMiddleware.authAdmin,
  adminController.logoutAdmin
);

// After admin is added
// (Admin) Add a new scooter
router.post("/", authMiddleware.authUser, authMiddleware.authAdmin, adminController.createScooter);

// (Admin) Update scooter info
router.put("/:id", authMiddleware.authUser, authMiddleware.authAdmin, adminController.updateScooter);

// (Admin) Delete a scooter
router.delete(
  "/:id",
  authMiddleware.authUser,
  authMiddleware.authAdmin,
  adminController.deleteScooter
);

// (Admin) Update battery level
router.patch(
  "/:qrCode/battery",
  authMiddleware.authUser,
  authMiddleware.authAdmin,
  adminController.updateBatteryLevel
);

export default router;