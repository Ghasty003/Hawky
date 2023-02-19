"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const requireAuth_1 = __importDefault(require("../middlewares/requireAuth"));
const router = express_1.default.Router();
router.use(requireAuth_1.default);
router.post("/signup", userController_1.signUp);
router.post("/login", userController_1.Login);
router.delete("/delete/:id", userController_1.deleteAccount);
router.get("/:userName", userController_1.findUser);
exports.default = router;
