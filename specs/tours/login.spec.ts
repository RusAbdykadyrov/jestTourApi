import * as supertest from "supertest";
const request = supertest("localhost:8001/api/v1");
import { user } from "../../data/user"
import { deleteFunction, login, signUp } from "../../data/helpers"

describe('USER SIGNUP AND LOGIN', () => {
    describe('POSITVE', () => {
        let cookie: [x: string];
        it("login user with delete request", async () => {
            await signUp(user).then((res) => {
                expect(res.statusCode).toBe(201);
                expect(res.body.data.user.email).toEqual(user.email);
            })
            cookie = await login(user).then(el => {
                expect(el.statusCode).toBe(200);
                return el.header['set-cookie']
            })
            await deleteFunction(cookie).then((el) => {
                expect(el.statusCode).toBe(204);
            });
            await login(user).then(el => {
                expect(el.statusCode).toBe(401);
            })
            });
        })
    });

    // it.skip("login user with imported data", async () => {
    //     // запрос на регистр 
    //     const resSignup = await request
    //         .post("/users/signup")
    //         .send(user)
    //         .expect(201);

    //     // проверка регистрации
    //     expect(resSignup.body.data.user.name).toBe(user.name);
    //     expect(resSignup.body.data.user.email).toBe(user.email);
    //     expect(resSignup.body.token).toBeDefined();
    //     expect(typeof resSignup.body.token).toBe('string');

    //     // запрос  на входв систему
    //     const resLogin = await request
    //         .post('/users/login')
    //         .send({ email: user.email, password: user.password })
    //         .expect(200);

    //     // проваерки на успешность входа
    //     expect(resLogin.body.data.user.name).toBe(user.name);
    //     expect(resLogin.body.data.user.email).toBe(user.email);
    //     expect(resLogin.body.token).toBeDefined();
    //     expect(typeof resLogin.body.token).toBe('string');
    // });

    describe.only('NEGATIVE', () => {
        let cookie: [x: string]
        beforeEach(async () => {
            await signUp(user).then((res) => {
                expect(res.statusCode).toEqual(201);
                expect(res.body.data.user.email).toEqual(user.email);
                expect(res.body.data.user.name).toEqual(user.name);
                expect(res.body.data.user.role).toEqual("admin");
                expect(res.body.token).toBeDefined();
                cookie = res.headers['set-cookie'];
            });
        });
        afterEach(async () => {
            await deleteFunction(cookie).then((el) => {
                expect(el.statusCode).toBe(204);
                expect(el.body).toEqual({});
            });
        });
        it('user cannot login with invalid credentials', async () => {
            await login({
                email: user.email + '1',
                password: user.password + '1'
            }).then(el => {
                console.log(el.body, '==========el================');
                expect(el.statusCode).toBe(401);
            });
        });
    });