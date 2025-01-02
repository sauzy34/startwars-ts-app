import { memo } from "react";
import cn from "classnames";
import s from "./Card.module.scss";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

function Card({ className, ...rest }: Props) {
  return <div className={cn(s.card, className)} {...rest}></div>;
}

export default memo(Card);
