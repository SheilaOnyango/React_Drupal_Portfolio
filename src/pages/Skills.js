import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Skills = () => {
  const [skillsData, setSkillsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSkillsData = async () => {
      try {
        const response = await axios.get(
          "https://my-first-drupal-app.lndo.site/jsonapi/node/page"
        );

        const skillsItem = response.data.data[0];
        setSkillsData(skillsItem);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSkillsData();
  }, []);

  if (loading) {
    return <div className="text-center py-5">Loading</div>;
  }

  if (error) {
    return (
      <div className="text-center text-danger py-5">Error: {error.message}</div>
    );
  }

  return (
    <section
      className="skills py-5"
      id="skills"
      style={{ backgroundColor: "#f9f9f9" }}
    >
      <div className="container text-center">
        <div className="main-text mb-4">
          <h2 className="display-4 fw-bold">
            {skillsData.attributes.field_title[0]}
          </h2>
        </div>

        <div className="row">
          {skillsData.attributes.field_heading.map((heading, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div
                className="card shadow-sm"
                style={{
                  transition: "transform 0.3s, box-shadow 0.3s",
                  height: "100%",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 20px rgba(0, 0, 0, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <img
                  src={skillsData.attributes.field_img_url[index]?.uri}
                  alt={heading}
                  className="card-img-top"
                />
                <div className="card-body d-flex flex-column">
                  <h3 className="card-title">{heading}</h3>
                  <p className="card-text flex-grow-1">
                    {skillsData.attributes.field_paragraph[index]}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
