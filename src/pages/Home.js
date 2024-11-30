import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  const [homeData, setHomeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const response = await axios.get(
          "https://my-first-drupal-app.lndo.site/jsonapi/node/page"
        );

        const homeItem = response.data.data[1];
        setHomeData(homeItem);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  if (loading) {
    return <div className="text-center py-5">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-danger py-5">Error: {error.message}</div>
    );
  }

  return (
    <section
      className="vh-100 position-relative d-flex justify-content-center align-items-center"
      style={{
        backgroundImage: `url(${homeData.attributes.field_img_url[0]?.uri})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        color: "white",
      }}
    >
      <div
        className="text-center p-4"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          borderRadius: "10px",
        }}
      >
        <h1 className="display-3 fw-bold">
          {homeData.attributes.field_heading[0]}
        </h1>
        <p className="lead">{homeData.attributes.field_intro[0]}</p>
        <p
          className="mt-3"
          style={{
            color: "orange",
            fontStyle: "italic",
            fontSize: "1.5rem",
            fontWeight: "bold",
          }}
        >
          {homeData.attributes.field_name}
        </p>
      </div>
    </section>
  );
};

export default Home;
