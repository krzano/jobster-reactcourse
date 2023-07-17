import { useEffect } from 'react';
import { getStats } from '../../features/allJobs/allJobsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { ChartsContainer, Loading, StatsContainer } from '../../components';

const Stats = () => {
	const { isLoading, monthlyApplications } = useSelector(
		(store) => store.allJobs
	);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getStats());
	}, []);

	if (isLoading) return <Loading center />;

	return (
		<>
			<StatsContainer />
			{monthlyApplications.length > 0 && <ChartsContainer />}
		</>
	);
};
export default Stats;
