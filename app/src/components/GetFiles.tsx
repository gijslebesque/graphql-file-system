import { Button, Box, Typography, Input } from "@mui/material";
import React from "react";
import { useGetFiles } from "../network/";
import { MediaCard } from "./MediaCard";

export const GetFiles: React.FC = () => {
  const { loading, error, data, fetchMore } = useGetFiles({ limit: 10, offset: 0 });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{JSON.stringify(error, null, 2)}</div>;
  if (!data) return null;

  const elems = data.files.map((file) => {
    return <MediaCard key={file.id} file={file} />;
  });

  return (
    <>
      <Typography variant="h2">Your Files</Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>{elems}</Box>

      <Button
        variant="contained"
        color="success"
        onClick={() =>
          fetchMore({
            variables: {
              offset: data.files.length,
            },
          })
        }
      >
        Show more
      </Button>
    </>
  );
};
