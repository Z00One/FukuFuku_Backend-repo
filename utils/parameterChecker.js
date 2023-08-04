module.exports = (...args) => {
  const hasUndefined = args.includes(undefined);
  if (hasUndefined) {
    return {
      isNotMatch: hasUndefined,
      message: {
        status: 422,
        message: 'Requested resource does not match the parameter'
      }
    };
  };

  return { isNotMatch: hasUndefined };
};