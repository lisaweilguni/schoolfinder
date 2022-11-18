import { sql } from './connect';
import { Specialization } from './specializations';

export type School = {
  id: number;
  name: string;
  areaId: number;
  postalCode: string;
  street: string;
  website: string;
  isPublic: boolean;
  userId: number;
};

export type SchoolWithSpecializations = {
  id: number;
  name: string;
  areaId: number;
  postalCode: string;
  street: string;
  website: string;
  isPublic: boolean;
  userId: number;
  specializations: Specialization[];
};

export type SchoolWithAreaNameAndSpecializations = {
  schoolId: number;
  schoolName: string;
  areaId: number;
  areaName: string;
  postalCode: string;
  street: string;
  website: string;
  isPublic: boolean;
  specializationId: number;
  specializationName: string;
};

export type SchoolWithAreaNameAndSpecializationsAndUserId = {
  schoolId: number;
  schoolName: string;
  areaId: number;
  areaName: string;
  postalCode: string;
  street: string;
  website: string;
  isPublic: boolean;
  specializationId: number;
  specializationName: string;
};

export async function createSchool(
  name: string,
  areaId: number,
  postalCode: string,
  street: string,
  website: string,
  isPublic: boolean,
  userId: number,
  specializationIds: number[],
) {
  const [school] = await sql<School[]>`
    INSERT INTO schools
      (
      name,
      area_id,
      postal_code,
      street,
      website,
      is_public,
      user_id
      )
    VALUES
      (${name}, ${areaId}, ${postalCode}, ${street}, ${website}, ${isPublic}, ${userId})
    RETURNING *
  `;

  // Insert specializations
  for (const specializationId of specializationIds) {
    await sql`INSERT INTO schools_specializations
     (school_id, specialization_id)
    VALUES
     (${school!.id}, ${specializationId})`;
  }

  // Joint query to retrieve the matching specializations
  const specializations = await sql<Specialization[]>`
  SELECT
    specializations.id,
    specializations.name
  FROM
    schools,
    specializations,
    schools_specializations
  WHERE
    ${school!.id} = schools_specializations.school_id AND
    specializations.id = schools_specializations.specialization_id AND
    ${school!.id} = schools.id
  `;

  // Returning school including matching specializations
  const schoolWithSpecializations = {
    ...school!,
    specializations: [...specializations],
  };
  return schoolWithSpecializations;
}

export async function getSchoolById(id: number) {
  const [school] = await sql<School[]>`
    SELECT
      *
    FROM
      schools
    WHERE
      id = ${id}
  `;
  return school;
}

export async function getSchoolWithSpecializationsById(schoolId: number) {
  const schoolWithSpecializations = await sql<
    SchoolWithAreaNameAndSpecializations[]
  >`
    SELECT
      schools.id AS school_id,
      schools.name AS school_name,
      schools.area_id AS area_id,
      areas.name as area_name,
      schools.postal_code,
      schools.street,
      schools.website,
      schools.is_public,
      specializations.id AS specialization_id,
      specializations.name AS specialization_name
    FROM
      schools,
      specializations,
      schools_specializations,
      areas
    WHERE
      ${schoolId} = schools_specializations.school_id AND
      specializations.id = schools_specializations.specialization_id AND
      schools.id = ${schoolId} AND
      schools.area_id = areas.id
  `;

  return schoolWithSpecializations;
}

export async function getAllSchools() {
  const schools = await sql<SchoolWithAreaNameAndSpecializations[]>`
    SELECT
     schools.id AS school_id,
     schools.name AS school_name,
     schools.area_id,
     areas.name as area_name,
     schools.postal_code,
     schools.street,
     schools.website,
     schools.is_public,
     specializations.id as specialization_id,
     specializations.name as specialization_name
    FROM
     schools,
     areas,
     specializations,
     schools_specializations
    WHERE
     schools.area_id = areas.id AND
     specializations.id = schools_specializations.specialization_id AND
     schools.id = schools_specializations.school_id
  `;
  return schools;
}

export async function getAllSchoolsWithLimit(limit: number) {
  const schools = await sql<SchoolWithAreaNameAndSpecializations[]>`
    SELECT
     schools.id AS school_id,
     schools.name AS school_name,
     schools.area_id,
     areas.name as area_name,
     schools.postal_code,
     schools.street,
     schools.website,
     schools.is_public,
     specializations.id as specialization_id,
     specializations.name as specialization_name
    FROM
     schools,
     areas,
     specializations,
     schools_specializations
    WHERE
     schools.area_id = areas.id AND
     specializations.id = schools_specializations.specialization_id AND
     schools.id = schools_specializations.school_id
    LIMIT ${limit}
  `;
  return schools;
}

// Get school by user ID
export async function getSchoolByUserId(userId: number, token: string) {
  if (!token) return undefined;
  const school = await sql<SchoolWithAreaNameAndSpecializations[]>`
    SELECT
     schools.id AS school_id,
     schools.name AS school_name,
     schools.area_id,
     areas.name as area_name,
     schools.postal_code,
     schools.street,
     schools.website,
     schools.is_public,
     specializations.id as specialization_id,
     specializations.name as specialization_name
    FROM
     users,
     schools,
     areas,
     specializations,
     schools_specializations
    WHERE
     users.id = ${userId} AND
     schools.user_id = ${userId} AND
     schools.area_id = areas.id AND
     specializations.id = schools_specializations.specialization_id AND
     schools.id = schools_specializations.school_id
  `;
  return school;
}

export async function updateSchool(
  name: string,
  areaId: number,
  postalCode: string,
  street: string,
  website: string,
  isPublic: boolean,
  userId: number,
  specializationIds: number[],
) {
  const [school] = await sql<School[]>`
    UPDATE
      schools
    SET
      name = ${name},
      area_id = ${areaId},
      postal_code = ${postalCode},
      street = ${street},
      website = ${website},
      is_public = ${isPublic},
      user_id = ${userId}
    WHERE
      schools.user_id = ${userId}
    RETURNING *
  `;

  // Delete original specializations
  await sql<{ schoolId: number; specializationId: number }[]>`
    DELETE FROM
      schools_specializations
    WHERE
      schools_specializations.school_id = ${school!.id}
    RETURNING *
  `;

  // Insert new specializations
  for (const specializationId of specializationIds) {
    await sql`INSERT INTO schools_specializations
     (school_id, specialization_id)
    VALUES
     (${school!.id}, ${specializationId})`;
  }

  // Joint query to retrieve the matching specializations
  const specializations = await sql<Specialization[]>`
  SELECT
    specializations.id,
    specializations.name
  FROM
    schools,
    specializations,
    schools_specializations
  WHERE
    ${school!.id} = schools_specializations.school_id AND
    specializations.id = schools_specializations.specialization_id AND
    ${school!.id} = schools.id
  `;

  // Returning school including matching specializations
  const schoolWithSpecializations = {
    ...school!,
    specializations: [...specializations],
  };
  return schoolWithSpecializations;
}

export async function deleteSchoolByUserId(userId: number, token: string) {
  if (!token) return undefined;
  const [school] = await sql<School[]>`
    DELETE FROM
      schools
    WHERE
      schools.user_id = ${userId}
    RETURNING *
  `;
  return school;
}
