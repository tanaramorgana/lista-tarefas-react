import { Button } from "./styles";

interface ButtonStyledProps {
  title: string;
  clickFunction: () => void;
}

export function ButtonStyled(props: ButtonStyledProps) {
  return <Button onClick={props.clickFunction}>{props.title}</Button>;
}
