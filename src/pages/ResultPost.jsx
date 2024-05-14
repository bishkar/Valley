import { useParams } from "react-router-dom";
import {
  useGetImageDataQuery,
  useGetImageQuery,
} from "../redux/api.slice/api.slice";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function ResultPost() {
  const { nasaId } = useParams();

  const { data } = useGetImageDataQuery(nasaId);
  const { data: imagesCollection } = useGetImageQuery(nasaId);

  return (
    <Box>
      {data && (
        <Typography variant="h5">
          {data.collection.items[0].data[0].title}
        </Typography>
      )}
      {imagesCollection && (
        <Box
          component="img"
          sx={{ maxWidth: "70%" }}
          src={imagesCollection.collection.items[1].href}
        ></Box>
      )}
    </Box>
  );
}
