import { gql, useMutation, useQuery } from "@apollo/client";

const GET_FILES = gql`
  query GetFiles {
    files {
      id
      filename
      orginalFilename
      thumbnail
    }
  }
`;

const SINGLE_UPLOAD = gql`
  mutation ($file: Upload!) {
    singleUpload(file: $file) {
      id
      filename
      orginalFilename
      mimetype
      encoding
      thumbnail
    }
  }
`;

export const useUploadFile = () => {
  return useMutation(SINGLE_UPLOAD, {
    update(cache, { data: { singleUpload } }) {
      cache.modify({
        fields: {
          files(existingTodos = []) {
            const newTodoRef = cache.writeFragment({
              data: singleUpload,
              fragment: gql`
                fragment NewFile on File {
                  id
                  filename
                  orginalFilename
                  mimetype
                  encoding
                  thumbnail
                }
              `,
            });
            return [...existingTodos, newTodoRef];
          },
        },
      });
    },
  });
};

export const useGetFiles = () => useQuery<FileQuery>(GET_FILES);
