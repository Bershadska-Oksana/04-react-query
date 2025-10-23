import type { FormEvent } from "react";
import toast from "react-hot-toast";

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

const SearchBar = ({ onSubmit }: SearchBarProps) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const query =
      (new FormData(form).get("query") as string | null)?.trim() || "";

    if (!query) {
      toast.error("Please enter a search query");
      return;
    }

    onSubmit(query);
    form.reset();
  };

  return (
    <form action={handleSubmit}>
      <input type="text" name="query" placeholder="Enter movie title..." />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
