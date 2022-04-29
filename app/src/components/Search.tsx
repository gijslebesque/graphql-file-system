import { Input, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useSearchFiles } from "../network/";
import { MediaCard } from "./MediaCard";

export const Search: React.FC = () => {
  const [query, setQuery] = useState("");
  const [getSearch, { data }] = useSearchFiles();

  useEffect(() => {
    getSearch({
      variables: { input: query },
    });
  }, [query, getSearch]);

  return (
    <Box>
      <Input
        sx={{
          mb: 4,
        }}
        value={query}
        onChange={({ target: { value } }) => setQuery(value)}
        placeholder="Search"
      />

      {query && (
        <>
          <Typography gutterBottom variant="h5">
            Results: {data?.search.length}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {data?.search?.map((file) => (
              <MediaCard file={file} key={file.id} />
            ))}
          </Box>
        </>
      )}
    </Box>
  );
};
