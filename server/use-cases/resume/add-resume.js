module.exports = function makeAddResume({ db }) {
  return async function addResume({ data }) {
    // Add resume
    const emptyResume = {
      profile: {
        firstName: "",
        secondName: "",
        lastName: "",
        subTitle: "",
        bday: "",
        address1: "",
        address2: "",
        address3: "",
        country: "",
        city: "",
        zipcode: "",
        number: "",
        number2: "",
        email: "",
        website: "",
        image: "",
      },
      networks: [],
      objectives: "",
      workExp: [],
      educations: [],
      projects: [],
      awards: [],
      certifications: [],
      skills: [],
      hobbies: [],
      languages: [],
      references: [],
    };

    const resume = await db.addResume({ data: emptyResume });

    if (!resume) {
      throw new Error("Something went wrong... Please try again...");
    }

    // Add resume to user
    data.resumeId = resume._id;
    data.date = new Date();

    await db.addResumeToStudent({ data });

    return resume;
  };
};
