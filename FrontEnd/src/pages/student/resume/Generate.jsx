import React, { useEffect, useState } from "react";
import "./Designer.scss";
import moment from "moment";
import { EuiMarkdownFormat } from "@elastic/eui";

function Generate(props) {
  const [data, setData] = useState(undefined);

  useEffect(() => {
    const getData = async () => {
      let response = await fetch(
        `http://localhost:6700/resume/${props.match.params.id}`
      );
      response = await response.json();
      setData(response.data);
    };
    getData();
  }, [props.match.params.id]);

  return (
    <div class="book">
      <div class="page">
        <div class="subpage">
          {data && (
            <div className="resume">
              <div className="pane1">
                <div className="photo">
                  <img
                    src={`http://localhost:6700/${data.profile.image}`}
                    alt=""
                  />
                </div>
                <div className="name">
                  <h1>
                    {data.profile.firstName + " " + data.profile.lastName}
                  </h1>
                </div>
                <div className="subTitle">{data.profile.subTitle}</div>
                <div className="heading">Profile</div>
                <div className="profile container">
                  <div>
                    <h3>
                      <strong>Address</strong>
                    </h3>
                    <h6>{data.profile.address1},</h6>
                    <h6>{data.profile.address2},</h6>
                    <h6>
                      {data.profile.city}, {data.profile.state},
                      {data.profile.country} - {data.profile.zipcode}
                    </h6>
                  </div>
                  <div>
                    <h3>
                      <strong>Phone Number</strong>
                    </h3>
                    <a href={`tel:${data.profile.number}`}>
                      <h6>{data.profile.number}</h6>
                    </a>
                    {data.profile.number2 && (
                      <a href={`tel:${data.profile.number2}`}>
                        <h6>{data.profile.number2}</h6>
                      </a>
                    )}
                  </div>
                  <div>
                    <h3>
                      <strong>Website</strong>
                    </h3>
                    <a href={data.profile.website}>
                      <h6>{data.profile.website}</h6>
                    </a>
                  </div>
                  <div>
                    <h3>
                      <strong>Email Address</strong>
                    </h3>
                    <a href={`mailto:${data.profile.email}`}>
                      <h6>{data.profile.email}</h6>
                    </a>
                  </div>
                  <div className="social">
                    {data.networks.map((network) => {
                      return (
                        <div className="networks">
                          <h3>
                            <strong>{network.name}</strong>
                          </h3>
                          <a href={network.url}>{network.username}</a>
                        </div>
                      );
                    })}
                  </div>
                </div>
                {data.awards.length > 0 && (
                  <>
                    <div className="heading">Awards</div>
                    <div className="awards container">
                      {data.awards.map((award) => {
                        return (
                          <div className="award">
                            <div className="space1">
                              <h3>
                                <strong>{award.name}</strong>
                              </h3>
                              <h6>{award.awarder}</h6>
                            </div>
                            <div className="date">
                              <h6>{`${moment(award.awardedDate).format(
                                "MMMM"
                              )} ${moment(award.awardedDate).format(
                                "YYYY"
                              )}`}</h6>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
                {data.certifications.length > 0 && (
                  <>
                    <div className="heading">Certifications</div>
                    <div className="certifications container">
                      {data.certifications.map((certification) => {
                        return (
                          <div className="certificate">
                            <div>
                              <h3>
                                <strong>{certification.name}</strong>
                              </h3>
                              <h6>{certification.issuer}</h6>
                            </div>
                            <div className="date">
                              <h6>{`${moment(certification.awardedDate).format(
                                "MMMM"
                              )} ${moment(certification.awardedDate).format(
                                "YYYY"
                              )}`}</h6>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
                {data.languages.length > 0 && (
                  <>
                    <div className="heading">Languages</div>
                    <div className="languages container">
                      {data.languages.map((language) => {
                        return (
                          <div className="language">
                            <h3>
                              <strong>{language.name}</strong>
                            </h3>
                            <h6>{language.fluency}</h6>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
                {data.hobbies.length > 0 && (
                  <>
                    <div className="heading">Hobbies</div>
                    <div className="hobbies container">
                      {data.hobbies.map((hobby) => {
                        return (
                          <h3>
                            <strong>{hobby.name}</strong>
                          </h3>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
              <div className="pane2">
                {data.objectives.length > 0 && (
                  <>
                    <div className="inverse-heading">Objective</div>
                    <div className="objective container">
                      <p>{data.objectives}</p>
                    </div>
                  </>
                )}
                {data.workExp.length > 0 && (
                  <>
                    <div className="inverse-heading">Work Expierence</div>
                    <div className="workExp container">
                      {data.workExp.map((exp) => {
                        return (
                          <div
                            className="exp"
                            style={{
                              marginTop: "0.2rem",
                              marginBottom: "0.4rem",
                            }}
                          >
                            <div className="exp-info">
                              <div className="exp-name">
                                <h3>
                                  <strong>{exp.name}</strong>
                                </h3>
                                <h6>{exp.position}</h6>
                              </div>
                              <div className="date">{`(${moment(
                                exp.startDate
                              ).format("MMMM")} ${moment(exp.startDate).format(
                                "YYYY"
                              )} - ${moment(exp.endDate).format(
                                "MMMM"
                              )} ${moment(exp.endDate).format("YYYY")})`}</div>
                            </div>
                            <div className="summary">
                              <EuiMarkdownFormat>
                                {exp.summary}
                              </EuiMarkdownFormat>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
                {data.educations.length > 0 && (
                  <>
                    <div className="inverse-heading">Education</div>
                    <div className="educations container">
                      {data.educations.map((education) => {
                        return (
                          <div
                            className="education"
                            style={{
                              marginTop: "0.2rem",
                              marginBottom: "0.4rem",
                            }}
                          >
                            <div className="education-name">
                              <h3>
                                <strong>{education.name}</strong>
                              </h3>
                              <h6>
                                <strong>{education.degreeType}</strong>
                                &nbsp;&nbsp;&nbsp;{education.field}
                              </h6>
                            </div>
                            <div className="education-info">
                              <div className="education-date">
                                <h6>{`(${moment(education.startDate).format(
                                  "MMMM"
                                )} ${moment(education.startDate).format(
                                  "YYYY"
                                )} - ${moment(education.endDate).format(
                                  "MMMM"
                                )} ${moment(education.endDate).format(
                                  "YYYY"
                                )})`}</h6>
                              </div>
                              <div className="cgpa">{education.gpa} CGPA</div>
                            </div>
                            <div className="summary">
                              <EuiMarkdownFormat>
                                {education.summary}
                              </EuiMarkdownFormat>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
                {data.skills.length > 0 && (
                  <>
                    <div className="inverse-heading">Skills</div>
                    <div className="skills container">
                      {data.skills.map((skill) => {
                        return (
                          <div className="skill">
                            <h3>
                              <strong>{skill.name}</strong>
                            </h3>
                            <h6>{skill.level}</h6>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
                {data.projects.length > 0 && (
                  <>
                    <div className="inverse-heading">Projects</div>
                    <div className="projects container">
                      {data.projects.map((project) => {
                        return (
                          <div
                            className="project"
                            style={{
                              marginTop: "0.2rem",
                              marginBottom: "0.4rem",
                            }}
                          >
                            <div className="project-info">
                              <div className="project-name">
                                <h3>
                                  <strong>{project.name}</strong>
                                </h3>
                                {project.url && (
                                  <h6>
                                    <a href={project.url}>{project.url}</a>
                                  </h6>
                                )}
                              </div>

                              <div className="date">{`(${moment(
                                project.startDate
                              ).format("MMMM")} ${moment(
                                project.startDate
                              ).format("YYYY")} - ${moment(
                                project.endDate
                              ).format("MMMM")} ${moment(
                                project.endDate
                              ).format("YYYY")})`}</div>
                            </div>
                            <div className="summary">
                              <EuiMarkdownFormat>
                                {project.summary}
                              </EuiMarkdownFormat>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
                {data.references.length > 0 && (
                  <>
                    <div className="inverse-heading">References</div>
                    <div className="references container">
                      {data.references.map((reference) => {
                        return (
                          <div className="reference">
                            <h3>
                              <strong>{reference.name}</strong>
                            </h3>
                            <h6>{reference.position}</h6>
                            <h6>{reference.number}</h6>
                            <h6>{reference.email}</h6>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Generate;
