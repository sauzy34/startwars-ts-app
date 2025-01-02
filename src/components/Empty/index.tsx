import { memo } from "react";
import Container from "../ui/Container";

function Empty() {
  return (
    <Container>
      <h3>No data found</h3>
    </Container>
  );
}

export default memo(Empty);
