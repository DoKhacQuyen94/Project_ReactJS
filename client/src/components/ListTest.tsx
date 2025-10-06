import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTest } from "../store/redux/Test";
import type { Test } from "../utils/Type";

export default function ListTest() {
  const dispatch: any = useDispatch();
  const listTest: Test[] = useSelector((data: any) => data.test.test || []);
  const [sort, setSort] = useState<"tang" | "giam" | "none">("none");
  const [listData, setListData] = useState<Test[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6; // số phần tử mỗi trang

  useEffect(() => {
    dispatch(getTest());
  }, [dispatch]);

  useEffect(() => {
    if (listTest.length > 0) setListData(listTest);
  }, [listTest]);

  const handleSort = (sort_type: "tang" | "giam") => {
    setSort(sort_type);
    if (sort_type === "tang") {
      setListData([...listTest].sort((a, b) => a.Total - b.Total));
    } else if (sort_type === "giam") {
      setListData([...listTest].sort((a, b) => b.Total - a.Total));
    }
    setCurrentPage(1); // reset về trang đầu khi sắp xếp
  };

  // nếu chưa sắp xếp thì lấy dữ liệu gốc
  const displayList = sort === "none" ? listTest : listData;

  // === Tính phân trang ===
  const totalPages = Math.ceil(displayList.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  let currentItems = displayList.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="bg-white w-[100%] min-h-[70vh] max-h-[100vh] max-w-6xl mb-[20px]">
      <div className="text-center">
        <h2 className="text-[25px]">⭐ Các Bài kiểm tra nổi bật</h2>
      </div>

      <div className="ml-[40px]">
        <div className="sort mt-[20px] flex gap-2 items-center mb-4">
          <label className="p-0">Sắp xếp theo: </label>
          <button
            className={
              sort === "tang"
                ? "border-solid border border-black border-spacing-1 rounded-[6px] p-1 bg-[#FFF3CD]"
                : "border-solid border border-black border-spacing-1 rounded-[6px] p-1 hover:bg-[#FFF3CD]"
            }
            onClick={() => handleSort("tang")}
          >
            Lượt chơi tăng dần
          </button>
          <button
            className={
              sort === "giam"
                ? "border-solid border border-black border-spacing-1 rounded-[6px] p-1 bg-[#FFF3CD] "
                : "border-solid border border-black border-spacing-1 rounded-[6px] p-1 hover:bg-[#FFF3CD]"
            }
            onClick={() => handleSort("giam")}
          >
            Lượt chơi giảm dần
          </button>
        </div>

        {/* List item */}
        <div className="list-test flex gap-3 flex-wrap ">
          {currentItems.length > 0 ? (
            currentItems.map((item: Test) => (
              <div
                key={item.id}
                className="item bg-white-400 border rounded-[6px] w-[45%] p-4 flex justify-between items-center hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
              >
                <img
                  src="../../public/image_list.png"
                  alt=""
                  className="w-[100px] h-[100px]"
                />

                <div className="content w-[350px] p-2 flex-col justify-center text-center">
                  <p>{item.testName}</p>
                  <h2 className="font-bold">Thách thức sự hiểu biết của bạn</h2>
                  <p>
                    {Array.isArray(item.questions)
                      ? item.questions.length
                      : item.questions
                      ? Object.keys(item.questions).length
                      : 0}{" "}
                    câu hỏi - {item.Total} lượt chơi
                  </p>
                </div>

                <div className="text-right h-[100px] flex flex-col justify-end">
                  <button className="bg-orange-300 p-2 rounded-[6px] hover:bg-orange-400 transition-colors">
                    Chơi
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-gray-500 text-center w-full py-10">
              Không có bài test nào.
            </div>
          )}
        </div>

        {/* Phân trang */}
        <div className="flex justify-center items-center mt-4 ">
          <button
            className="px-3 py-1 border rounded-l-lg text-gray-600 bg-gray-200 hover:bg-gray-300"
            onClick={() => handlePageChange(currentPage - 1)}
          >
            ‹
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`px-3 py-1 border ${
                currentPage === i + 1
                  ? "bg-blue-500 text-white border-blue-500 "
                  : "bg-white hover:bg-gray-100"
              }`}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            className="px-3 py-1 border rounded-r-lg text-gray-600 bg-gray-200 hover:bg-gray-300"
            onClick={() => handlePageChange(currentPage + 1)}
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}
