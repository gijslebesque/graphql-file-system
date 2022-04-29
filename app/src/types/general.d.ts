interface IFile {
  id: string;
  filename: string;
  orginalFilename: string;
  mimetype: string;
  encoding: string;
  thumbnail: string;
}

type EditFile = Pick<IFile, "id" | "orginalFilename">;

interface IFileQuery {
  [key: string]: IFile[];
}

interface IPagination {
  limit: number;
  offset: number;
}
