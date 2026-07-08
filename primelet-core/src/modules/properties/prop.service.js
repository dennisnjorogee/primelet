import propRepository from "./prop.repository.js";

const getAllProperties = () => propRepository.fetchAll();

const getPropertyBySlug = () => {};

export default { getAllProperties, getPropertyBySlug };
