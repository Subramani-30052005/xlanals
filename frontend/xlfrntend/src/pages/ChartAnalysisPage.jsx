//import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Bar, Line } from 'react-chartjs-2';
import { setXKey, setYKey, setChartType } from '../app/slices/chartSlice';
import '../utils/chart-setup';

export default function ChartAnalysisPage() {
  const dispatch = useDispatch();
  const { dataset, xKey, yKey, chartType } = useSelector((s) => s.chart);

  if (!dataset) return <p>No data – upload a file first.</p>;

  const keys = Object.keys(dataset[0] || {});
  const data = {
    labels: dataset.map((d) => d[xKey]),
    datasets: [
      {
        label: yKey,
        data: dataset.map((d) => d[yKey]),
      },
    ],
  };

  const ChartComponent = chartType === 'line' ? Line : Bar;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Chart Analysis</h2>
      <div className="flex space-x-4 mb-4">
        <select value={xKey} onChange={(e) => dispatch(setXKey(e.target.value))} className="border p-2">
          <option value="">X‑Axis</option>
          {keys.map((k) => (<option key={k}>{k}</option>))}
        </select>
        <select value={yKey} onChange={(e) => dispatch(setYKey(e.target.value))} className="border p-2">
          <option value="">Y‑Axis</option>
          {keys.map((k) => (<option key={k}>{k}</option>))}
        </select>
        <select value={chartType} onChange={(e) => dispatch(setChartType(e.target.value))} className="border p-2">
          <option value="bar">Bar</option>
          <option value="line">Line</option>
          <option value="pie">Pie</option>
        </select>
      </div>
      {xKey && yKey && <ChartComponent data={data} />}
    </div>
  );
}
