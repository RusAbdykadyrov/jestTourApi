import { faker } from '@faker-js/faker';
import { User } from "./interface";
let password = createRandomUser().password
export const user = { 
    email: createRandomUser().email.toLowerCase(),
    password: password,
    passwordConfirm: password,
    name: createRandomUser().username,
}

export function createRandomUser(): User {
  return {
    userId: faker.string.uuid(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    password: faker.internet.password(),
    birthdate: faker.date.birthdate(),
    registeredAt: faker.date.past(),
  };
}
