import { useState } from "react";

interface Props {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: Props) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(input);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        placeholder="Enter movie title..."
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
