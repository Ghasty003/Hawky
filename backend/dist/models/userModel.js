"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        unique: true,
        required: true
    },
    displayPicture: {
        type: String
    }
});
userSchema.statics.signup = function (email, password, userName, displayPicture) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!email || !password || !userName) {
            throw new Error("All fields are required");
        }
        const exists = yield this.findOne({ email });
        if (exists) {
            throw new Error("User already exists");
        }
        const username = yield this.findOne({ userName });
        if (username) {
            throw new Error("Username is already in use");
        }
        if (password.length < 6) {
            throw new Error("Password must be greater than six characters");
        }
        const user = yield this.create({ email, password, userName, displayPicture });
        return user;
    });
};
userSchema.statics.login = function (email, password, userName) {
    return __awaiter(this, void 0, void 0, function* () {
        if ((!email && !userName) || !password) {
            throw new Error("All fields are required");
        }
        const user = yield this.findOne({ $or: [{ email }, { userName }] });
        if (!user) {
            throw new Error("Incorrect email or username");
        }
        if (password !== user.password) {
            throw new Error("Password is incorrect");
        }
        return user;
    });
};
exports.default = mongoose_1.default.model("users", userSchema);
