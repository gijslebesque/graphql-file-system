import { Button, Card, CardActions, CardContent, CardMedia, Box, Typography } from "@mui/material";
import React, { useCallback } from "react";
import { useDeleteFile, useGetFiles } from "../network/";
import { toBase64 } from "../utils";

export const GetFiles: React.FC = () => {
  const { loading, error, data } = useGetFiles();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{JSON.stringify(error, null, 2)}</div>;
  if (!data) return null;

  const elems = data.files.map((file) => {
    return <MediaCard file={file} />;
  });

  return <Box sx={{ display: "flex", flexWrap: "wrap" }}>{elems}</Box>;
};

const MediaCard: React.FC<{ file: IFile }> = ({ file }) => {
  const data = `data:image/png;base64,${toBase64(file.thumbnail)}`;

  const [mutate] = useDeleteFile();

  const handleDelete = useCallback(() => {
    mutate({
      variables: {
        id: file.id,
      },
    });
  }, [mutate]);

  return (
    <Card sx={{ maxWidth: 345, p: 4, m: 4 }}>
      <CardMedia component="img" height="140" image={data} alt="green iguana" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {file.orginalFilename}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" color="success">
          Edit
        </Button>
        <Button variant="outlined" color="error" onClick={handleDelete}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};
