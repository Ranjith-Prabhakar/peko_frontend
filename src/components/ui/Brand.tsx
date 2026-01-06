import { useNavigate } from "react-router-dom";

const Brand = () => {
  const navigat = useNavigate();
  return (
    <div className="w-[10%] cursor-pointer" onClick={() => navigat("/")}>
      <a className="text-xl">Peko</a>
    </div>
  );
};

export default Brand;
