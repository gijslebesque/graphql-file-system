import React, { useCallback, useState } from "react";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Input,
} from "@mui/material";

import { useDeleteFile, useEditFile } from "../network";
import { toBase64 } from "../utils";

export const MediaCard: React.FC<{ file: IFile }> = ({ file }) => {
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
    <Card sx={{ maxWidth: 345, minWidth: 345, p: 4, mr: 4, mb: 4 }}>
      <CardMedia component="img" height="140" image={data} alt="green iguana" />
      <CardContent>
        {!showEdit && (
          <Typography gutterBottom variant="h5" component="div">
            {filename}
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
