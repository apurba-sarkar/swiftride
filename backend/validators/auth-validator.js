const { z } = require("zod");
const userRegSchema = z.object({
  fullname: z
    .string({
      required_error: "Name is required",
    })
    .min(5, "full name should be atleast 5 character")
    .trim(),
  age: z.string({
    required_error: "Age is required",
  }),
  pincode: z
    .string({
      required_error: "Pincode is required",
    })
    .min(6, "pincode should be 6 character")
    .max(6, "pincode should be 6 character"),
  mobile: z
    .string({
      required_error: "mobile no is required",
    })
    .min(10, "mobile no should be 10 character")
    .max(10, "mobile no should be 10 character"),
  email: z
    .string({
      required_error: "email must be valid",
    })
    .email("invalid email address"),
  password: z
    .string({
      required_error: "email must be valid",
    })
    .min(8, "password should be minimum 8 words"),

});
module.exports = userRegSchema;
