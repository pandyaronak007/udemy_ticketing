"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../../app");
const signInUri = '/api/users/signIn';
const signUpUri = '/api/users/signUp';
it('fails when a email does not exist is supplied', () => __awaiter(void 0, void 0, void 0, function* () {
    return (0, supertest_1.default)(app_1.app)
        .post(signInUri)
        .send({
        "email": "tes@test.com",
        "password": "112334456"
    })
        .expect(400);
}));
it('fails when an incorrect password is supplied', () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, supertest_1.default)(app_1.app)
        .post(signUpUri)
        .send({
        "email": "test1@test.com",
        "password": "11233445"
    })
        .expect(201);
    yield (0, supertest_1.default)(app_1.app)
        .post(signInUri)
        .send({
        "email": "test1@test.com",
        "password": "112334456"
    })
        .expect(400);
}));
it('responds with a cookie when given valid credentials', () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, supertest_1.default)(app_1.app)
        .post(signUpUri)
        .send({
        "email": "test1@test.com",
        "password": "11233445"
    })
        .expect(201);
    const response = yield (0, supertest_1.default)(app_1.app)
        .post(signInUri)
        .send({
        "email": "test1@test.com",
        "password": "11233445"
    })
        .expect(200);
    expect(response.get('Set-Cookie')).toBeDefined();
}));
