import { TableColumnsType, Table } from "antd"
import { AlbumWithUserDetail } from "album/models/dtos/albumDtos"
import { GENERIC } from "shared/constants/genericValues"

type AlbumListTableProps = {
  albums: Array<AlbumWithUserDetail>
  loading: boolean
  columns: TableColumnsType<any>
}

const AlbumListTable: React.FC<AlbumListTableProps> = ({ albums, loading, columns }) => {
  return (
    <Table<AlbumWithUserDetail>
      columns={columns}
      dataSource={albums}
      pagination={false}
      loading={loading}
      rowKey={GENERIC.KEY.ID}
    />
  )
}

export default AlbumListTable
