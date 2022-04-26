import React from "react";
import { useGetFiles } from "../network/";

function toBase64(file: string) {
  const fileparse = JSON.parse(file);
  return btoa(
    fileparse.data.reduce((data: string, byte: number) => data + String.fromCharCode(byte), "")
  );
}

export const GetFiles: React.FC = () => {
  const { loading, error, data } = useGetFiles();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{JSON.stringify(error, null, 2)}</div>;
  if (!data) return null;

  const elems = data.files.map((e) => {
    const data = toBase64(e.file);

    return <img src={`data:image/png;base64,${data}`} />;
  });

  return (
    <React.Fragment>
      {JSON.stringify(data.files, null, 2)}
      {elems}
    </React.Fragment>
  );
};
