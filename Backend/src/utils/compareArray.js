const compareArray = (array1, array2) => {
  return array2.every(item => array1.includes(item));
};
export default compareArray;