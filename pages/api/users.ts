import { NextApiRequest, NextApiResponse } from 'next';
import { deleteUserByToken, getUserBySessionToken } from '../../database/users';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (request.method === 'GET') {
    // 1. Get the cookie from the request
    const token = request.cookies.sessionToken;

    if (!token) {
      response
        .status(400)
        .json({ errors: [{ message: 'No session token passed.' }] });
      return;
    }

    // 2. Get the user from the token
    const user = await getUserBySessionToken(token);

    if (!user) {
      response
        .status(400)
        .json({ errors: [{ message: 'Session token not valid.' }] });
      return;
    }

    // return the user from the session token
    response.status(200).json({ user: user });
  }

  if (request.method === 'DELETE') {
    // 1. Get the cookie from the request
    const token = request.cookies.sessionToken;

    if (!token) {
      response
        .status(400)
        .json({ errors: [{ message: 'No session token passed.' }] });
      return;
    }

    const deletedUser = await deleteUserByToken(token);

    if (!deletedUser) {
      return response.status(404).json({ message: 'Not a valid user' });
    }

    return response.status(200).json(deletedUser);
  }

  return response
    .status(405)
    .json({ errors: [{ message: 'Method not allowed' }] });
}
