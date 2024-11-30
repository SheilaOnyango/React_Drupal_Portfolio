import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Projects = () => {
  const [projectsData, setProjectsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjectsData = async () => {
      try {
        const response = await axios.get(
          "https://my-first-drupal-app.lndo.site/jsonapi/node/projects"
        );
        setProjectsData(response.data.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectsData();
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
      className="projects py-5"
      id="projects"
      style={{ backgroundColor: "#111", color: "#fff" }}
    >
      <div className="container text-center">
        <h2 className="display-4 fw-bold mb-4">My Projects</h2>

        <div className="row justify-content-center">
          {projectsData.map((project) => (
            <div key={project.id} className="col-md-4 mb-4">
              <div
                className="card shadow-lg h-100"
                style={{
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 20px rgba(0, 0, 0, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <img
                  src={project.attributes.field_img_url[0]?.uri}
                  alt={project.attributes.title}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <h3 className="card-title">{project.attributes.title}</h3>
                  <p className="card-text text-muted">
                    {project.attributes.field_paragraph[0]}
                  </p>
                  <a
                    href={project.attributes.field_see_more[0]?.uri}
                    className="btn btn-primary mt-auto"
                  >
                    See more
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
