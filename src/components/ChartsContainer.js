import { useState } from 'react';
import { useSelector } from 'react-redux';
import Wrapper from '../assets/wrappers/ChartsContainer';
import { BarChart, AreaChart } from './';

const ChartsContainer = () => {
	const [barChart, setBarChart] = useState(true);
	const { monthlyApplications: data } = useSelector((store) => store.allJobs);

	return (
		<Wrapper>
			<h4>monthly applications</h4>
			<button type='button' onClick={() => setBarChart(!barChart)}>
				{barChart ? 'Area chart' : 'Bar chart'}
			</button>
			{barChart ? <BarChart data={data} /> : <AreaChart data={data} />}
		</Wrapper>
	);
};

export default ChartsContainer;
