import { memo } from "react";
import cn from "classnames";
import s from "./Container.module.scss";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}
function Container({ className, ...rest }: Props) {
  return <section className={cn(s.section, className)} {...rest} />;
}

export default memo(Container);
