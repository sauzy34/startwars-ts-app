import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App Component", () => {
  it("renders the app", () => {
    render(<App />);
    const title = screen.getByText("Star Wars 💥");
    expect(title).toBeInTheDocument();
  });
});
