// export const firstPage = setPage => () => setPage(0);

// export const previousPage = (page, setPage) => () =>
//   setPage(old => Math.max(old - 1, 0));

// export const nextPage = (page, pageCount, setPage) => () =>
//   setPage(old => Math.min(old + 1, pageCount - 1));

// export const lastPage = (pageCount, setPage) => () =>
//   setPage(pageCount - 1);

export const firstPage = (table) => {
  if (table.getCanPreviousPage()) {
    table.setPageIndex(0);
  }
};
export const previousPage = (table) => {
  if (table.getCanPreviousPage()) {
    table.previousPage();
  }
};
export const nextPage = (table) => {
  if (table.getCanNextPage()) {
    table.nextPage();
  }
};
export const lastPage = (table) => {
  if (table.getCanNextPage()) {
    table.setPageIndex(table.getPageCount() - 1);
  }
};