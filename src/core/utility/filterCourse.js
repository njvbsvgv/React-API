const paginationsCalc = require("./paginationCalculator");

const filterCourse = (courseList, querys) => {
  const { pageNumber, rowsOfPage, query, costDown, costUp, category } = querys;
  let filterFlag = false;
  if (pageNumber || rowsOfPage || query || costDown || costUp || category) {
    filterFlag = true;
  }

  // filter by query and category
  const filter1 = courseList.filter(
    (el) =>
      (el.courseName.indexOf(query) != -1 && filterFlag) ||
      el.category.includes(category) != false
  );

  const filteredData = filter1.filter((item) => {
    return (
      filterFlag ||
      (item.price >= costDown && filterFlag) ||
      item.price <= costUp
    );
  });

  if (pageNumber && pageNumber !== "" && rowsOfPage && rowsOfPage !== "") {
    const data = paginationsCalc.paginationCalculator(
      filteredData,
      pageNumber,
      rowsOfPage
    );
    return data;
  } else {
    return filteredData;
  }
};

exports.filterCourse = filterCourse;
