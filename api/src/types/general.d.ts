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
