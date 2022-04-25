import React from "react";
import { useUploadFile } from "../network";

export const UploadFile: React.FC = () => {
  const [mutate, { loading, error }] = useUploadFile();
  const onChange = ({
    target: {
      validity,
      files: [file],
    },
  }: any) => validity.valid && mutate({ variables: { file } });

  //   if (loading) return <div>Loading...</div>;
  if (error) return <div>{JSON.stringify(error, null, 2)}</div>;

  return (
    <>
      <input type="file" required onChange={onChange} />
    </>
  );
};
