import { memo } from "react";
import s from "./LabelValuePair.module.scss";
import cn from "classnames";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string;
  className?: string;
}

function LabelValuePair({ label, value, className, ...rest }: Props) {
  return (
    <div className={cn(s.labelValuePair, className)} {...rest}>
      <span className={s.label}>{label}:</span>
      <span className={s.value}>{value}</span>
    </div>
  );
}

export default memo(LabelValuePair);
