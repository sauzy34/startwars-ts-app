import { memo } from "react";
import cn from "classnames";
import s from "./Button.module.scss";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

function Button({ className, ...rest }: Props) {
  return <button className={cn(s.btn, className)} {...rest}></button>;
}

export default memo(Button);
