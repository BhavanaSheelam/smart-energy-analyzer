import React, { useMemo } from "react";

function Recommendations({ appliances, totals }) {
  const suggestions = useMemo(() => {
    const list = [];

    if (Number(totals.dailyUsage) > 10) {
      list.push({
        title: "Reduce Peak Hour Usage",
        text: "Your daily consumption is high. Try to shift non-essential appliance usage to off-peak hours (10 PM - 6 AM) to save up to 20% on electricity costs."
      });
    }

    const highUse = appliances
      .filter((item) => Number(item.dailyKwh) >= 3)
      .sort((a, b) => Number(b.dailyKwh) - Number(a.dailyKwh));

    if (highUse.length > 0) {
      list.push({
        title: "Upgrade High-Consumption Appliances",
        text: `Consider replacing ${highUse[0].name} with an energy-efficient model. Modern appliances can reduce consumption by 30-40%.`
      });
    }

    list.push({
      title: "Minimize Standby Power",
      text: "Unplug devices when not in use or use smart power strips. Standby power can account for 5-10% of residential electricity use."
    });

    list.push({
      title: "Switch to LED Lighting",
      text: "LED bulbs use 75% less energy than incandescent bulbs and last 25 times longer. This simple change can significantly reduce your energy footprint."
    });

    return list;
  }, [appliances, totals.dailyUsage]);

  return (
    <div className="recommend-card" style={{ marginTop: "22px" }}>
      <h3>⚠ Smart Recommendations</h3>

      {suggestions.map((item, index) => (
        <div className="recommend-box" key={index}>
          <h4>{item.title}</h4>
          <p>{item.text}</p>
        </div>
      ))}
    </div>
  );
}

export default Recommendations;