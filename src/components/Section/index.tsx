import { useState } from "react";

import { Box, Button, Paper, TextField, Typography } from "@mui/material";

interface SectionTaskProps {
  id: number;
  title: string;
  date: number;

  handleDeleteTask: (id: number) => void;
  handleEditTask: (id: number, newTitle: string) => void;

  onClick: () => void;

  children?: React.ReactNode;
}

export function SectionTask(props: SectionTaskProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(props.title);

  const editMode = () => {
    setIsEditing(true);
  };

  const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(e.target.value);
  };

  const saveEdit = () => {
    if (editedTitle.trim() !== "") {
      props.handleEditTask(props.id, editedTitle);
    }
    setIsEditing(false);
  };

  return (
    <Box display="flex" flexWrap="wrap" gap={1}>
      <Paper elevation={3}>
        {isEditing ? (
          <>
            <TextField type="text" value={editedTitle} onChange={changeTitle} />
            <Button variant="contained" onClick={saveEdit}>
              Salvar
            </Button>
          </>
        ) : (
          <>
            <Box
              display="flex"
              padding="20px"
              alignItems="center"
              flexDirection="column"
              justifyContent="center"
              height="150px"
              onClick={props.onClick}
            >
              <Typography>{props.children}</Typography>

              <Typography>{new Date(props.date).toLocaleString()}</Typography>
            </Box>
            <Box
              display="flex"
              height="50px"
              padding="5px"
              justifyContent="center"
              gap={1}
            >
              <Button variant="contained" onClick={editMode}>
                Editar
              </Button>
              <Button
                variant="contained"
                onClick={() => props.handleDeleteTask(props.id)}
              >
                Apagar
              </Button>
            </Box>
          </>
        )}
      </Paper>
    </Box>
  );
}
