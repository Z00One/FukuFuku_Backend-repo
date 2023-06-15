module.exports = (location) => {
  const key = location.split("/").slice(3).join("/");
  return key;
};