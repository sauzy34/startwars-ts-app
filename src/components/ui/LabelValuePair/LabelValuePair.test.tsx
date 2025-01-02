import { render, screen } from "@testing-library/react";
import LabelValuePair from ".";

describe("LabelValuePair component", () => {
  it("renders the component with label & value", () => {
    render(<LabelValuePair label="Text" value="123" />);
    expect(screen.getByText(/Text:/i)).toBeInTheDocument();
    expect(screen.getByText(/123/i)).toBeInTheDocument();
  });
});
