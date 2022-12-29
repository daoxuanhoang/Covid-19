import React from "react";
import * as APICountries from "../../apis/country";
import Spinner from "../spinner";

const StatisticWorld = () => {
  const [data, setData] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      fetchData();
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await APICountries.getCountries();
      setData(res);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="card" style={{ marginBottom: "16px" }}>
      <h2 className="mB32">Toàn thế giới</h2>
      <div className="flex mB16">
        <div className="pd8 flex1" style={{ borderRight: "1px solid #5f6368" }}>
          <text>Tổng số ca nhiễm</text>
          <div className="fs26 fw500">{data?.Global?.TotalConfirmed}</div>
        </div>
        <div className="pd8 flex1" style={{ borderRight: "1px solid #5f6368" }}>
          <text>Tổng số tử vong</text>
          <div className="fs26 fw500">{data?.Global?.TotalDeaths}</div>
        </div>
        <div className="pd8 flex1">
          <text>Tổng số ca hồi phục</text>
          <div className="fs26 fw500">{data?.Global?.TotalRecovered}</div>
        </div>
      </div>
      <div className="mB16" style={{ borderTop: "1px solid #dadce0 " }}></div>
      <div className="flex ">
        <div className="pd8 flex1" style={{ borderRight: "1px solid #5f6368" }}>
          <text>Số ca nhiễm mới</text>
          <div className="fs26 fw500">{data?.Global?.NewConfirmed}</div>
        </div>
        <div className="pd8 flex1" style={{ borderRight: "1px solid #5f6368" }}>
          <text>Số ca tử vong mới</text>
          <div className="fs26 fw500">{data?.Global?.NewDeaths}</div>
        </div>
        <div className="pd8 flex1">
          <text>Số ca hồi phục mới</text>
          <div className="fs26 fw500">{data?.Global?.NewRecovered}</div>
        </div>
      </div>
    </div>
  );
};
const areEqual = (p, n) => {
  return p === n;
};
export default React.memo(StatisticWorld, areEqual);
