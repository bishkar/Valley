import { Box } from "@mui/material";
import Search from "../components/Search/Search";
import { useState } from "react";
import { useSearchQuery } from "../redux/api.slice/api.slice";
import { skipToken } from "@reduxjs/toolkit/query/react";
import SearchResults from "../components/SearchResults/SearchResults";

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState(skipToken);

  const data = useSearchQuery(searchQuery);

  function handleSearch(searchValue) {
    setSearchQuery(searchValue);
    console.log(data);
  }

  return (
    <>
      <Box component="section">
        <Search handleSearch={handleSearch} />
        {data && <SearchResults data={data} />}
      </Box>
    </>
  );
}
