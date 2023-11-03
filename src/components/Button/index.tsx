interface ButtonStyledProps {
  title: string;
  clickFunction: () => void;
}

export function ButtonStyled(props: ButtonStyledProps) {
  return <button onClick={props.clickFunction}>{props.title}</button>;
}
