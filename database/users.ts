import { sql } from './connect';

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
};

export async function getUserByEmail(email: string) {
  if (!email) return undefined;

  const [user] = await sql<
    { id: number; firstName: string; lastName: string; email: string }[]
  >`
  SELECT
    id,
    first_name,
    last_name,
    email
  FROM
    users
  WHERE
    users.email = ${email}
  `;

  return user;
}

export async function createUser(
  firstName: string,
  lastName: string,
  email: string,
  passwordHash: string,
) {
  const [userWithoutPassword] = await sql<
    { id: number; firstName: string; lastName: string; email: string }[]
  >`
    INSERT INTO users
      (first_name, last_name, email, password_hash)
    VALUES
      (${firstName}, ${lastName}, ${email}, ${passwordHash})
    RETURNING
      id,
      first_name,
      last_name,
      email
  `;
  return userWithoutPassword!;
}

export async function getUserWithPasswordHashByEmail(email: string) {
  if (!email) return undefined;

  const [user] = await sql<User[]>`
  SELECT
    *
  FROM
    users
  WHERE
    users.email = ${email}
  `;

  return user;
}

// Joint query
export async function getUserBySessionToken(token: string) {
  if (!token) return undefined;

  const [user] = await sql<
    { id: number; firstName: string; lastName: string; email: string }[]
  >`
  SELECT
    users.id,
    users.first_name,
    users.last_name,
    users.email
  FROM
    users,
    sessions
  WHERE
    sessions.token = ${token} AND
    sessions.user_id = users.id AND
    sessions.expiry_timestamp > now();
  `;

  return user;
}
