import { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Loading from "../../components/Loading";
import { AuthContext } from "../../provider/AuthProvider";

const IndividualEarnings = () => {
  const { allEarning } = useContext(AuthContext);
  const { name } = useParams(); // Using name instead of id
  const navigate = useNavigate();

  // Find the selectedEarning based on the 'name'
  const selectedEarning = allEarning.find((item) => item.name === name);

  if (!selectedEarning) {
    // Render a message when matching data is not found
    return (
      <div>
        <Loading/>
      </div>
    );
  }

  // Prepare data for the StackedBarChart
  const data = Object.entries(selectedEarning.earnings).map(([year, amount]) => ({
    name: year,
    PaidOut: amount * 0.8, // Assuming 80% of the earnings are paid out
    Expected: amount * 0.2, // Assuming 20% of the earnings are expected to be paid out
  }));

  // Calculate total amounts for 'PaidOut' and 'Expected'
  const totalPaidOut = data.reduce((sum, entry) => sum + entry.PaidOut, 0);
  const totalExpected = data.reduce((sum, entry) => sum + entry.Expected, 0);

  const handleGoBack = () => {
    // Use react-router-dom's navigate to go back
    navigate(-1);
  };

  return (
    <div className="container mx-auto my-5">
      <div className="my-10 ml-5">
        {/* Button to go back */}
        <button className="btn btn-sm bg-slate-100" onClick={handleGoBack}><FaArrowLeft /></button>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="md:w-8/12 w-full">
          {/* StackedBarChart */}
          <ResponsiveContainer width="90%" height={300}>
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 20, // Increased bottom margin for the label
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="PaidOut" stackId="a" fill="#8884d8" />
              <Bar dataKey="Expected" stackId="a" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        {/* Total amount display */}
        <div className="md:flex gap-5 mt-4">
          <h2 className="text-2xl font-semibold ">
            Total Paid Out: <span className="text-[#8884d8]">${totalPaidOut.toFixed(2)}</span>
          </h2>
          <h2 className="text-2xl font-semibold ">
            Total Expected: <span className="text-[#82ca9d]">${totalExpected.toFixed(2)}</span>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default IndividualEarnings;