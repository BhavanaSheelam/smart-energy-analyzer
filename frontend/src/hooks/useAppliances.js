import { useEffect, useMemo, useState } from "react";
import API from "../services/api";

function useAppliances() {
  const [appliances, setAppliances] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppliances = async () => {
    try {
      const { data } = await API.get("/appliances");
      setAppliances(data);
    } catch (error) {
      console.log("Fetch appliance error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppliances();
  }, []);

  const totals = useMemo(() => {
    const dailyUsage = appliances.reduce(
      (sum, item) => sum + Number(item.dailyKwh || 0),
      0
    );

    const monthlyBill = appliances.reduce(
      (sum, item) => sum + Number(item.monthlyCost || 0),
      0
    );

    const potentialSavings = monthlyBill * 0.35;
    const co2 = dailyUsage * 30 * 0.82;

    return {
      dailyUsage: dailyUsage.toFixed(2),
      monthlyBill: monthlyBill.toFixed(2),
      potentialSavings: potentialSavings.toFixed(2),
      co2: co2.toFixed(0)
    };
  }, [appliances]);

  return {
    appliances,
    setAppliances,
    loading,
    totals,
    
  };
}

export default useAppliances;