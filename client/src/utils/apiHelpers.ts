export const fetchData = async (
  apiFunc: Function,
  params: any,
  rejectWithValue: any
) => {
  try {
    const response = await apiFunc(params);
    return response;
  } catch (error) {
    return rejectWithValue("An error occurred");
  }
};
