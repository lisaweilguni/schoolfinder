import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import {
  createUser,
  getUserByEmail,
  getUserWithPasswordHashByEmail,
  User,
} from '../../database/users';

export type LoginResponseBody =
  | { errors: { message: string }[] }
  | { user: { email: string } };

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<LoginResponseBody>,
) {
  if (request.method === 'POST') {
    // 1. Make sure the data exists
    if (
      typeof request.body.email !== 'string' ||
      typeof request.body.password !== 'string' ||
      !request.body.email ||
      !request.body.password
    ) {
      return response
        .status(400)
        .json({ errors: [{ message: 'All fields must be filled out.' }] });
    }
    // 2. Get the user by the username
    const user = await getUserWithPasswordHashByEmail(request.body.email);

    if (!user) {
      return response.status(401).json({
        errors: [{ message: 'User not found.' }],
      });
    }

    // 3. Check if the hash and the pw match
    const isValidPassword = await bcrypt.compare(
      request.body.password,
      user.passwordHash,
    );

    if (!isValidPassword) {
      return response
        .status(401)
        .json({ errors: [{ message: 'Password is not valid.' }] });
    }

    // 4. Create sessions & token
    response.status(200).json({ user: { email: user.email } });
  } else {
    response.status(400).json({ errors: [{ message: 'Method not allowed' }] });
  }
}
