import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";

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

const DELETE_FILE = gql`
  mutation DeleteFile($id: String!) {
    deleteFile(id: $id) {
      id
    }
  }
`;
export const useDeleteFile = () => {
  return useMutation<{ deleteFile: IFile }, { id: string }>(DELETE_FILE, {
    update(cache, { data }) {
      if (!data) return;

      const { deleteFile } = data;
      const normalizedId = cache.identify({ ...deleteFile });
      cache.evict({ id: normalizedId });
      cache.gc();
    },
  });
};

const EDIT_FILE = gql`
  mutation EditFile($input: EditFile!) {
    editFile(input: $input) {
      id
      orginalFilename
    }
  }
`;

export const useEditFile = () => {
  return useMutation<{ editFile: IFile }, { input: EditFile }>(EDIT_FILE);
};

const GET_FILES = gql`
  query GetFiles($offset: Int, $limit: Int) {
    files(offset: $offset, limit: $limit) {
      id
      filename
      orginalFilename
      thumbnail
    }
  }
`;

export const useGetFiles = ({ limit, offset }: IPagination) =>
  useQuery<IFileQuery, { limit: number; offset: number }>(GET_FILES, {
    variables: { limit, offset },
  });

const SEARCH_FILES = gql`
  query SearchFiles($input: String) {
    search(input: $input) {
      id
      filename
      orginalFilename
      thumbnail
    }
  }
`;

export const useSearchFiles = () => useLazyQuery<IFileQuery>(SEARCH_FILES);
