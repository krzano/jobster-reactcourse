// IMPORTS
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
	addUserToLocalStorage,
	getUserFromLocalStorage,
	removeUserFromLocalStorage,
} from '../../utils/localStorage';
import {
	clearStoreThunk,
	loginUserThunk,
	registerUserThunk,
	updateUserThunk,
} from './userThunk';

// INITIAL USER STATE
const initialState = {
	isLoading: false,
	isSidebarOpen: false,
	user: getUserFromLocalStorage(),
};

// ASYNC THUNKS
export const registerUser = createAsyncThunk(
	'user/registerUser',
	async (user, thunkAPI) => {
		return registerUserThunk({ url: '/auth/register', user, thunkAPI });
	}
);

export const loginUser = createAsyncThunk(
	'user/loginUser',
	async (user, thunkAPI) => {
		return loginUserThunk({ url: '/auth/login', user, thunkAPI });
	}
);

export const updateUser = createAsyncThunk(
	'user/updateUser',
	async (user, thunkAPI) => {
		return updateUserThunk({ url: '/auth/updateUser', user, thunkAPI });
	}
);

export const clearStore = createAsyncThunk(
	'user/clearStore',
	async (message, thunkAPI) => {
		return clearStoreThunk({ message: message, thunkAPI });
	}
);

// CREATE USER SLICE
const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		toggleSidebar: (state) => {
			state.isSidebarOpen = !state.isSidebarOpen;
		},
		logoutUser: (state, { payload }) => {
			state.user = null;
			state.isSidebarOpen = false;
			removeUserFromLocalStorage();
			if (payload) {
				toast.success(payload);
			}
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(registerUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(registerUser.fulfilled, (state, action) => {
				const { user } = action.payload;
				state.user = user;
				state.isLoading = false;
				addUserToLocalStorage(user);
				toast.success(`Hello there ${user.name}`);
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.isLoading = false;
				toast.error(action.payload);
			})
			.addCase(loginUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				const { user } = action.payload;
				state.user = user;
				state.isLoading = false;
				addUserToLocalStorage(user);
				toast.success(`Welcome back ${user.name}`);
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.isLoading = false;
				toast.error(action.payload);
			})
			.addCase(updateUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateUser.fulfilled, (state, action) => {
				const { user } = action.payload;
				state.user = user;
				state.isLoading = false;
				addUserToLocalStorage(user);
				toast.success('user updated');
			})
			.addCase(updateUser.rejected, (state, action) => {
				state.isLoading = false;
				toast.error(action.payload);
			})
			.addCase(clearStore.rejected, () => {
				toast.error('there was an error');
			});
	},
});

// EXPORTS
export default userSlice.reducer;
export const { toggleSidebar, logoutUser } = userSlice.actions;
