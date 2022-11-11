import { NextApiRequest, NextApiResponse } from 'next';
import {
  createSchool,
  deleteSchoolByUserId,
  getSchoolByUserId,
  School,
  SchoolWithSpecializations,
  updateSchool,
} from '../../../database/schools';
import { getValidSessionByToken } from '../../../database/sessions';

export type SchoolResponseBody =
  | { school: SchoolWithSpecializations | School }
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

    // Check if this user has already created a school
    const schoolByUserId = await getSchoolByUserId(
      request.body.userId,
      request.cookies.sessionToken,
    );
    if (schoolByUserId?.length) {
      response
        .status(400)
        .json({ errors: [{ message: "You've already added your school." }] });
      return;
    }

    const schoolName = request.body?.schoolName;
    const areaId = request.body?.areaId;
    const postalCode = request.body?.postalCode;
    const street = request.body?.street;
    const website = request.body?.website;
    const isPublic = request.body?.isPublic;
    const userId = request.body?.userId;
    const specializationIds = request.body?.specializationIds;

    if (!schoolName && typeof schoolName !== 'string') {
      return response
        .status(400)
        .json({ errors: [{ message: 'Please provide the school name.' }] });
    }

    if (!areaId) {
      return response
        .status(400)
        .json({ errors: [{ message: 'Please select an area.' }] });
    }

    if (!postalCode) {
      return response.status(400).json({
        errors: [{ message: 'Please provide the postal code' }],
      });
    }

    if (!street) {
      return response.status(400).json({
        errors: [{ message: 'Please provide the street and house number.' }],
      });
    }

    if (isPublic === '') {
      return response.status(400).json({
        errors: [{ message: 'Please select the type of school.' }],
      });
    }

    if (!website) {
      return response
        .status(400)
        .json({ errors: [{ message: 'Please provide your website.' }] });
    }

    if (!specializationIds) {
      return response.status(400).json({
        errors: [{ message: 'Please select at least one specialization.' }],
      });
    }

    if (typeof areaId !== 'number') {
      return response
        .status(400)
        .json({ errors: [{ message: 'Please select a valid area.' }] });
    }

    // Create new school using util database function
    const newSchool = await createSchool(
      schoolName,
      areaId,
      postalCode,
      street,
      website,
      Boolean(isPublic),
      userId,
      specializationIds,
    );

    // response with the newly created school
    return response.status(200).json({ school: newSchool });
  }

  if (request.method === 'PUT') {
    if (!request.cookies.sessionToken) {
      response
        .status(400)
        .json({ errors: [{ message: 'No session token passed' }] });
      return;
    }

    const schoolName = request.body?.schoolName;
    const areaId = request.body?.areaId;
    const postalCode = request.body?.postalCode;
    const street = request.body?.street;
    const website = request.body?.website;
    const isPublic = request.body?.isPublic;
    const userId = request.body?.userId;
    const specializationIds = request.body?.specializationIds;

    if (!schoolName) {
      return response
        .status(400)
        .json({ errors: [{ message: 'Please provide the school name.' }] });
    }

    if (!areaId) {
      return response
        .status(400)
        .json({ errors: [{ message: 'Please select an area.' }] });
    }

    if (!postalCode) {
      return response.status(400).json({
        errors: [{ message: 'Please provide the postal code' }],
      });
    }

    if (!street) {
      return response.status(400).json({
        errors: [{ message: 'Please provide the street and house number.' }],
      });
    }

    if (isPublic === '') {
      return response.status(400).json({
        errors: [{ message: 'Please select the type of school.' }],
      });
    }

    if (!website) {
      return response
        .status(400)
        .json({ errors: [{ message: 'Please provide your website.' }] });
    }

    if (!specializationIds) {
      return response.status(400).json({
        errors: [{ message: 'Please select at least one specialization.' }],
      });
    }

    // Create new school using util database function
    const updatedSchool = await updateSchool(
      schoolName,
      Number(areaId),
      postalCode,
      street,
      website,
      Boolean(isPublic),
      userId,
      specializationIds,
    );

    // response with updated school
    return response.status(200).json({ school: updatedSchool });
  }

  if (request.method === 'DELETE') {
    if (!request.cookies.sessionToken) {
      response
        .status(400)
        .json({ errors: [{ message: 'No session token passed' }] });
      return;
    }

    const deletedSchool = await deleteSchoolByUserId(
      request.body.userId,
      request.cookies.sessionToken,
    );

    if (!deletedSchool) {
      return response
        .status(404)
        .json({ errors: [{ message: 'No school found' }] });
    }

    return response.status(200).json({ school: deletedSchool });
  }

  return response
    .status(400)
    .json({ errors: [{ message: 'Method not allowed' }] });
}
