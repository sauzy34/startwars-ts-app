import { ReactNode } from "react";
import Button from "../ui/Button";
import s from "./NotFound.module.scss";

function NotFound({ children }: { children?: ReactNode }) {
  return (
    <div className={s.main}>
      {children || <p>The page you are looking for does not exist.</p>}
      <Button onClick={() => window.history.back()}>Go back</Button>
    </div>
  );
}

export default NotFound;
