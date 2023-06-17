module.exports = (data) => {
  const serializedData = JSON.stringify(data, (key, value) => {
    if (typeof value === 'bigint') {
      return Number(value); // BigInt to Number
    };
    return value;
  });

  return serializedData;
};