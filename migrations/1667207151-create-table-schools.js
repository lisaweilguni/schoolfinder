exports.up = async function up(sql) {
  await sql`
    CREATE TABLE schools (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
     	name varchar(100) NOT NULL,
      area_id INT REFERENCES areas (id) ON DELETE CASCADE NOT NULL,
			postal_code varchar(4) NOT NULL,
			street varchar(300) NOT NULL,
      website varchar(300) NOT NULL,
			is_public boolean NOT NULL,
			user_id integer REFERENCES users (id) ON DELETE CASCADE NOT NULL
    )
  `;
};

exports.down = async function down(sql) {
  await sql`
    DROP TABLE schools
  `;
};
