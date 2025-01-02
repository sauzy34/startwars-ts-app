import { fireEvent, render, screen } from "@testing-library/react";
import Button from ".";

describe("Button component", () => {
  it("renders the component with `children`", () => {
    render(<Button>Click</Button>);
    expect(screen.getByText(/Click/i)).toBeInTheDocument();
  });

  it("fires `onClick` when clicked", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByText(/click/i));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("has the `className`", () => {
    render(<Button className="primary">Click</Button>);
    expect(screen.getByText(/click/i)).toHaveClass("primary");
  });
});
