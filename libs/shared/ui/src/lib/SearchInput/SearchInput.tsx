import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  width?: number | string;
}

const SearchInput = ({
  value,
  onChange,
  placeholder = "Search...",
  width = 300,
}: SearchInputProps) => {
  return (
    <TextField
      placeholder={placeholder}
      size="small"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon color="action" />
          </InputAdornment>
        ),
      }}
      sx={{ width }}
    />
  );
};

export default SearchInput;
