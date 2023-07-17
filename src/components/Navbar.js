import { useState } from 'react';
import Wrapper from '../assets/wrappers/Navbar';
import Logo from './Logo';
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import {
	clearStore,
	logoutUser,
	toggleSidebar,
} from '../features/user/userSlice';

const Navbar = () => {
	const { user } = useSelector((store) => store.user);
	const dispatch = useDispatch();
	const [showDropdown, setShowDropdown] = useState(false);

	const toggle = () => {
		dispatch(toggleSidebar());
	};
	const logout = () => {
		dispatch(clearStore('you have been logged out'));
	};

	return (
		<Wrapper>
			<div className='nav-center'>
				<button type='button' className='toggle-btn' onClick={toggle}>
					<FaAlignLeft />
				</button>
				<div>
					<Logo />
					<h3 className='logo-text'>dashboard</h3>
				</div>
				<div className='btn-container'>
					<button
						type='button'
						className='btn'
						onClick={() => setShowDropdown(!showDropdown)}>
						<FaUserCircle />
						{user?.name || 'User'}
						<FaCaretDown />
					</button>
					<div className={`dropdown ${showDropdown && 'show-dropdown'}`}>
						<button type='button' className='dropdown-btn' onClick={logout}>
							logout
						</button>
					</div>
				</div>
			</div>
		</Wrapper>
	);
};
export default Navbar;
