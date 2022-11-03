import { NextApiRequest, NextApiResponse } from 'next';
import {
  createSchool,
  SchoolWithSpecializations,
} from '../../../database/schools';
import { getValidSessionByToken } from '../../../database/sessions';

export type SchoolResponseBody =
  | { school: SchoolWithSpecializations }
  | { errors: { message: string }[] };

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<SchoolResponseBody>,
) {
  const session =
    request.cookies.sessionToken &&
    (await getValidSessionByToken(request.cookies.sessionToken));

  if (!session) {
    response
      .status(400)
      .json({ errors: [{ message: 'No valid session token passed' }] });
    return;
  }

  if (request.method === 'POST') {
    if (!request.cookies.sessionToken) {
      response
        .status(400)
        .json({ errors: [{ message: 'No session token passed' }] });
      return;
    }

    const schoolName = request.body.schoolName;
    const areaId = request.body.areaId;
    const postalCode = request.body.postalCode;
    const street = request.body.street;
    const website = request.body.website;
    const isPublic = request.body.isPublic;
    const userId = request.body.userId;
    const specializationIds = request.body.specializationIds;

    if (
      !(
        schoolName &&
        areaId &&
        postalCode &&
        street &&
        website &&
        isPublic &&
        specializationIds
      )
    ) {
      return response
        .status(400)
        .json({ errors: [{ message: 'All fields must be filled out' }] });
    }

    // Create new school using util database function
    const newSchool = await createSchool(
      schoolName,
      areaId,
      postalCode,
      street,
      website,
      isPublic,
      userId,
      specializationIds,
    );

    // response with the newly created school
    return response.status(200).json({ school: newSchool });
  }

  return response
    .status(400)
    .json({ errors: [{ message: 'Method not allowed' }] });
}
