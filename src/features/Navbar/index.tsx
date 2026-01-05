import Notification from "./components/Notification";
import useGetUser from "../../hooks/useGetUser";
import LoggedInProfileIcon from "./components/LoggedInProfileIcon";
import LoggedOutProfileIcon from "./components/LoggedOutProfileIcon";

const Navbar = () => {
  const user = useGetUser()
  console.log("user",user)
  return (
    <div className="flex items-center gap-4">
      {
        user ? <>
        <Notification />
        <LoggedInProfileIcon />
         </> : <LoggedOutProfileIcon />
      }
     
    </div>
  );
};

export default Navbar;
