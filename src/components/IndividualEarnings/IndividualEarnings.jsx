import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { FaArrowLeft, FaMoneyBillWave } from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from "recharts";
import Loading from "../../components/Loading";
import { AuthContext } from "../../provider/AuthProvider";

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042'];

const IndividualEarnings = () => {
  const { earningList, loading } = useContext(AuthContext);
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedEarning, setSelectedEarning] = useState(null);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Try to get data from navigation state first
    if (location.state?.earningData) {
      setSelectedEarning(location.state.earningData);
      return;
    }

    // Fallback to finding in earningList
    if (earningList && id) {
      const foundEarning = earningList.find(item => item.id === id);
      setSelectedEarning(foundEarning);
    }
  }, [id, earningList, location.state]);

  useEffect(() => {
    if (selectedEarning?.earnings) {
      const formattedData = Object.entries(selectedEarning.earnings).map(([year, amount]) => ({
        year,
        PaidOut: amount * 0.8,
        Expected: amount * 0.2,
        Total: amount
      }));
      setChartData(formattedData);
    }
  }, [selectedEarning]);

  const handleGoBack = () => navigate(-1);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loading />
      </div>
    );
  }

  if (!selectedEarning) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="text-gray-400 mb-4">
          <FaMoneyBillWave size={48} />
        </div>
        <h3 className="text-xl font-medium text-gray-700 mb-2">
          Earnings data not found
        </h3>
        <button
          onClick={handleGoBack}
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  // Calculate totals
  const totals = chartData.reduce((acc, entry) => ({
    paidOut: acc.paidOut + entry.PaidOut,
    expected: acc.expected + entry.Expected,
    total: acc.total + entry.Total
  }), { paidOut: 0, expected: 0, total: 0 });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-6 flex items-center">
        <button
          onClick={handleGoBack}
          className="flex items-center text-blue-500 hover:text-blue-700 transition-colors"
        >
          <FaArrowLeft className="mr-2" />
          Back
        </button>
        
        <h1 className="text-2xl text-center font-bold ml-4 text-gray-800">
          {selectedEarning.name || 'Earnings Details'}
        </h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis 
                dataKey="year" 
                label={{ 
                  value: 'Year', 
                  position: 'insideBottom', 
                  offset: -30,
                  fontSize: 14
                }} 
              />
              <YAxis 
                label={{ 
                  value: 'Amount ($)', 
                  angle: -90, 
                  position: 'insideLeft',
                  fontSize: 14
                }} 
              />
              <Tooltip 
                formatter={(value) => [`$${value.toFixed(2)}`, value === value ? 'Paid Out' : 'Expected']}
              />
              <Legend 
                verticalAlign="top" 
                height={36}
                wrapperStyle={{ paddingBottom: 20 }}
              />
              <Bar dataKey="PaidOut" name="Paid Out" fill={COLORS[0]} />
              <Bar dataKey="Expected" name="Expected" fill={COLORS[1]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-500 mb-2">Total Earnings</h3>
          <p className="text-3xl font-bold text-gray-800">
            ${totals.total.toFixed(2)}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-500 mb-2">Total Paid Out</h3>
          <p className="text-3xl font-bold text-[#8884d8]">
            ${totals.paidOut.toFixed(2)}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-500 mb-2">Total Expected</h3>
          <p className="text-3xl font-bold text-[#82ca9d]">
            ${totals.expected.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Yearly Breakdown</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Year
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Paid Out
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Expected
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {chartData.map((row) => (
                <tr key={row.year}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {row.year}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${row.Total.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#8884d8]">
                    ${row.PaidOut.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#82ca9d]">
                    ${row.Expected.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default IndividualEarnings;