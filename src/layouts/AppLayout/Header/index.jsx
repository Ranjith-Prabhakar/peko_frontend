import Brand from "../../../components/layout/Brand";
import SearchBar from "../../../components/layout/SearchBar";
import NavBar from "../../../features/Navbar";

export default function Header() {
  return (
    <div className="navbar  shadow-2xl h-17.5 flex justify-between items-center">
      <Brand />
      <SearchBar />
      <NavBar />
    </div>
  );
}
