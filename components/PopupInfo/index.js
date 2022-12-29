import Spinner from "../Spinner/index";
import Image from "next/image";
import React from "react";
import * as APICountries from "../../apis/country/index";

const PopUpInfo = ({ data, setIsOpen }) => {
  const [detailData, setDetailData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState();

  React.useEffect(() => {
    const timer = setTimeout(() => {
      fetchData();
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await APICountries.getDetailByCountryCode(data?.CountryCode);
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
                <Image
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
                    <text
                      className="fw600 mR8"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      {" "}
                      Thủ đô:
                    </text>
                    <text className="fw600 tAs">
                      {detailData[0]?.capital
                        ?.map((i, idx) => {
                          return i;
                        })
                        .join(", ")}
                    </text>
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
