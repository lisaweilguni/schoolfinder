import { NextApiRequest, NextApiResponse } from 'next';
import { getAllSchools } from '../../../database/schools';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (request.method === 'GET') {
    const schools = await getAllSchools();

    return response.status(200).json(schools);
  }
  return response.status(400).json({ message: 'Method Not Allowed' });
}
