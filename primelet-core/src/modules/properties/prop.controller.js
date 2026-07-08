import propService from "./prop.service.js";

// get all properties
const getAllProperties = async (req, res, next) => {
  try {
    // add filters
    const { minPrice, maxPrice, beds, bath, parking, county } = req.query;

    const properties = await propService.getAllProperties({
      minPrice,
      maxPrice,
      beds,
      bath,
      parking,
      county,
    });
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
