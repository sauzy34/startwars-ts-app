import { memo } from "react";
import s from "./Search.module.scss";
import cn from "classnames";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

function Search({ className, ...rest }: Props) {
  return <input className={cn(s.input, className)} {...rest}></input>;
}

export default memo(Search);
