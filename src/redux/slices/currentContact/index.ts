import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Contact {
  userId: number;
  firstName: string;
  lastName: string;
  status: string;
}

const initialState: Contact = {
  firstName: "",
  lastName: "",
  status: "",
  userId: NaN,
};

export const currentContactSlice = createSlice({
  name: "currentContact",
  initialState,
  reducers: {
    updateCurrentContact: (state, action: PayloadAction<Contact>) => {
      return action.payload;
    },
  },
});

export const { updateCurrentContact } = currentContactSlice.actions;
export default currentContactSlice.reducer;
