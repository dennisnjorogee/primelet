import propRepository from "./prop.repository.js";

const getAllProperties = () => propRepository.fetchAll();

const getPropertyBySlug = (slug) => propRepository.fetchBySlug(slug);

export default { getAllProperties, getPropertyBySlug };
