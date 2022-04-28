interface IFile {
  id: string;
  filename: string;
  orginalFilename: string;
  mimetype: string;
  encoding: string;
  thumbnail: string;
}

interface IFileQuery {
  files: IFile[];
}
