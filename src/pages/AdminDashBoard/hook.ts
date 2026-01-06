import  {  useState } from 'react';


function useAdminDashBoardHook() {
  const [activeMenuId, setActiveMenuId] = useState<number | null>(null);

 
  return {
    activeMenuId,
    setActiveMenuId,
  };
}

export default useAdminDashBoardHook;
