export const ALBUM = {
  KEY: {
    USER_ID: "userId",
    TITLE: "title",
    ALBUM_PLURAL: "albums",
    ALBUM_BY_ID: "albums-by-id",
    ALBUM_BY_USER_ID: "albums-by-userId",
    AVATAR: "avatar",
    PHOTO_PLURAL: "photos"
  },
  ROUTES: {
    API: {
      BASE: "/album",
      BASE_PLURAL: "/albums",
      PHOTO_PLURAL: "/photos",
      BY_ALBUM_ID: (albumId: number, hasQueries: boolean) =>
        `${hasQueries ? "?" : ""}albumId=${albumId}`,
      BY_USER_ID: (userId: number, hasQueries: boolean) =>
        `${hasQueries ? "?" : ""}userId=${userId}`
    }
  }
}
