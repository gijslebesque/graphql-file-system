interface IFile {
  filename: string;
  orginalFilename: string;
  mimetype: string;
  encoding: string;
  thumbnail: string;
}

interface FileQuery {
  files: IFile[];
}
