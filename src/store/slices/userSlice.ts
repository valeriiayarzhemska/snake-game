import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IUserState {
  username: string;
}

const initialState: IUserState = {
  username: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
  },
});

export const { setUsername } = userSlice.actions;
export default userSlice.reducer;
