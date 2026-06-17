import utils from "../utils/utils.js";

const auth = () => {
  return (req, res, next) => {
    try {
      const accessToken = req.cookies._accesstoken;

      if (!accessToken) {
        throw utils.appError("Unauthorized", 401);
      }

      const userId = utils.decodeAccessToken(accessToken);

      req.user = { userId };

      next();
    } catch (error) {
      next(error);
    }
  };
};

const refresh = () => {
  return (req, res, next) => {
    try {
      const refreshToken = req.cookies._refreshtoken;

      if (!refreshToken) {
        throw utils.appError("Unauthorized", 400);
      }

      req.refreshToken = refreshToken;

      next();
    } catch (error) {
      next(error);
    }
  };
};

export default { auth, refresh };
