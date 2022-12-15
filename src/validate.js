import { Validator } from "jsonschema";
import validator from "validator";

const defaultOptions = {
  required: true,
};

const jsValidator = new Validator();
jsValidator.customFormats.mongoObjectId = (input) => {
  return typeof input === "string" && validator.isMongoId(input);
};

export const requireSchema = (schema, options = {}) => {
  const validatorOptions = { ...defaultOptions, ...options };

  const validatorFunc = (request, response, next) => {
    const { body } = request;
    if (!body) {
      response.status(400).json({ error: "missing request body" });
      return;
    }

    const v = jsValidator.validate(body, schema, validatorOptions);
    if (!v.valid) {
      response.status(400).json({
        error: "request body validation failed",
        details: v.errors.map((err) => `${err.property}: ${err.message}`),
      });
      return;
    }

    request.validatedBody = v.instance;
    next();
  };

  return validatorFunc;
};

export const requireValidId = (request, response, next) => {
  if (!validator.isMongoId(request.params.id)) {
    response.status(400).json({ error: "URL does not contain a valid object ID" });
    return;
  }
  next();
};
