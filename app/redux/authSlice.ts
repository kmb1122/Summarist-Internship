import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = {
        email: action.payload.email,
        uid: action.payload.uid,
        subscriptionPlan: action.payload.subscriptionPlan,   // "basic" or "premium"
        librarySaved: action.payload.librarySaved,
        libraryFinished: action.payload.libraryFinished
      };
      state.isGuest = false;
    },

    clearUser: (state) => {
      state.user = null;
      state.isGuest = false;
    },

    updateLibrarySaved: (state, action) => {
      const { type, book } = action.payload;

      if (type === "add") {
        state.user.librarySaved.push(book);
      }

      if (type === "remove") {
        state.user.librarySaved = state.user.librarySaved.filter(
          (b) => b.id !== book.id
        );
      }
    },

    updateLibraryFinished: (state, action) => {
      const { type, book } = action.payload;

      if (type === "add") {
        const exists = state.user.libraryFinished.some(b => b.id === book.id);
        if (!exists) {
          state.user.libraryFinished.push(book);
        }
      }

      if (type === "remove") {
        state.user.libraryFinished = state.user.libraryFinished.filter(
          (b) => b.id !== book.id
        );
      }
    }
  }
});

export const { setUser, clearUser, updateLibrarySaved, updateLibraryFinished } = authSlice.actions;
export default authSlice.reducer;