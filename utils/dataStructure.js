export function getSchoolWithAreaNameAndSpecializations(
  schoolWithSpecializations,
) {
  const school = {
    schoolId: schoolWithSpecializations[0].schoolId,
    schoolName: schoolWithSpecializations[0].schoolName,
    areaId: schoolWithSpecializations[0].areaId,
    areaName: schoolWithSpecializations[0].areaName,
    postalCode: schoolWithSpecializations[0].postalCode,
    street: schoolWithSpecializations[0].street,
    website: schoolWithSpecializations[0].website,
    isPublic: schoolWithSpecializations[0].isPublic,
    specializations: schoolWithSpecializations.map(
      (schoolWithSpecialization) => {
        return {
          specializationId: schoolWithSpecialization.specializationId,
          specializationName: schoolWithSpecialization.specializationName,
        };
      },
    ),
  };
  return school;
}

export function transformMultipleSchools(schools) {
  const schoolsTransformed = schools.map((school) => {
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
  return schoolsTransformed;
}

export function mergeDuplicateSchools(schools) {
  const schoolsMerged = [
    ...schools
      .reduce((r, school) => {
        const record = r.get(school.schoolId) || {};
        r.set(school.schoolId, {
          schoolId: school.schoolId,
          schoolName: school.schoolName,
          areaId: school.areaId,
          areaName: school.areaName,
          postalCode: school.postalCode,
          street: school.street,
          website: school.website,
          isPublic: school.isPublic,
          specializations: [
            ...(record.specializations || []),
            ...school.specializations.filter(
              (object) => Object.keys(object).length !== 0,
            ),
          ],
        });
        return r;
      }, new Map())
      .values(),
  ];
  return schoolsMerged;
}

export function transformDataForSelect(specializationsFromDatabase) {
  const specializations = specializationsFromDatabase.map((specialization) => {
    return {
      value: specialization.id,
      label: specialization.name,
    };
  });
  return specializations;
}
