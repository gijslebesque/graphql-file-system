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

interface IDataEdit extends Pick<IDataRecord, "id" | "orginalFilename"> {}
