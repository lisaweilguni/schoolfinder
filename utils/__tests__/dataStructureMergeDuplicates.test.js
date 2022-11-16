import { mergeDuplicateSchools } from '../dataStructure';

test('reduces school specializations for multiple schools', () => {
  const schools = [
    {
      schoolId: 30,
      schoolName: 'Herbststraße',
      areaId: 1,
      areaName: 'Vienna',
      postalCode: '1160',
      street: 'Herbststraße 104',
      website: 'www.herbststraße.at',
      isPublic: true,
      specializations: [
        {
          specializationId: 3,
          specializationName: 'Design',
        },
      ],
    },
    {
      schoolId: 30,
      schoolName: 'Herbststraße',
      areaId: 1,
      areaName: 'Vienna',
      postalCode: '1160',
      street: 'Herbststraße 104',
      website: 'www.herbststraße.at',
      isPublic: true,
      specializations: [
        {
          specializationId: 8,
          specializationName: 'Art',
        },
      ],
    },
    {
      schoolId: 30,
      schoolName: 'Herbststraße',
      areaId: 1,
      areaName: 'Vienna',
      postalCode: '1160',
      street: 'Herbststraße 104',
      website: 'www.herbststraße.at',
      isPublic: true,
      specializations: [
        {
          specializationId: 11,
          specializationName: 'Fashion',
        },
      ],
    },
    {
      schoolId: 31,
      schoolName: 'HTL Mödling',
      areaId: 3,
      areaName: 'Lower Austria',
      postalCode: '2340',
      street: 'Schulstraße 15',
      website: 'www.htlmödling.at',
      isPublic: true,
      specializations: [
        {
          specializationId: 1,
          specializationName: 'Tech',
        },
      ],
    },
    {
      schoolId: 31,
      schoolName: 'HTL Mödling',
      areaId: 3,
      areaName: 'Lower Austria',
      postalCode: '2340',
      street: 'Schulstraße 15',
      website: 'www.htlmödling.at',
      isPublic: true,
      specializations: [
        {
          specializationId: 2,
          specializationName: 'Business',
        },
      ],
    },
  ];

  expect(mergeDuplicateSchools(schools)).toStrictEqual([
    {
      schoolId: 30,
      schoolName: 'Herbststraße',
      areaId: 1,
      areaName: 'Vienna',
      postalCode: '1160',
      street: 'Herbststraße 104',
      website: 'www.herbststraße.at',
      isPublic: true,
      specializations: [
        {
          specializationId: 3,
          specializationName: 'Design',
        },
        {
          specializationId: 8,
          specializationName: 'Art',
        },
        {
          specializationId: 11,
          specializationName: 'Fashion',
        },
      ],
    },
    {
      schoolId: 31,
      schoolName: 'HTL Mödling',
      areaId: 3,
      areaName: 'Lower Austria',
      postalCode: '2340',
      street: 'Schulstraße 15',
      website: 'www.htlmödling.at',
      isPublic: true,
      specializations: [
        {
          specializationId: 1,
          specializationName: 'Tech',
        },
        {
          specializationId: 2,
          specializationName: 'Business',
        },
      ],
    },
  ]);
});
