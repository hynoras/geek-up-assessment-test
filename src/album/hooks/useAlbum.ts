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
}

const useAlbum = new UseAlbum()
export default useAlbum
