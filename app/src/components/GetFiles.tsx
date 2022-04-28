import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Box,
  Typography,
  Input,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import { useDeleteFile, useEditFile, useGetFiles } from "../network/";
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
  const [editFileMutation] = useEditFile();

  const handleDelete = useCallback(() => {
    mutate({
      variables: {
        id: file.id,
      },
    });
  }, [mutate]);

  const [showEdit, setShowEdit] = useState(false);
  const [filename, setFilename] = useState(file.orginalFilename);

  const handleEdit = useCallback(() => {
    if (showEdit) {
      editFileMutation({
        variables: {
          input: { id: file.id, orginalFilename: filename },
        },
      });
    }

    setShowEdit(!showEdit);
  }, [showEdit, filename, setShowEdit, editFileMutation, file.id]);

  return (
    <Card sx={{ maxWidth: 345, minWidth: 345, p: 4, m: 4 }}>
      <CardMedia component="img" height="140" image={data} alt="green iguana" />
      <CardContent>
        {!showEdit && (
          <Typography gutterBottom variant="h5" component="div">
            {file.orginalFilename}
          </Typography>
        )}
        {showEdit && (
          <Input value={filename} onChange={({ target: { value } }) => setFilename(value)}></Input>
        )}
      </CardContent>
      <CardActions>
        <Button variant="contained" color="success" onClick={handleEdit}>
          {showEdit ? "Save" : "Edit"}
        </Button>
        <Button variant="outlined" color="error" onClick={handleDelete}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};
