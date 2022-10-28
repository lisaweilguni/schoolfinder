exports.up = async function up(sql) {
  await sql`
    CREATE TABLE areas (
      id integer PRIMARY KEY,
			name varchar(30) NOT NULL
    )
  `;
};

exports.down = async function down(sql) {
  await sql`
    DROP TABLE areas
  `;
};
