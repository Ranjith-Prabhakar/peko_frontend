import Brand from "../../../components/layout/Brand";
import NavBar from "../../../features/Navbar";

export default function Header() {
  return (
    <header className="navbar fixed top-0 left-0 w-full z-50 shadow-2xl h-17.5 bg-base-100 flex justify-between items-center">
      <Brand />
      <NavBar />
    </header>
  );
}
