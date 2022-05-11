import { GetOtherUserId } from "../helperFunction/StateParamWrapper";

const OtherUser = () => {
  const otherUserId = GetOtherUserId();
  console.log(otherUserId);
  return <h1>Other User Profile : {otherUserId}</h1>;
};
export default OtherUser;
