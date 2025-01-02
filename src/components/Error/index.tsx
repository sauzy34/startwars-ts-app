import { AxiosError } from "axios";
import { memo } from "react";

function Error({ error }: { error?: AxiosError }) {
  return (
    <div>
      <h5>{error?.message}</h5>
    </div>
  );
}

export default memo(Error);
