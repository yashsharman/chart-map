import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Contact {
  userId: number;
  firstName: string;
  lastName: string;
  status: string;
}

const initialState: Contact[] = [];

export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<Contact>) => {
      state.push(action.payload);
    },
    deleteContact: (state, action: PayloadAction<{ userId: number }>) => {
      return state.filter(
        (contact) => contact.userId !== action.payload.userId
      );
    },
    editContact: (state, action: PayloadAction<Contact>) => {
      return state.map((contact) =>
        contact.userId === action.payload.userId
          ? { ...contact, ...action.payload }
          : contact
      );
    },
  },
});

export const { addContact, deleteContact, editContact } = contactSlice.actions;
export default contactSlice.reducer;
