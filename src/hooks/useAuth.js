import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/auth.slice/token.slice";
import { useSelector } from "react-redux";

export default function useAuth() {
  const dispatch = useDispatch();
  const { loggedIn } = useSelector((state) => state.tokens);

  useEffect(() => {
    dispatch(setUser());
  }, [dispatch]);

  return loggedIn;
}
