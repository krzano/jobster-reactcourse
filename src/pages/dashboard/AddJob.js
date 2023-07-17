import { useDispatch, useSelector } from 'react-redux';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { FormRow, FormRowSelect } from '../../components';
import { toast } from 'react-toastify';
import {
	addJob,
	clearValues,
	editJob,
	handleChange,
} from '../../features/job/jobSlice';
import { useEffect } from 'react';

const AddJob = () => {
	const {
		isLoading,
		position,
		company,
		jobLocation,
		jobType,
		jobTypeOptions,
		status,
		statusOptions,
		isEditing,
		editJobId,
	} = useSelector((store) => store.job);
	const { user } = useSelector((store) => store.user);
	const dispatch = useDispatch();

	useEffect(() => {
		if (!isEditing) {
			dispatch(handleChange({ name: 'jobLocation', value: user.location }));
		}
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!position || !company || !jobLocation) {
			toast.error('Please fill out all fields');
			return;
		}
		const job = { position, company, jobLocation, jobType, status };
		if (isEditing) {
			dispatch(
				editJob({
					jobId: editJobId,
					job,
				})
			);
			return;
		}
		dispatch(addJob(job));
		return;
	};

	const handleJobInput = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		dispatch(handleChange({ name, value }));
	};

	return (
		<Wrapper>
			<form className='form'>
				<h3>{isEditing ? 'edit job' : 'add job'}</h3>
				<div className='form-center'>
					{/* position */}
					<FormRow
						type='text'
						name='position'
						value={position}
						handleChange={handleJobInput}
					/>
					{/* company */}
					<FormRow
						type='text'
						name='company'
						value={company}
						handleChange={handleJobInput}
					/>
					{/* job location */}
					<FormRow
						type='text'
						name='jobLocation'
						labelText='job location'
						value={jobLocation}
						handleChange={handleJobInput}
					/>
					{/* job status (select) */}
					<FormRowSelect
						name='status'
						value={status}
						options={statusOptions}
						handleChange={handleJobInput}
					/>
					{/* job type (select) */}
					<FormRowSelect
						name='jobType'
						labelText='job type'
						value={jobType}
						options={jobTypeOptions}
						handleChange={handleJobInput}
					/>
					{/* btn container  */}
					<div className='btn-container'>
						<button
							type='button'
							className='btn btn-block clear-btn'
							onClick={() => dispatch(clearValues())}>
							clear
						</button>
						<button
							type='submit'
							className='btn btn-block submit-btn'
							onClick={handleSubmit}
							disabled={isLoading}>
							submit
						</button>
					</div>
				</div>
			</form>
		</Wrapper>
	);
};
export default AddJob;
