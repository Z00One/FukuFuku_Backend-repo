module.exports = () => {
  const offset = 1000 * 60 * 60 * 9;
  const koreaTime = new Date((new Date()).getTime() + offset);

  return koreaTime;
};