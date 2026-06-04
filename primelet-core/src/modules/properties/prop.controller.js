export const propTest = (req, res, next) => {
  try {
    return res.status(200).json({
      status: "success",
    });
  } catch (error) {
    next(error);
  }
};
