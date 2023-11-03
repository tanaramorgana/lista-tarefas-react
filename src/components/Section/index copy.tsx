// import { ButtonStyled } from "../Button";
// import { useState } from "react";

// interface SectionTaskProps {
//   id: number;
//   title: string;
//   date: number;

//   onClick: () => void;
//   onDoubleClick: () => void;
//   children?: React.ReactNode;
//   handleDeleteTask: (id: number) => void;
//   handleEditTask: (id: number, newTitle: string) => void;
// }

// export function SectionTask(props: SectionTaskProps) {
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedTitle, setEditedTitle] = useState(props.title);

//   const handleDoubleClick = () => {
//     setIsEditing(true);
//   };

//   const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setEditedTitle(e.target.value);
//   };

//   const handleSaveEdit = () => {
//     if (editedTitle.trim() !== "") {
//       props.handleEditTask(props.id, editedTitle);
//     }
//     setIsEditing(false);
//   };

//   return (
//     <div>
//       {isEditing ? (
//         <>
//           <input type="text" value={editedTitle} onChange={handleTitleChange} />
//           <ButtonStyled title={"Salvar"} clickFunction={handleSaveEdit} />
//         </>
//       ) : (
//         <>
//           <div
//             onDoubleClick={handleDoubleClick}
//             style={{ cursor: "pointer" }}
//             onClick={props.onClick}
//           >
//             {props.children}
//           </div>
//           <div>{new Date(props.date).toLocaleString()}</div>
//         </>
//       )}
//       <ButtonStyled
//         title={"Remover"}
//         clickFunction={() => props.handleDeleteTask(props.id)}
//       />
//     </div>
//   );
// }
