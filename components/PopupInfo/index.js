import Spinner from "components/Spinner";
import React from "react";
import * as APICountries from "../../apis/country/index";

const PopUpInfo = ({ data, setIsOpen }) => {
  const [detailData, setDetailData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState();

  React.useEffect(() => {
    setTimeout(() => {
      fetchData();
    }, 3000);
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await APICountries.getDetailByCountryCode(data?.CountryCode);
      console.log(res);
      setDetailData(res);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="darkBG" onClick={() => setIsOpen(false)} />
      <div className="centered">
        <div className="modal">
          <div className="modalHeader">
            <h5 className="heading fw600">Chi tiết</h5>
          </div>
          <button className="closeBtn" onClick={() => setIsOpen(false)}>
            x
          </button>
          {!isLoading && !detailData?.length && (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Spinner />
            </div>
          )}
          {detailData?.length > 0 && (
            <div className="modalContent">
              <div className="mR16">
                <img
                  width="190px"
                  height="100px"
                  style={{ border: "1px solid #D9D9D9" }}
                  src={detailData[0]?.flags?.png || detailData[0]?.flags?.svg}
                  alt={detailData[0]?.name?.common}
                />
              </div>
              <div>
                <h2 className="fw600 tAs  mB8">
                  {detailData[0]?.name?.common}
                </h2>
                <div className="col">
                  <div className="row mB8">
                    <text className="fw600 mR8"> Thủ đô:</text>
                    {detailData[0]?.capital?.map((i, idx) => {
                      return (
                        <text className="fw600" key={idx}>
                          {i}
                        </text>
                      );
                    })}
                  </div>
                  <div className="row mB8">
                    <text className="fw600 mR8 "> Vùng:</text>
                    <text className="fw600">{detailData[0]?.region}</text>
                  </div>
                  <div className="row mB8">
                    <text className="fw600 mR8 ">Tiểu vùng:</text>
                    <text className="fw600">{detailData[0]?.subregion}</text>
                  </div>
                  <div className="row">
                    <text className="fw600 mR8 "> Dân số:</text>
                    <text className="fw600">{detailData[0]?.population}</text>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="modalActions">
            <button className="cancelBtn" onClick={() => setIsOpen(false)}>
              Thoát
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const areEqual = (p, n) => {
  return p === n;
};
export default React.memo(PopUpInfo, areEqual);
