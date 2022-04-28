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
  mutation SingeUpload($file: Upload!) {
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

const DELETE_FILE = gql`
  mutation DeleteFile($id: String!) {
    deleteFile(id: $id) {
      id
    }
  }
`;

export const useUploadFile = () => {
  return useMutation(SINGLE_UPLOAD, {
    update(cache, { data: { singleUpload } }) {
      cache.modify({
        fields: {
          files(existingFiless = []) {
            const newFileRef = cache.writeFragment({
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
            return [...existingFiless, newFileRef];
          },
        },
      });
    },
  });
};

export const useDeleteFile = () => {
  return useMutation(DELETE_FILE, {
    update(cache, { data: { deleteFile } }) {
      const normalizedId = cache.identify({ ...deleteFile });
      cache.evict({ id: normalizedId });
      cache.gc();
    },
  });
};

export const useGetFiles = () => useQuery<IFileQuery>(GET_FILES);
