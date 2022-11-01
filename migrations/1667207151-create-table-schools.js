exports.up = async function up(sql) {
  await sql`
    CREATE TABLE schools (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
     	name varchar(100),
      area_id INT REFERENCES areas (id) ON DELETE CASCADE,
			postal_code varchar(4),
			street varchar(300),
      website varchar(300),
			is_public boolean,
			user_id integer REFERENCES users (id) ON DELETE CASCADE
    )
  `;
};

exports.down = async function down(sql) {
  await sql`
    DROP TABLE schools
  `;
};
