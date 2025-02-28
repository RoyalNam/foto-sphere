import { PayloadAction, ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const handleAsyncReducers = (
  builder: ActionReducerMapBuilder<any>,
  action: any,
  stateKey: string
) => {
  builder
    .addCase(action.pending, (state) => {
      state[stateKey].isLoading = true;
      state[stateKey].error = null;
    })
    .addCase(action.fulfilled, (state, action: PayloadAction<any>) => {
      state[stateKey].isLoading = false;
      state[stateKey].error = null;

      if (action.payload.hasMore !== undefined) {
        state[stateKey].hasMore = action.payload.hasMore;

        const existingIds = new Set(
          state[stateKey].data.map((item: any) => item.id)
        );
        const filteredData = action.payload.data.filter(
          (item: any) => !existingIds.has(item.id)
        );

        state[stateKey].data = [...state[stateKey].data, ...filteredData];
      } else {
        state[stateKey].data = action.payload;
      }
    })
    .addCase(action.rejected, (state, action: PayloadAction<any>) => {
      state[stateKey].isLoading = false;
      state[stateKey].error = action.payload || "An error occurred";
    });
};
