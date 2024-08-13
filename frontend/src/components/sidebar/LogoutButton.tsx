import { LogOut } from "lucide-react";
import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {
	

	const { isLoading, logout } = useLogout();

	return (
		<div className='mt-auto'>
			{isLoading ? 
      			<span className="loading loading-spinner loading-xs"></span>
			: <LogOut className='w-6 h-6 text-white cursor-pointer' onClick={logout} />}
		</div>
	);
};
export default LogoutButton;
