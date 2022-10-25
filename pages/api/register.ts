import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import { createUser, getUserByEmail, User } from '../../database/users';

export type RegisterResponseBody =
  | { errors: { message: string }[] }
  | { user: User };

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<RegisterResponseBody>,
) {
  if (request.method === 'POST') {
    // 1. Make sure the data exists
    if (
      typeof request.body.email !== 'string' ||
      typeof request.body.firstName !== 'string' ||
      typeof request.body.lastName !== 'string' ||
      typeof request.body.password !== 'string' ||
      !request.body.email ||
      !request.body.firstName ||
      !request.body.lastName ||
      !request.body.password
    ) {
      return response
        .status(400)
        .json({ errors: [{ message: 'email or password not provided' }] });
    }
    // 2. Check if the user already exists
    const user = await getUserByEmail(request.body.email);

    if (user) {
      return response
        .status(401)
        .json({ errors: [{ message: 'email is already taken' }] });
    }

    // 3. Hash the password
    const passwordHash = await bcrypt.hash(request.body.password, 12);

    // 4. SQL Query to create the record
    const userWithoutPassword = await createUser(
      request.body.firstName,
      request.body.lastName,
      request.body.email,
      passwordHash,
    );
  } else {
    response.status(400).json({ errors: [{ message: 'Method not allowed' }] });
  }
}
