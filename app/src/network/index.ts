import { gql, useMutation, useQuery } from "@apollo/client";

const GET_FILES = gql`
  query {
    files {
      filename
      orginalFilename
      thumbnail
    }
  }
`;

const SINGLE_UPLOAD = gql`
  mutation ($file: Upload!) {
    singleUpload(file: $file) {
      filename
      orginalFilename
      mimetype
      encoding
    }
  }
`;

export const useUploadFile = () => {
  return useMutation(
    SINGLE_UPLOAD,
    {
      update: (cache, data) => {
        debugger;
      },
    }

    // { refetchQueries: [GET_FILES] }
  );
};

export const useGetFiles = () => useQuery<FileQuery>(GET_FILES);
