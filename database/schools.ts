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

export type FullSchool = {
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
  specializationIds.forEach(async (specializationId) => {
    await sql`
    INSERT INTO schools_specializations
     (school_id, specialization_id)
    VALUES
     (${school!.id}, ${specializationId})
  `;
  });

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
  const fullSchool = { ...school!, specializations: [...specializations] };
  console.log(fullSchool);
  return fullSchool;
}
