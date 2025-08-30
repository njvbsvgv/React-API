const paginationCalculator = (data, pageNumber, rowsOfPage) => {
  const startIndex = pageNumber * rowsOfPage;
  const endIndex = startIndex + Number(rowsOfPage);
  const currentData = data.slice(startIndex, endIndex);
  return currentData;
};

exports.paginationCalculator = paginationCalculator