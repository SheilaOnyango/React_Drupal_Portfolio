import axios from "axios";

const API_URL = "httP:https://my-first-drupal-app.lndo.site//jsonapi";

export const fetchArticles = async () => {
  const response = await axios.get(`${API_URL}/node/article`);
  return response.data;
};
