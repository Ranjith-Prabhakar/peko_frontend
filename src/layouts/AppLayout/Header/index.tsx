import Brand from "../../../components/layout/Brand";
import NavBar from "../../../features/Navbar";

export default function Header() {
  return (
    <div className="navbar  shadow-2xl h-17.5 flex justify-between items-center">
      <Brand />
      <NavBar />
    </div>
  );
}
