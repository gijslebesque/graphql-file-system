import React from "react";
import { useGetFiles } from "../network/";

export const GetFiles: React.FC = () => {
  const { loading, error, data } = useGetFiles();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{JSON.stringify(error, null, 2)}</div>;

  return <React.Fragment>{JSON.stringify(data, null, 2)}</React.Fragment>;
};
