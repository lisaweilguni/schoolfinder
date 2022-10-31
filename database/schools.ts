import { sql } from './connect';

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

export async function createSchool(
  name: string,
  areaId: number,
  postalCode: string,
  street: string,
  website: string,
  isPublic: boolean,
  userId: number,
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
  return school!;
}
