import propService from "./prop.service.js";

// get all properties
const getAllProperties = async (req, res, next) => {
  try {
    const properties = await propService.getAllProperties();
    res.status(200).json({
      data: { properties },
    });
  } catch (error) {
    next(error);
  }
};

// get property by slug
const getPropertyBySlug = async (req, res, next) => {
  try {
    // destructure slug
    const { slug } = req.params;

    const property = await propService.getPropertyBySlug(slug);

    res.status(200).json({
      data: { property },
    });
  } catch (error) {
    next(error);
  }
};

export default { getAllProperties, getPropertyBySlug };
