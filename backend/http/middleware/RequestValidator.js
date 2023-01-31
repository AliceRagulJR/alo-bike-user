const Joi = require("joi");
const RequestValidator = (schema, property) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, {abortEarly:false});
    const valid = error == null;

    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(",");
      res.status(422).json({ error: error });
    }
  };
};
module.exports = RequestValidator;
