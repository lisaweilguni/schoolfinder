const areas = [
  { id: 1, name: 'Vienna' },
  { id: 2, name: 'Burgenland' },
  { id: 3, name: 'Lower Austria' },
  { id: 4, name: 'Upper Austria' },
  { id: 5, name: 'Salzburg' },
  { id: 6, name: 'Styria' },
  { id: 7, name: 'Carinthia' },
  { id: 8, name: 'Tyrol' },
  { id: 9, name: 'Vorarlberg' },
];

exports.up = async function up(sql) {
  await sql`
    INSERT INTO areas ${sql(areas, 'id', 'name')}
  `;
};

exports.down = async function down(sql) {
  for (const area of areas) {
    await sql`
      DELETE FROM
        categories
      WHERE
        name = ${area.name}
    `;
  }
};
