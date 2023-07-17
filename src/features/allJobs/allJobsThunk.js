import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios';

export const getAllJobsThunk = async (_, thunkAPI) => {
	const { page, search, searchStatus, searchType, sort } =
		thunkAPI.getState().allJobs;
	let url = `/jobs?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}&search=${search}`;
	try {
		const response = await customFetch.get(url);
		return response.data;
	} catch (error) {
		checkForUnauthorizedResponse({ error, thunkAPI });
	}
};

export const getStatsThunk = async (_, thunkAPI) => {
	try {
		const response = await customFetch.get('/jobs/stats');
		return response.data;
	} catch (error) {
		checkForUnauthorizedResponse({ error, thunkAPI });
	}
};
