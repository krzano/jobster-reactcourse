import {
	BarChart,
	Bar,
	LabelList,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from 'recharts';

const BarChartComponent = ({ data }) => {
	return (
		<ResponsiveContainer width='100%' height={300}>
			<BarChart data={data} margin={{ top: 50 }}>
				<CartesianGrid strokeDasharray='3 3' />
				<XAxis dataKey='date' />
				<YAxis allowDecimals={false} />
				<Tooltip />
				<Bar dataKey='count' stroke='#3b82f6' fill='#3b82f6ab' maxBarSize={100}>
					<LabelList dataKey='count' position='top' />
				</Bar>
			</BarChart>
		</ResponsiveContainer>
	);
};
export default BarChartComponent;
