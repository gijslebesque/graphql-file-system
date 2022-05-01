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

  const hasFiles = data.files.length > 0;

  return (
    <>
      <Typography variant="h2" sx={{ mb: 4 }}>
        Your Files
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>{elems}</Box>
      {!hasFiles && (
        <Typography variant="body1" sx={{ mb: 4 }}>
          You haven't uploaded any files yet.
        </Typography>
      )}

      {hasFiles && (
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
      )}
    </>
  );
};
