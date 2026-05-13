const Joi = require("joi");

exports.bookSchema = Joi.object({
  bookId: Joi.string().hex().length(24).required(),
});

exports.createBookSchema = Joi.object({
  name: Joi.string().required(),
  author: Joi.string().required(),
  totalCopies: Joi.number().min(1).optional(),
  copies: Joi.array().items(Joi.string()).min(1).required(),
});

exports.updateBookSchema = Joi.object({
  name: Joi.string().required(),
  bookId: Joi.string().hex().length(24).required(),
  author: Joi.string().optional(),
  totalCopies: Joi.number().min(1).optional(),
  copies: Joi.array().items(Joi.string()).optional(),
});

exports.issueBookSchema = Joi.object({
  bookId: Joi.string().hex().length(24).required(),
  userId: Joi.string().hex().length(24).required(),
  serialNumber: Joi.string().required(),
  dueDate: Joi.date().required(),
});

exports.returnBookSchema = Joi.object({
  bookId: Joi.string().hex().length(24).required(),
  serialNumber: Joi.string().required(),
});
