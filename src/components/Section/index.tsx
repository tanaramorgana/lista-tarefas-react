import { useState } from "react";
import { ButtonStyled } from "../Button";

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
    <div>
      {isEditing ? (
        <>
          <input type="text" value={editedTitle} onChange={changeTitle} />
          <ButtonStyled title={"Salvar"} clickFunction={saveEdit} />
        </>
      ) : (
        <>
          <div onClick={props.onClick} style={{ cursor: "pointer" }}>
            {props.children}
          </div>
          <div>{new Date(props.date).toLocaleString()}</div>

          <ButtonStyled title={"Editar"} clickFunction={editMode} />
        </>
      )}

      <ButtonStyled
        title={"Apagar"}
        clickFunction={() => props.handleDeleteTask(props.id)}
      />
    </div>
  );
}
