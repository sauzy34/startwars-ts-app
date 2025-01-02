import { render, screen } from "@testing-library/react";
import OrderedList from ".";

describe("OrderedList component", () => {
  it("renders the component with title & ordered list", () => {
    render(
      <OrderedList
        data={["item1", "item2"]}
        title="Title"
        renderItem={(item, idx) => <span key={idx}>{item}</span>}
      />
    );
    expect(screen.getByRole("heading", { name: "Title" })).toBeInTheDocument();
    expect(screen.getByText("item1")).toBeInTheDocument();
    expect(screen.getByText("item2")).toBeInTheDocument();
  });
});
