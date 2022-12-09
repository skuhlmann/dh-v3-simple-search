import { ChangeEvent, useEffect, useState } from "react";
import styled from "styled-components";
import { BiSearch } from "react-icons/bi";

import { Field, Input } from "@daohaus/ui";
import useDebounce from "../utils/debounceHook";

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  .tall-input {
    height: 7rem;
    width: 100%;
  }
  svg {
    top: 2.7rem;
  }
`;

type SearchInputProps = {
  searchTerm: string | null | undefined;
  setSearchTerm: (term: string) => void;
  loading: boolean;
} & Partial<Field>;

const SearchInput = ({
  searchTerm,
  setSearchTerm,
  loading,
  ...inputProps
}: SearchInputProps) => {
  const [localSearchTerm, setLocalSearchTerm] = useState<string>("");

  const debouncedSearchTerm = useDebounce<string>(localSearchTerm, 700);

  useEffect(() => {
    if (localSearchTerm !== searchTerm) {
      setSearchTerm(localSearchTerm);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);

  const handleSearchTermChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLocalSearchTerm((prevState) =>
      prevState === event.target.value ? "" : event.target.value
    );
  };

  return (
    <InputContainer>
      <Input
        icon={BiSearch}
        long
        id="dao-search"
        placeholder="Search DAOs"
        onChange={handleSearchTermChange}
        defaultValue={localSearchTerm}
        disabled={loading}
        className="tall-input long"
        {...inputProps}
      />
    </InputContainer>
  );
};

export default SearchInput;
