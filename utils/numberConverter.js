module.exports = (value) => {
  if (typeof value === 'bigint') {
    return Number(value);
  }
  
  if (typeof value === 'number' && Number.isInteger(value)) {
    return BigInt(value);
  }
  
  if (typeof value === 'string' && value.endsWith('n')) {
    const numericString = value.slice(0, -1);
    if (/^-?\d+$/.test(numericString)) {
      return BigInt(numericString);
    }
  }
  
  throw new Error('Invalid input');
}