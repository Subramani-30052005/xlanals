import { createSlice } from '@reduxjs/toolkit';

const chartSlice = createSlice({
  name: 'chart',
  initialState: {
    dataset: null,
    xKey: '',
    yKey: '',
    chartType: 'bar',
  },
  reducers: {
    setDataset: (s, { payload }) => void (s.dataset = payload),
    setXKey: (s, { payload }) => void (s.xKey = payload),
    setYKey: (s, { payload }) => void (s.yKey = payload),
    setChartType: (s, { payload }) => void (s.chartType = payload),
  },
});

export const { setDataset, setXKey, setYKey, setChartType } = chartSlice.actions;
export default chartSlice.reducer;
