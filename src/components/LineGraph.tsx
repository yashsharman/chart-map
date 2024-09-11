import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { ChartData, ChartOptions } from "chart.js";
import { useQuery } from "@tanstack/react-query";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Fetch cases data
const getCases = async () => {
  const response = await fetch("https://disease.sh/v3/covid-19/all");
  const data = await response.json(); // Parse the JSON response

  // Extract relevant fields into a new object
  const newObj = {
    active: data.active,
    cases: data.cases,
    critical: data.critical,
    deaths: data.deaths,
    recovered: data.recovered,
    tests: data.tests,
    todayRecovered: data.todayRecovered,
  };

  return newObj;
};

const LineGraph: React.FC = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["cases"],
    queryFn: getCases,
  });

  // While loading, show a loading state
  if (isLoading) return <div>Loading...</div>;

  // If there's an error, show an error state
  if (isError || !data) return <div>Error loading data</div>;

  // Define data with appropriate type
  const chartData: ChartData<"bar"> = {
    labels: Object.keys(data),
    datasets: [
      {
        label: "No of cases",
        data: Object.values(data),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Define options with appropriate type
  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "The Cases Fluctuations",
      },
    },
  };

  return (
    <div className="bg-white md:w-[30vw] w-full h-min p-4 rounded-sm mt-10">
      <Bar data={chartData} options={options} />;
    </div>
  );
};

export default LineGraph;
