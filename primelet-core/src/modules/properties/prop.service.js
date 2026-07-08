import propRepository from "./prop.repository.js";

const getAllProperties = ({
  minPrice,
  maxPrice,
  beds,
  bath,
  parking,
  county,
}) =>
  propRepository.fetchAll({ minPrice, maxPrice, beds, bath, parking, county });

const getPropertyBySlug = (slug) => propRepository.fetchBySlug(slug);

export default { getAllProperties, getPropertyBySlug };
