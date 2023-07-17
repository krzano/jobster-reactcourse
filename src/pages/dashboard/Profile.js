import { useState } from 'react';
import { FormRow } from '../../components';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { updateUser } from '../../features/user/userSlice';

const Profile = () => {
	const { isLoading, user } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const [userData, setUserData] = useState({
		name: user?.name || '',
		lastName: user?.lastName || '',
		email: user?.email || '',
		location: user?.location || '',
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		const { name, lastName, email, location } = userData;
		if (!name || !lastName || !email || !location) {
			toast.error('Please fill out all fields');
			return;
		}
		dispatch(updateUser({ name, lastName, email, location }));
	};

	const handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setUserData({
			...userData,
			[name]: value,
		});
	};

	return (
		<Wrapper>
			<form className='form' onSubmit={handleSubmit}>
				<h3>profile</h3>
				<div className='form-center'>
					<FormRow type='text' name='name' value={userData.name} handleChange={handleChange} />
					<FormRow
						type='text'
						name='lastName'
						value={userData.lastName}
						handleChange={handleChange}
						labelText='last name'
					/>
					<FormRow type='email' name='email' value={userData.email} handleChange={handleChange} />
					<FormRow type='text' name='location' value={userData.location} handleChange={handleChange} />
					<button type='submit' className='btn btn-block' disabled={isLoading}>
						{isLoading ? 'please wait...' : 'save changes'}
					</button>
				</div>
			</form>
		</Wrapper>
	);
};
export default Profile;
