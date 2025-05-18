import { useQuery } from "@tanstack/react-query"
import { ALBUM } from "album/constants/albumConstants"
import albumService from "album/services/albumService"
import { QueryProps } from "shared/models/dtos/sharedDtos"

class UseAlbum {
  fetchAlbumList = (): QueryProps => {
    const { data: albums = [], isLoading: loading } = useQuery({
      queryKey: [ALBUM.KEY.ALBUM_PLURAL],
      queryFn: () => albumService.getAlbums(),
      staleTime: Infinity
    })
    return { data: albums, isLoading: loading }
  }
  fetchAlbumById = (id: number): QueryProps => {
    const { data: album, isLoading: loading } = useQuery({
      queryKey: [ALBUM.KEY.ALBUM_BY_ID],
      queryFn: () => albumService.getAlbumById(id),
      staleTime: Infinity
    })
    return { data: album, isLoading: loading }
  }
  fetchAlbumByUserId = (userId: number): QueryProps => {
    const { data: album, isLoading: loading } = useQuery({
      enabled: !!userId,
      queryKey: [ALBUM.KEY.ALBUM_BY_USER_ID, userId],
      queryFn: () => albumService.getAlbumByUserId(userId),
      staleTime: Infinity
    })
    return { data: album, isLoading: loading }
  }
  fetchPhotosById = (albumId: number): QueryProps => {
    const {
      data: photos,
      isLoading: loading,
      isSuccess: success
    } = useQuery({
      queryKey: [ALBUM.KEY.PHOTO_PLURAL],
      queryFn: () => albumService.getPhotoByAlbumId(albumId),
      staleTime: Infinity
    })
    return { data: photos, isLoading: loading, isSuccess: success }
  }
}

const useAlbum = new UseAlbum()
export default useAlbum
