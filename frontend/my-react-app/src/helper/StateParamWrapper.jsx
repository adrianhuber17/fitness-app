import { useSearchParams, Outlet, Navigate } from "react-router-dom";

export const StateParamWrapper = () => {
  const [search] = useSearchParams();
  const stateParam = search.get("userId");
  console.log("stateParam ", stateParam);
  return stateParam ? <Outlet /> : <Navigate to="/" replace />;
};

export const GetOtherUserId = () => {
  const [search] = useSearchParams();
  const stateParam = search.get("userId");
  return stateParam;
};
