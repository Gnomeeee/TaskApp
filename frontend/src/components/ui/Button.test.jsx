import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import Button from "./Button.jsx";

describe("Button", () => {
  it("Renders its label and calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(<Button onClick={onClick}>Save task</Button>);

    await user.click(screen.getByRole("button", { name: "Save task" }));

    expect(onClick).toHaveBeenCalledOnce();
  });

  it("Can be disabled", () => {
    render(<Button disabled>Save task</Button>);

    expect(screen.getByRole("button", { name: "Save task" })).toBeDisabled();
  });
});
