interface GenreFilterProps {
  genres: string[];
  selectedGenre: string;
  onChange: (genre: string) => void;
}

export default function GenreFilter({
  genres,
  selectedGenre,
  onChange,
}: GenreFilterProps) {
  return (
    <div className="flex items-center gap-2 w-full md:justify-end">
      <label htmlFor="genre-select" className="mr-2 font-medium">
        Genre
      </label>
      <div className="h-6 w-px bg-gray-400 mx-2" />
      <select
        id="genre-select"
        className="rounded px-2 py-1 outline-none w-full md:w-auto"
        value={selectedGenre}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">All</option>
        {genres.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>
    </div>
  );
}
