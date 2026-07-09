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

const getSuggestions = () => propRepository.fetchRandom();

export default { getAllProperties, getPropertyBySlug, getSuggestions };
