import { useWindowDimensions } from "constants/helpers";
import React, { useRef } from "react";
import ReactPaginate from "react-paginate";
import PopupInfo from "../PopupInfo";
import Spinner from "../spinner";
import * as APICountries from "./../../apis/country";

const TableCountries = () => {
  const [countries, setCountries] = React.useState({});
  const { width } = useWindowDimensions();
  const [page, setPage] = React.useState(1);
  const [isOpen, setIsOpen] = React.useState(false);
  const [showModal, setShowModal] = React.useState(null);
  const [sortBy, setSortBy] = React.useState("1");
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
      setCountries(res);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const Sort = (cur, next) => {
    if (+sortBy === 1)
      return cur?.TotalConfirmed < next?.TotalConfirmed ? 1 : -1;
    if (+sortBy === 2) return cur?.TotalDeaths < next?.TotalDeaths ? 1 : -1;
    return cur?.TotalRecovered > next?.TotalRecovered ? 1 : -1;
  };

  const dataSort =
    countries?.Countries && [...countries?.Countries]?.sort(Sort);

  const perPage = 10;
  const total = countries?.Countries?.length;
  const data = dataSort?.slice((page - 1) * perPage, page * perPage);

  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
    setIsLoading(false);
  };

  const handleChange = ({ target }) => {
    setSortBy(target.value);
    setIsLoading(false);
  };

  const handleClick = (id) => {
    setShowModal(id);
    setIsOpen(true);
  };

  if (!isLoading && !data?.length) {
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Spinner />
      </div>
    );
  }

  return (
    <>
      {data?.length > 0 && (
        <div className="card">
          <h2 className="mB32">Số liệu thống kê</h2>
          <select name="sortBy" onChange={handleChange} className="mB8 pd8">
            <option value={1}>Số ca nhiễm nhiều nhất</option>
            <option value={2}>Số ca tử vong nhiều nhất</option>
            <option value={3}>Số ca phục hồi ít nhất</option>
          </select>
          <div style={{ overflowX: "auto" }}>
            <table
              style={{ width: width > 900 ? "100%" : "150%", borderSpacing: 0 }}
            >
              <thead>
                <tr>
                  <th className="pd8 tAs sticky-col first-col">Quốc gia</th>
                  <th className="pd8 tAc">Tổng số ca nhiễm</th>
                  <th className="pd8 tAc">Số ca nhiễm mới</th>
                  <th className="pd8 tAc">Số ca tử vong mới</th>
                  <th className="pd8 tAc">Số ca tử hồi phục mới</th>
                  <th className="pd8 tAc">Tổng số ca hồi phục</th>
                  <th className="pd8 tAc">Tổng số ca tử vong</th>
                </tr>
              </thead>

              <tbody style={{ height: "500px", overflowY: "auto" }}>
                {data?.map((i, idx) => {
                  return (
                    <>
                      <tr key={idx} className="tableRow">
                        <td
                          className="pd8 cursor borB sticky-col first-col textDecoration"
                          onClick={() => handleClick(i?.ID)}
                        >
                          {i?.Country}
                        </td>
                        <td className="pd8 tAc borB">{i?.TotalConfirmed}</td>
                        <td className="pd8 tAc borB">{i?.NewConfirmed}</td>
                        <td className="pd8 tAc borB">{i?.NewDeaths}</td>
                        <td className="pd8 tAc borB">{i?.NewRecovered}</td>
                        <td className="pd8 tAc borB">{i?.TotalRecovered}</td>
                        <td className="pd8 tAc borB">{i?.TotalDeaths}</td>
                      </tr>
                      {showModal === i?.ID && isOpen && (
                        <PopupInfo data={i} setIsOpen={setIsOpen} />
                      )}
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>

          {total > 10 && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "16px",
              }}
            >
              <ReactPaginate
                initialPage={0}
                previousLabel={"<"}
                nextLabel={">"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={Math.ceil(total / 10)}
                marginPagesDisplayed={0}
                pageRangeDisplayed={4}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                activeClassName={"active"}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};
const areEqual = (p, n) => {
  return p === n;
};
export default React.memo(TableCountries, areEqual);
