import Box from "@mui/material/Box";
import Masonry from "@mui/lab/Masonry";
import SearchResult from "../SearchResult/SearchResult";

export default function SearchResults({ data }) {
  console.log("render");
  const { collection } = data;
  return (
    <Box sx={{ marginBottom: "20px" }}>
      <Masonry columns="3">
        {collection.items.length &&
          collection.items.map((item) => (
            <Box key={item.data[0].nasa_id}>
              <SearchResult item={item} />
            </Box>
          ))}
      </Masonry>
    </Box>
  );
}
