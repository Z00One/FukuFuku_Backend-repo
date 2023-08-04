module.exports = {
  OK: {
    status: 200,
    message: 'OK',
  },
  Created: {
    status: 201,
    message: 'Created',
  },
  NoContent: {
    status: 204,
    message: 'No Content',
  },
  BadRequest: {
    status: 400,
    message: 'Bad Request',
  },
  NotFound: {
    status: 404,
    message: 'Requested resource not found',
  },
  Unauthorized: {
    status: 401,
    message: 'Unauthorized',
  },
  Conflict: {
    status: 409,
    message: 'Requested resource already exists'
  },
  UnprocessableEntity: {
    status: 422,
    message: 'Requested resource does not match the parameter',
  },
  InternalServerError: {
    status: 500,
    message: "Internal Server Error"
  },
};