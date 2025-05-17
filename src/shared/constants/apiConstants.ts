export const API = {
  TYPICODE: "https://jsonplaceholder.typicode.com",
  UI_AVATAR: (hasQueries: boolean) => `https://ui-avatars.com/api/${hasQueries ? "?" : ""}`,
  PARAMS: {
    PAGINATION: {
      DEFAULT_CURRENT_PAGE: 1,
      DEFAULT_PAGE_SIZE: 10
    }
  }
}
