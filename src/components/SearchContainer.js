import { useDispatch, useSelector } from 'react-redux';
import Wrapper from '../assets/wrappers/SearchContainer';
import { FormRow, FormRowSelect } from './';
import { clearFilters, handleChange } from '../features/allJobs/allJobsSlice';
import { useMemo, useState } from 'react';

const SearchContainer = () => {
	const [localSearch, setLocalSearch] = useState('');
	const { isLoading, search, searchStatus, searchType, sort, sortOptions } =
		useSelector((store) => store.allJobs);
	const { jobTypeOptions, statusOptions } = useSelector((store) => store.job);
	const dispatch = useDispatch();

	const handleSearch = (e) => {
		dispatch(
			handleChange({
				name: e.target.name,
				value: e.target.value,
			})
		);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		setLocalSearch('');
		dispatch(clearFilters());
	};

	const debounce = () => {
		let timeoutID;
		return (e) => {
			clearTimeout(timeoutID);
			setLocalSearch(e.target.value);
			timeoutID = setTimeout(() => {
				dispatch(
					handleChange({
						name: e.target.name,
						value: e.target.value,
					})
				);
			}, 1000);
			return;
		};
	};
	const workingDebounce = useMemo(() => debounce(), []);

	return (
		<Wrapper>
			<form className='form'>
				<h4>search form</h4>
				<div className='form-center'>
					{/* search position */}
					<FormRow
						type='text'
						name='search'
						value={localSearch}
						handleChange={workingDebounce}
					/>
					{/* search by status */}
					<FormRowSelect
						name='searchStatus'
						labelText='status'
						value={searchStatus}
						handleChange={handleSearch}
						options={['all', ...statusOptions]}
					/>
					{/* search by job type */}
					<FormRowSelect
						name='searchType'
						labelText='job type'
						value={searchType}
						handleChange={handleSearch}
						options={['all', ...jobTypeOptions]}
					/>
					{/* sort */}
					<FormRowSelect
						name='sort'
						labelText='sort by'
						value={sort}
						handleChange={handleSearch}
						options={sortOptions}
					/>
					<button
						type='submit'
						className='btn btn-block btn-danger'
						disabled={isLoading}
						onClick={handleSubmit}>
						clear filters
					</button>
				</div>
			</form>
		</Wrapper>
	);
};
export default SearchContainer;
