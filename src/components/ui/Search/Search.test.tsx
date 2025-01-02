import { render, fireEvent, screen } from "@testing-library/react";
import Search from ".";
import React from "react";

describe("Search component", () => {
  it("renders the component with a placeholder", () => {
    render(
      <Search value="" onChange={() => {}} placeholder="Placeholder text" />
    );
    const inputElement = screen.getByPlaceholderText(/placeholder text/i);
    expect(inputElement).toBeInTheDocument();
  });

  it("receives and renders the value", () => {
    render(<Search value="Star wars" onChange={() => {}} />);
    const inputElement = screen.getByDisplayValue(/star wars/i);
    expect(inputElement).toBeInTheDocument();
  });

  it("calls `onChange` when the value is mutated", () => {
    const handleChange = vi.fn();
    render(
      <Search value="" onChange={handleChange} placeholder="Placeholder text" />
    );

    const inputElement = screen.getByPlaceholderText(/placeholder text/i);
    fireEvent.change(inputElement, { target: { value: "New Value" } });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(expect.any(Object));
  });

  it("mutates the value when typed into the search", () => {
    const MockSearch = () => {
      const [value, setValue] = React.useState("");
      return (
        <Search value={value} onChange={(e) => setValue(e.target.value)} />
      );
    };

    render(<MockSearch />);
    const inputElement = screen.getByRole("textbox");

    fireEvent.change(inputElement, { target: { value: "Star wars" } });
    expect(inputElement).toHaveValue("Star wars");
  });
});
