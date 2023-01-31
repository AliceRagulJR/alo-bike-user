const jwt = require("jsonwebtoken");
const JwtAuth = (() => {
  return {
    checkUserAndGenerateToken: async (data) => {
      const accessToken = jwt.sign(
        {
          user: data.userName,
          email: data.email,
          licenceNumber: data.licenceNumber,
          phoneNumber: data.phoneNumber,
          securityPin: data.securityPin
        },
        "my_secret_key",
        { expiresIn: "1d" }
      );
      return accessToken;
    },

    verify: async (req, res, next) => {
      try {
        if (
          // todo: need to refactor
          req.path == "/api/users" ||
          req.path == "/api/users/addUser" ||
          req.path == "/api/users/findUser" ||
          req.path == "/api/users/login" ||
          req.path == "/api/tasks/getTask" ||
          req.path == "/api/tasks/addTask" ||
          req.path == "/"
        ) {
          next();
        } else {
          jwt.verify(req.headers.token, "my_secret_key", (err, decoded) => {
            if (decoded && decoded.email) {
              req.user = decoded;
              next();
            } else {
              return res.status(401).json({
                errorMessage: "User unauthorized!",
                status: false,
              });
            }
          });
        }
      } catch (e) {
        res.status(400).json({
          errorMessage: "Something went wrong!",
          status: false,
        });
      }
    },
  };
})();

module.exports = JwtAuth;
