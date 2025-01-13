import { PayloadAction, ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const handleAsyncActions = (
  builder: ActionReducerMapBuilder<any>,
  asyncThunk: any,
  stateKey: string
) => {
  builder
    .addCase(asyncThunk.pending, (state) => {
      state[stateKey].isLoading = true;
      state[stateKey].error = null;
    })
    .addCase(asyncThunk.fulfilled, (state, action: PayloadAction<any>) => {
      state[stateKey].isLoading = false;
      state[stateKey].data = action.payload;
      state[stateKey].error = null;
    })
    .addCase(asyncThunk.rejected, (state, action: PayloadAction<any>) => {
      state[stateKey].isLoading = false;
      state[stateKey].error = action.payload || "An error occurred";
    });
};
