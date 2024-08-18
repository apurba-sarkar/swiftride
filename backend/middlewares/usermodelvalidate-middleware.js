const usermodelValidateMiddleware = (schema) => async (req, res, next) => {
  try {
    const parseBody = await schema.parseAsync(req.body);
    req.body = parseBody;
    next();
  } catch (err) {
    const extraDetatils = err.errors[0]?.message || "Validation error";
    const message = "fill properly";
    const status = 422;
    res.status(400).json({ msg: err.issues });

    const errobj = {
      status,
      message,
      extraDetatils,
    };
    next(errobj);
  }
};

module.exports = usermodelValidateMiddleware;
