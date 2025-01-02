import { render, screen } from "@testing-library/react";
import Container from ".";

describe("Container component", () => {
  it("renders the component with `children`", () => {
    render(
      <Container>
        <p>Container children</p>
      </Container>
    );
    expect(screen.getByText(/Container children/i)).toBeInTheDocument();
  });
});
