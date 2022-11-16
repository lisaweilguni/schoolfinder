import { getSchoolWithAreaNameAndSpecializations } from '../dataStructure';

test('reduces school specializations for one single school', () => {
  const schools = [
    {
      schoolId: 2,
      schoolName: 'HTL Spengergasse',
      areaId: 1,
      areaName: 'Vienna',
      postalCode: '1050',
      street: 'Spengergasse 20',
      website: 'www.spengergasse.at',
      isPublic: true,
      specializationId: 1,
      specializationName: 'Tech',
    },
    {
      schoolId: 2,
      schoolName: 'HTL Spengergasse',
      areaId: 1,
      areaName: 'Vienna',
      postalCode: '1050',
      street: 'Spengergasse 20',
      website: 'www.spengergasse.at',
      isPublic: true,
      specializationId: 3,
      specializationName: 'Design',
    },
  ];

  expect(getSchoolWithAreaNameAndSpecializations(schools)).toStrictEqual({
    schoolId: 2,
    schoolName: 'HTL Spengergasse',
    areaId: 1,
    areaName: 'Vienna',
    postalCode: '1050',
    street: 'Spengergasse 20',
    website: 'www.spengergasse.at',
    isPublic: true,
    specializations: [
      {
        specializationId: 1,
        specializationName: 'Tech',
      },
      {
        specializationId: 3,
        specializationName: 'Design',
      },
    ],
  });
});
