import { gql, useMutation, useQuery } from "@apollo/client";

const GET_FILES = gql`
  query {
    files {
      filename
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

export const useUploadFile = () => useMutation(SINGLE_UPLOAD, { refetchQueries: [GET_FILES] });

export const useGetFiles = () => useQuery(GET_FILES);
