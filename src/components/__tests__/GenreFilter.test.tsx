import { render, screen, fireEvent } from "@testing-library/react";
import GenreFilter from "../GenreFilter";

describe("GenreFilter", () => {
  const mockGenres = ["Action", "RPG", "Adventure", "Shooter"];
  const mockOnChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all genres in select options", () => {
    render(
      <GenreFilter
        genres={mockGenres}
        selectedGenre=""
        onChange={mockOnChange}
      />
    );

    expect(screen.getByText("All Genres")).toBeDefined();
    mockGenres.forEach((genre) => {
      expect(screen.getByText(genre)).toBeDefined();
    });
  });

  it("shows selected genre", () => {
    render(
      <GenreFilter
        genres={mockGenres}
        selectedGenre="Action"
        onChange={mockOnChange}
      />
    );

    const select = screen.getByRole("combobox") as HTMLSelectElement;
    expect(select.value).toBe("Action");
  });

  it("calls onChange when genre is selected", () => {
    render(
      <GenreFilter
        genres={mockGenres}
        selectedGenre=""
        onChange={mockOnChange}
      />
    );

    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "RPG" } });

    expect(mockOnChange).toHaveBeenCalledWith("RPG");
  });

  it("calls onChange with empty string when All Genres is selected", () => {
    render(
      <GenreFilter
        genres={mockGenres}
        selectedGenre="Action"
        onChange={mockOnChange}
      />
    );

    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "" } });

    expect(mockOnChange).toHaveBeenCalledWith("");
  });
});
