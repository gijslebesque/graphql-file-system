interface IDataRecord {
  id: string;
  filename: string;
  orginalFilename: string;
  mimetype: string;
  encoding: string;
}

interface IDataOut extends IDataRecord {
  thumbnail: string;
}

type IDataEdit = Pick<IDataRecord, "id" | "orginalFilename">;

interface Pagination {
  limit: number;
  offset: number;
}
