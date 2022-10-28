import { sql } from './connect';

export type Area = {
  id: number;
  name: string;
};

export async function getAreas() {
  const areas = await sql<Area[]>`
    SELECT
      id,
      name
    FROM
      areas
  `;
  return areas;
}
