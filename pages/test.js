let schoolsFromDatabase = [
  {
    schoolId: 1,
    schoolName: 'HTL Spengergasse',
    areaId: 1,
    areaName: 'Vienna',
    postalCode: '1070',
    street: 'Spengergasse 20',
    website: 'www.website.at',
    isPublic: true,
    specializationId: 1,
    specializationName: 'Tech',
  },
  {
    schoolId: 1,
    schoolName: 'HTL Spengergasse',
    areaId: 1,
    areaName: 'Vienna',
    postalCode: '1070',
    street: 'Spengergasse 20',
    website: 'www.website.at',
    isPublic: true,
    specializationId: 2,
    specializationName: 'Business',
  },
  {
    schoolId: 2,
    schoolName: 'HTL Spengergasse',
    areaId: 1,
    areaName: 'Vienna',
    postalCode: '1070',
    street: 'Spengergasse 20',
    website: 'www.website.at',
    isPublic: true,
    specializationId: 3,
    specializationName: 'Health',
  },
];

const schools = schoolsFromDatabase.map((school) => {
  return {
    schoolId: school.schoolId,
    schoolName: school.schoolName,
    areaId: school.areaId,
    areaName: school.areaName,
    postalCode: school.postalCode,
    street: school.street,
    website: school.website,
    isPublic: school.isPublic,
    specializations: [
      {
        specializationId: school.specializationId,
        specializationName: school.specializationName,
      },
    ],
  };
});

// console.log('schools', JSON.stringify(schools));

const result = [
  ...schools
    .reduce((r, o) => {
      const record = r.get(o.schoolId) || {};
      r.set(o.schoolId, {
        schoolId: o.schoolId,
        schoolName: o.schoolName,
        areaId: o.areaId,
        areaName: o.areaName,
        postalCode: o.postalCode,
        street: o.street,
        website: o.website,
        isPublic: o.isPublic,
        specializations: [
          ...(record.specializations || []),
          ...o.specializations.filter((o) => Object.keys(o).length !== 0),
        ],
      });
      return r;
    }, new Map())
    .values(),
];

console.log(result);
