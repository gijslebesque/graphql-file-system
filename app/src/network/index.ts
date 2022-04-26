import { gql, useMutation, useQuery } from "@apollo/client";

const GET_FILES = gql`
  query {
    files {
      filename
      file
    }
  }
`;

const SINGLE_UPLOAD = gql`
  mutation ($file: Upload!) {
    singleUpload(file: $file) {
      filename
      mimetype
      encoding
    }
  }
`;

interface File {
  filename: string;
  file: string;
}

interface FileQuery {
  files: File[];
}

export const useUploadFile = () =>
  useMutation(
    SINGLE_UPLOAD

    // { refetchQueries: [GET_FILES] }
  );

export const useGetFiles = () => useQuery<FileQuery>(GET_FILES);
