import Topics from "src/app/pages/Topics";
import { screen } from "@testing-library/react";
import { renderWithMemoryRouter } from "src/services/test-utils";

describe("Topics", () => {
  beforeEach(() => {
    renderWithMemoryRouter(<Topics />);
  });

  it("shows a headline", () => {
    const headline = screen.getByRole("heading", { name: "Browse all topics" });

    expect(headline).toBeVisible();
  });
});
