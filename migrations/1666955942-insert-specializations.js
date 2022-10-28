const specializations = [
  { id: 1, name: 'Tech' },
  { id: 2, name: 'Business' },
  { id: 3, name: 'Design' },
  { id: 4, name: 'Media' },
  { id: 5, name: 'Tourism' },
  { id: 6, name: 'Social' },
  { id: 7, name: 'Health' },
  { id: 8, name: 'Pedagogy' },
  { id: 9, name: 'Fashion' },
  { id: 10, name: 'Sports' },
];

exports.up = async function up(sql) {
  await sql`
    INSERT INTO specializations ${sql(specializations, 'id', 'name')}
  `;
};

exports.down = async function down(sql) {
  for (const specialization of specializations) {
    await sql`
      DELETE FROM
        specializations
      WHERE
        name = ${specialization.name}
    `;
  }
};
