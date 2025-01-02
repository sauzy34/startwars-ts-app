import { memo, ReactNode } from "react";
import Card from "../Card";

interface Props<T> {
  data: T[];
  title: ReactNode;
  renderItem: (item: T, idx: number) => ReactNode;
}

function OrderedList<T>({ data, title, renderItem }: Props<T>) {
  return (
    <Card>
      <h3>{title}</h3>
      {data.length ? (
        <ol>
          {data.map((dt, idx) => {
            return <li key={idx}>{renderItem(dt, idx)}</li>;
          })}
        </ol>
      ) : (
        <p>No data found</p>
      )}
    </Card>
  );
}

export default memo(OrderedList) as typeof OrderedList;
