exports.up = async function up(sql) {
  await sql`
   CREATE TABLE schools_specializations(
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      school_id integer REFERENCES schools (id) ON DELETE CASCADE,
      specialization_id integer REFERENCES specializations (id) ON DELETE CASCADE,
    )
  `;
};

exports.down = async function down(sql) {
  await sql`
    DROP TABLE schools_specializations
  `;
};
