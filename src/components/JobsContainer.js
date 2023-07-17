import { useEffect } from 'react';
import Wrapper from '../assets/wrappers/JobsContainer';
import { Job, Loading, PageBtnContainer } from './';
import { useDispatch, useSelector } from 'react-redux';
import { getAllJobs } from '../features/allJobs/allJobsSlice';

const JobsContainer = () => {
	const {
		jobs,
		isLoading,
		totalJobs,
		numOfPages,
		page,
		search,
		searchStatus,
		searchType,
		sort,
	} = useSelector((store) => store.allJobs);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAllJobs());
	}, [page, search, searchStatus, searchType, sort]);

	if (isLoading) return <Loading center />;

	if (jobs.length === 0) {
		return (
			<Wrapper>
				<h2>No jobs to display...</h2>
			</Wrapper>
		);
	}

	return (
		<Wrapper>
			<h5>
				{totalJobs} job{totalJobs > 1 && 's'} found
			</h5>
			<div className='jobs'>
				{jobs.map((job) => {
					return <Job key={job._id} {...job} />;
				})}
			</div>
			{numOfPages > 1 && <PageBtnContainer />}
		</Wrapper>
	);
};

export default JobsContainer;
