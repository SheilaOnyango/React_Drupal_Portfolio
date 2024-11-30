import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const AboutMe = () => {
  const [aboutMeData, setAboutMeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAboutMeData = async () => {
      try {
        const response = await axios.get(
          "https://my-first-drupal-app.lndo.site/jsonapi/node/page"
        );
        const aboutMeItem = response.data.data[2];
        setAboutMeData(aboutMeItem);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutMeData();
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
    <div
      className="container-fluid py-5"
      style={{ backgroundColor: "#f9f9f9" }}
    >
      <div className="row align-items-center justify-content-center">
        <div className="col-md-5 text-center">
          <img
            src={aboutMeData.attributes.field_img_url[0].uri}
            alt={aboutMeData.attributes.title}
            className="img-fluid rounded-circle shadow"
            style={{ maxWidth: "80%" }}
          />
        </div>

        <div className="col-md-5">
          <h1 className="display-4 fw-bold mb-4 text-danger">
            {aboutMeData.attributes.field_title[0]}
          </h1>
          <p
            className="text-white bg-dark p-3 rounded"
            style={{ fontSize: "1.2rem", lineHeight: "1.8" }}
          >
            {aboutMeData.attributes.field_intro[0]}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
