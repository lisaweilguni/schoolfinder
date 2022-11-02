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
