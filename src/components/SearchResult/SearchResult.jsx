import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function SearchResult({ item }) {
  // console.log(item);
  return (
    <Box>
      <Link to={`/result/${item.data[0].nasa_id}`}>
        <Box
          component="img"
          sx={{
            maxWidth: "100%",
          }}
          src={item.links[0].href}
          alt={item.data[0].description}
        ></Box>
        <Typography>{item.data[0].title}</Typography>
      </Link>
    </Box>
  );
}
