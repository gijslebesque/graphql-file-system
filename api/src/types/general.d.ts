interface File {
  createReadStream: () => void;
  filename: string;
  mimetype: string;
  encoding: string;
}

interface DataRecord {
  filename: string;
  orginalFilename: string;
  mimetype: string;
  encoding: string;
}
