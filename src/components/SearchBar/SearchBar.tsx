import type { FormEvent } from "react";
import toast from "react-hot-toast";

interface SearchBarProps {
  action: (formData: FormData) => void;
}

const SearchBar = ({ action }: SearchBarProps) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const query = (formData.get("query") as string | null) ?? "";
    if (!query.trim()) {
      toast.error("Please enter a search query");
      return;
    }

    action(formData);
    form.reset();
  };

  return (
    <form onSubmit={handleSubmit} action="">
      <input type="text" name="query" placeholder="Enter movie title..." />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
