import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import { createSession } from '../../database/sessions';
import { getUserWithPasswordHashByEmail } from '../../database/users';
import { createSerializedRegisterSessionTokenCookie } from '../../utils/cookies';

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
        .json({ errors: [{ message: 'E-mail or password incorrect.' }] });
    }

    // 4. Create a session token and serialize a cookie with the token
    const session = await createSession(
      user.id,
      crypto.randomBytes(80).toString('base64'),
    );

    const serializedCookie = createSerializedRegisterSessionTokenCookie(
      session.token,
    );

    // This is the response for any method on this endpoint
    response
      .status(200)
      .setHeader('Set-Cookie', serializedCookie)
      .json({ user: { email: user.email } });
  } else {
    response.status(401).json({ errors: [{ message: 'Method not allowed' }] });
  }
}
