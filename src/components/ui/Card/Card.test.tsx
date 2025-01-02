import { render, screen } from "@testing-library/react";
import Card from ".";

describe("Card component", () => {
  it("renders the component with `children`", () => {
    render(
      <Card>
        <p>Card children</p>
      </Card>
    );
    expect(screen.getByText(/card children/i)).toBeInTheDocument();
  });
});
