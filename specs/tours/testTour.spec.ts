import * as supertest from "supertest";
import { user } from "../../data/user";
import { deleteFunction, login, signUp } from "../../data/helpers";

const request = supertest("http://localhost:8001/api/v1"); 
describe('Test POST request body', () => {
  let token;

  beforeAll(async () => {
    await signUp(user); 
  });

  afterAll(async () => {
    // Удаляем пользователя после выполнения теста
    await deleteFunction(user); 
  });

  test('It should return success status with correct data', async () => {
    const response = await request
      .post('/your-endpoint') 
      .set('Authorization', `Bearer ${token}`) 
      .send({
        name: "TourForn605",
        duration: 10,
        maxGroupSize: 10,
        difficulty: "easy",
        price: 100,
        summary: "Test tour",
        description: "Could be",
        imageCover: "tour-3-cover.jpg",
        startDates: ["2024-04-04T00:00:00.000Z"],
        secretTour: false,
        startLocation: {
          type: "Point",
          coordinates: [-74.005974, 40.712776]
        }
      });

    expect(response.status).toBe(200); // Проверяем успешный статус ответа
    expect(response.body.status).toBe("success"); // Проверяем, что статус возвращается как "success"
    // Другие проверки на основе ожидаемого ответа
  });
});