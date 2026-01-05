import { useNavigate } from "react-router-dom"
const LoggedOutProfileIcon = () => {
    const navigat  = useNavigate()
  return (
     <div className="w-10 rounded-full overflow-hidden" onClick={()=>navigat('/login')}>
        <img
        alt="Tailwind CSS Navbar component"
        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
    </div>
  )
}

export default LoggedOutProfileIcon
