import { Button, Card, CardActions, CardContent, CardMedia, Box, Typography } from "@mui/material";
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

  const elems = data.files.map((file) => {
    return <MediaCard file={file} />;
  });

  return <Box sx={{ display: "flex" }}>{elems}</Box>;
};

const MediaCard: React.FC<{ file: IFile }> = ({ file }) => {
  const data = `data:image/png;base64,${toBase64(file.thumbnail)}`;

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
        <Button variant="outlined" color="error">
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};
