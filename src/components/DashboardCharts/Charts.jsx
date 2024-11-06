import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const Charts = () => {
  const [timeFrame, setTimeFrame] = useState("yearly"); // Track the selected time frame

  // Chart Data (update this based on `timeFrame` if needed)
  const data = {
    labels: [
      "يناير",
      "فبراير",
      "مارس",
      "أبريل",
      "مايو",
      "يونيو",
      "يوليو",
      "أغسطس",
      "سبتمبر",
      "أكتوبر",
      "نوفمبر",
      "ديسمبر",
    ],
    datasets: [
      {
        label: "عدد الزوار",
        data: [
          2000, 3000, 2500, 5201, 4000, 3900, 3950, 4200, 3000, 3500, 3100,
          4500,
        ],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "#4a90e2",

        borderWidth: 2,
        pointBackgroundColor: "#4a90e2",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#333",
        titleColor: "#fff",
        bodyColor: "#fff",
        callbacks: {
          label: function (context) {
            return `عدد الزوار ${context.raw}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return value / 1000 + "k";
          },
        },
      },
      x: {
        reverse: true,
      },
    },
  };

  return (
    <div
      dir="rtl"
      style={{
        maxWidth: "100%",
        margin: "0 auto",
        background: "white",
        borderRadius: "20px",
        marginTop: " 30px",
      }}
    >
      {/* Title */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <h2
          style={{
            fontSize: "1.5rem",
            color: "#333",
            fontWeight: "bold",
            fontFamily: " Cairo, sans-serif",
          }}
        >
          الزوار
        </h2>
        {/* Time Frame Tabs */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            backgroundColor: "#f7f8fc",
            padding: "20px 30px",
            borderRadius: "8px",
            fontFamily: " Cairo, sans-serif",
          }}
        >
          <button
            onClick={() => setTimeFrame("daily")}
            style={{
              backgroundColor:
                timeFrame === "daily" ? "#4a90e2" : "transparent",
              color: timeFrame === "daily" ? "#fff" : "#666",
              border: "none",
              borderRadius: "6px",
              padding: "5px 10px",
              cursor: "pointer",
            }}
          >
            يومي
          </button>
          <button
            onClick={() => setTimeFrame("weekly")}
            style={{
              backgroundColor:
                timeFrame === "weekly" ? "#4a90e2" : "transparent",
              color: timeFrame === "weekly" ? "#fff" : "#666",
              border: "none",
              borderRadius: "6px",
              padding: "5px 10px",
              cursor: "pointer",
            }}
          >
            أسبوعي
          </button>
          <button
            onClick={() => setTimeFrame("yearly")}
            style={{
              backgroundColor:
                timeFrame === "yearly" ? "#4a90e2" : "transparent",
              color: timeFrame === "yearly" ? "#fff" : "#666",
              border: "none",
              borderRadius: "6px",
              padding: "5px 10px",
              cursor: "pointer",
            }}
          >
            سنوي
          </button>
        </div>
      </div>
      {/* Chart */}
      <div className=" px-5 pb-5">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default Charts;
