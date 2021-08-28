import React, { useState, useEffect } from "react";
import {
  EuiStepsHorizontal,
  EuiPage,
  EuiPageContent,
  EuiPageHeader,
  EuiPageBody,
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
} from "@elastic/eui";
import Profile from "./steps/Profile";
import Objectives from "./steps/Objectives";
import SocialNetworks from "./steps/SocialNetworks";
import WorkExp from "./steps/WorkExp";
import Education from "./steps/Education";
import Projects from "./steps/Projects";
import Awards from "./steps/Awards";
import Certifications from "./steps/Certifications";
import Skills from "./steps/Skills";
import Hobbies from "./steps/Hobbies";
import Languages from "./steps/Languages";
import References from "./steps/References";
import { useHistory } from "react-router-dom";
export default function NewResume(props) {
  const history = useHistory();
  const [horizontalSteps, sethorizontalSteps] = useState([
    {
      title: "Profile",
      isComplete: false,
      isSelected: true,
      onClick: () => {},
    },
    {
      title: "Social Network",
      isComplete: false,
      isSelected: false,
      onClick: () => {},
    },
    {
      title: "Objective",
      isComplete: false,
      isSelected: false,
      onClick: () => {},
    },
    {
      title: "Work Experience",
      isComplete: false,
      isSelected: false,
      onClick: () => {},
    },
    {
      title: "Education",
      isComplete: false,
      isSelected: false,
      onClick: () => {},
    },
    {
      title: "Projects",
      isComplete: false,
      isSelected: false,
      onClick: () => {},
    },
    {
      title: "Awards",
      isComplete: false,
      isSelected: false,
      onClick: () => {},
    },
    {
      title: "Certifications",
      isComplete: false,
      isSelected: false,
      onClick: () => {},
    },
    {
      title: "Skills",
      isComplete: false,
      isSelected: false,
      onClick: () => {},
    },
    {
      title: "Hobbies",
      isComplete: false,
      isSelected: false,
      onClick: () => {},
    },
    {
      title: "Languages",
      isComplete: false,
      isSelected: false,
      onClick: () => {},
    },
    {
      title: "References",
      isComplete: false,
      isSelected: false,
      onClick: () => {},
    },
  ]);
  const [profile, setProfile] = useState({
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
  });
  const [networks, setNetworks] = useState([]);
  const [objectives, setObjectives] = useState("");
  const [workExp, setWorkExp] = useState([]);
  const [educations, setEducations] = useState([]);
  const [projects, setProjects] = useState([]);
  const [awards, setAwards] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [skills, setSkills] = useState([]);
  const [hobbies, setHobbies] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [references, setReferences] = useState([]);
  const [errors, setErrors] = useState({
    profile: {
      firstName: [],
      lastName: [],
      subTitle: [],
      bday: [],
      address1: [],
      country: [],
      city: [],
      zipcode: [],
      number: [],
      email: [],
    },
  });
  const [showErrors, setShowErrors] = useState({
    profile: {
      firstName: false,
      lastName: false,
      subTitle: false,
      bday: false,
      address1: false,
      country: false,
      city: false,
      zipcode: false,
      number: false,
      email: false,
    },
  });
  const [current, setCurrent] = useState(0);
  const handleNext = () => {
    if (!validate(current)) {
      const steps = [...horizontalSteps];
      steps[current].isSelected = false;
      steps[current].isComplete = true;
      if (steps.length > current + 1) {
        steps[current + 1].isSelected = true;
        setCurrent(current + 1);
      }
      sethorizontalSteps(steps);
    }
  };
  const handlePrevious = () => {
    const steps = [...horizontalSteps];
    steps[current].isSelected = false;
    steps[current].isComplete = false;
    if (current !== 0) {
      steps[current - 1].isSelected = true;
      steps[current - 1].isComplete = false;
      setCurrent(current - 1);
    }
    sethorizontalSteps(steps);
  };

  const validate = (index) => {
    switch (index) {
      case 0:
        return validateProfile();
      default:
    }
  };

  const validateProfile = () => {
    let errorsPresent = false;
    const copiedErrors = {
      profile: {
        firstName: [],
        lastName: [],
        subTitle: [],
        bday: [],
        address1: [],
        country: [],
        city: [],
        zipcode: [],
        number: [],
        email: [],
      },
    };
    const copiedShowErrors = {
      profile: {
        firstName: false,
        lastName: false,
        subTitle: false,
        bday: false,
        address1: false,
        country: false,
        city: false,
        zipcode: false,
        number: false,
        email: false,
      },
    };
    if (profile.firstName.length < 3) {
      copiedErrors.profile.firstName.push(
        "First Name Should be 3 or more characters long"
      );
      copiedShowErrors.profile.firstName = true;
      errorsPresent = true;
    }
    if (profile.lastName.length < 3) {
      copiedErrors.profile.lastName.push(
        "Last Name Should be 3 or more characters long"
      );
      copiedShowErrors.profile.lastName = true;
      errorsPresent = true;
    }
    if (profile.subTitle.length < 3) {
      copiedErrors.profile.subTitle.push(
        "Subtitle Should be 3 or more characters long"
      );
      copiedShowErrors.profile.subTitle = true;
      errorsPresent = true;
    }
    if (profile.bday === "") {
      copiedErrors.profile.bday.push("Bday cannot be empty");
      copiedShowErrors.profile.bday = true;
      errorsPresent = true;
    }
    if (profile.address1 < 3) {
      copiedErrors.profile.address1.push(
        "Address Should be 3 or more characters long"
      );
      copiedShowErrors.profile.address1 = true;
      errorsPresent = true;
    }
    if (profile.country < 3) {
      copiedErrors.profile.country.push(
        "Country Name Should be 3 or more characters long"
      );
      copiedShowErrors.profile.country = true;
      errorsPresent = true;
    }
    if (profile.city < 3) {
      copiedErrors.profile.city.push(
        "City Name Should be 3 or more characters long"
      );
      copiedShowErrors.profile.city = true;
      errorsPresent = true;
    }
    if (profile.zipcode < 3) {
      copiedErrors.profile.zipcode.push(
        "Zipcode Should be 3 or more characters long"
      );
      copiedShowErrors.profile.zipcode = true;
      errorsPresent = true;
    }
    if (profile.number < 10) {
      copiedErrors.profile.number.push("Number Should be of 10 digits");
      copiedShowErrors.profile.number = true;
      errorsPresent = true;
    }
    if (profile.email < 3) {
      copiedErrors.profile.email.push("Email cannot be empty");
      copiedShowErrors.profile.email = true;
      errorsPresent = true;
    }
    setShowErrors(copiedShowErrors);
    setErrors(copiedErrors);
    return errorsPresent;
  };
  const handleAddData = async () => {
    const data = {
      profile,
      networks,
      objectives,
      workExp,
      educations,
      projects,
      awards,
      certifications,
      skills,
      hobbies,
      languages,
      references,
    };

    let response = await fetch(
      `http://localhost:6700/resume/${props.match.params.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );
    response = await response.json();
    console.log(response);
    if (response.statusCode === 200) {
      // history.push(`/student/resume/${response.data._id}`);
      history.replace(`/student/resume/${response.data._id}`)
    }
  };
  useEffect(() => {
    const getData = async () => {
      let response = await fetch(
        `http://localhost:6700/resume/${props.match.params.id}`
      );
      response = await response.json();
      console.log(response);
      if (response.data) {
        setProfile(response.data.profile);
        setNetworks(response.data.networks);
        setObjectives(response.data.objectives);
        setWorkExp(response.data.workExp);
        setEducations(response.data.educations);
        setProjects(response.data.projects);
        setAwards(response.data.awards);
        setCertifications(response.data.certifications);
        setSkills(response.data.skills);
        setHobbies(response.data.hobbies);
        setLanguages(response.data.languages);
        setReferences(response.data.references);
      }
    };
    getData();
  }, [props.match.params.id]);
  return (
    <div>
      <EuiPage paddingsize="l">
        <EuiPageBody>
          <EuiPageHeader
            restrictWidth
            iconType="logoElastic"
            pageTitle=" Resume Creator"
            paddingSize="l"
          />
          <EuiPageContent
            borderRadius="none"
            hasShadow={false}
            style={{ display: "flex" }}
          >
            <EuiPageContent
              verticalPosition="center"
              horizontalPosition="center"
              paddingSize="l"
              color="subdued"
              hasShadow={true}
            >
              <EuiStepsHorizontal steps={horizontalSteps} />
              <EuiSpacer size="xl" />
              {current === 0 && (
                <Profile
                  profile={profile}
                  setProfile={setProfile}
                  errors={errors}
                  showErrors={showErrors}
                  props={props}
                />
              )}
              {current === 1 && (
                <SocialNetworks networks={networks} setNetworks={setNetworks} />
              )}
              {current === 2 && (
                <Objectives
                  objectives={objectives}
                  setObjectives={setObjectives}
                />
              )}
              {current === 3 && (
                <WorkExp workExp={workExp} setWorkExp={setWorkExp} />
              )}
              {current === 4 && (
                <Education
                  educations={educations}
                  setEducations={setEducations}
                />
              )}
              {current === 5 && (
                <Projects projects={projects} setProjects={setProjects} />
              )}
              {current === 6 && (
                <Awards awards={awards} setAwards={setAwards} />
              )}
              {current === 7 && (
                <Certifications
                  certifications={certifications}
                  setCertifications={setCertifications}
                />
              )}
              {current === 8 && (
                <Skills skills={skills} setSkills={setSkills} />
              )}
              {current === 9 && (
                <Hobbies hobbies={hobbies} setHobbies={setHobbies} />
              )}
              {current === 10 && (
                <Languages languages={languages} setLanguages={setLanguages} />
              )}
              {current === 11 && horizontalSteps[11].isComplete === false && (
                <References
                  references={references}
                  setReferences={setReferences}
                />
              )}
              {current === 11 && horizontalSteps[11].isComplete === true && (
                <EuiButton onClick={handleAddData}>
                  Save Data & Generate Resume
                </EuiButton>
              )}
              <EuiSpacer size="xl" />
              <EuiFlexGroup justifyContent="spaceBetween">
                <EuiFlexItem grow={false}>
                  <EuiButton fill color="danger" onClick={handlePrevious}>
                    Previous
                  </EuiButton>
                </EuiFlexItem>
                <EuiFlexItem grow={false}>
                  <EuiButton fill onClick={handleNext}>
                    Next
                  </EuiButton>
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiPageContent>
          </EuiPageContent>
        </EuiPageBody>
      </EuiPage>
    </div>
  );
}
