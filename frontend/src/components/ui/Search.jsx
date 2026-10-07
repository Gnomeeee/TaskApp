import Button from "./Button.jsx";
import Form from "./Form.jsx";
import Input from "./Input.jsx";

const Search = ({
  id = "search",
  value,
  onChange,
  onSubmit,
  placeholder = "Search tasks...",
}) => {
  return (
    <Form onSubmit={onSubmit} role="search">
      <Input
        id={id}
        type="search"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      <Button type="submit">Search</Button>
    </Form>
  );
};

export default Search;
