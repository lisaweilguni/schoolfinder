import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import { createSession } from '../../database/sessions';
import { createUser, getUserByEmail } from '../../database/users';
import { createSerializedRegisterSessionTokenCookie } from '../../utils/cookies';

export type RegisterResponseBody =
  | { errors: { message: string }[] }
  | { user: { email: string } };

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
        .json({ errors: [{ message: 'All fields must be filled out.' }] });
    }
    // 2. Check if the user already exists
    const user = await getUserByEmail(request.body.email);

    if (user) {
      return response.status(401).json({
        errors: [{ message: 'This e-mail address is already in use.' }],
      });
    }

    // 3. Hash the password
    const passwordHash = await bcrypt.hash(request.body.password, 12);

    // 4. SQL Query to create the record/user
    const userWithoutPassword = await createUser(
      request.body.firstName,
      request.body.lastName,
      request.body.email,
      passwordHash,
    );

    // 5. Create a session token and serialize a cookie with the token
    const session = await createSession(
      userWithoutPassword.id,
      crypto.randomBytes(80).toString('base64'),
    );

    const serializedCookie = createSerializedRegisterSessionTokenCookie(
      session.token,
    );

    response
      .status(200)
      .setHeader('Set-Cookie', serializedCookie)
      .json({ user: { email: userWithoutPassword.email } });
  } else {
    response.status(401).json({ errors: [{ message: 'Method not allowed' }] });
  }
}
