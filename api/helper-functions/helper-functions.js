// removes any duplicates
const removeArrDuplicateItems = (arr) => {
  const jsonObj = arr.map(JSON.stringify);
  const uniqueSet = new Set(jsonObj);
  const uniqueArr = Array.from(uniqueSet).map(JSON.parse);
  return uniqueArr;
};

module.exports = {
  removeArrDuplicateItems,
};
