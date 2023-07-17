import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios';
import { getAllJobs, hideLoading, showLoading } from '../allJobs/allJobsSlice';
import { clearValues } from './jobSlice';

// Authorization header code refactor METHOD #1 (creating authHeader function)
const authHeader = (thunkAPI) => {
	return {
		headers: {
			Authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
		},
	};
};

// Authorization header code refactor METHOD #2 (creating authHeader.js in /utils folder and then importing from file)
// import authHeader from '../../utils/authHeader';
// export const addJobThunk = async (job, thunkAPI) => {
// 	try {
// 		const response = await customFetch.post('/jobs', job, authHeader(thunkAPI));
// 		thunkAPI.dispatch(clearValues());
// 		return response.data;
// 	} catch (error) {
// 		if (error.response.status === 401) {
// 			thunkAPI.dispatch(logoutUser());
// 			return thunkAPI.rejectWithValue('Unauthorized! Logging Out...');
// 		}
// 		return thunkAPI.rejectWithValue(error.response.data.msg);
// 	}
// };

// Authorization header code refactor METHOD #3 (AXIOS INTERCEPTORS APPROACH (we do it in utils/axios.js) then we remove authorization header from our thunks)

export const addJobThunk = async (job, thunkAPI) => {
	try {
		const response = await customFetch.post('/jobs', job);
		thunkAPI.dispatch(clearValues());
		return response.data;
	} catch (error) {
		checkForUnauthorizedResponse({ error, thunkAPI });
	}
};

export const deleteJobThunk = async (jobId, thunkAPI) => {
	thunkAPI.dispatch(showLoading());
	try {
		const response = await customFetch.delete(`/jobs/${jobId}`);
		thunkAPI.dispatch(getAllJobs());
		return response.data.msg;
	} catch (error) {
		thunkAPI.dispatch(hideLoading());
		checkForUnauthorizedResponse({ error, thunkAPI });
	}
};

export const editJobThunk = async ({ jobId, job }, thunkAPI) => {
	try {
		const response = await customFetch.patch(`/jobs/${jobId}`, job);
		thunkAPI.dispatch(clearValues());
		return response.data;
	} catch (error) {
		checkForUnauthorizedResponse({ error, thunkAPI });
	}
};
