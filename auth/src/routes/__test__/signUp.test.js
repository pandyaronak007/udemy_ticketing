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
const apiUri = '/api/users/signUp';
it('returns a 201 on successful singUp', () => __awaiter(void 0, void 0, void 0, function* () {
    return (0, supertest_1.default)(app_1.app)
        .post(apiUri)
        .send({
        "email": "test1@test.com",
        "password": "11233445"
    })
        .expect(201);
}));
it('returns a 400 with an invalid email', () => __awaiter(void 0, void 0, void 0, function* () {
    return (0, supertest_1.default)(app_1.app)
        .post(apiUri)
        .send({
        "email": "test1",
        "password": "11233445"
    })
        .expect(400);
}));
it('returns a 400 with an invalid password', () => __awaiter(void 0, void 0, void 0, function* () {
    return (0, supertest_1.default)(app_1.app)
        .post(apiUri)
        .send({
        "email": "test1",
        "password": "11"
    })
        .expect(400);
}));
it('returns a 400 with missing email and  password', () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, supertest_1.default)(app_1.app)
        .post(apiUri)
        .send({ "email": "test1@test.com" })
        .expect(400);
    yield (0, supertest_1.default)(app_1.app)
        .post(apiUri)
        .send({ "password": "11233445" })
        .expect(400);
}));
it('disallows duplicate email', () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, supertest_1.default)(app_1.app)
        .post(apiUri)
        .send({
        "email": "test1@test.com",
        "password": "11233445"
    })
        .expect(201);
    yield (0, supertest_1.default)(app_1.app)
        .post(apiUri)
        .send({
        "email": "test1@test.com",
        "password": "11233445"
    })
        .expect(400);
}));
it('it sets a cookie after successful singup', () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, supertest_1.default)(app_1.app)
        .post(apiUri)
        .send({
        "email": "test1@test.com",
        "password": "11233445"
    })
        .expect(201);
    expect(response.get('Set-Cookie')).toBeDefined();
}));
