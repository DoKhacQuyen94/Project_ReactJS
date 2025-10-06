import React, { useEffect, useState } from "react";
import "../scss/table.scss";
import ModalAddEdit from "../components/ModalAddEdit";
import Table from "../components/Table";
import TitleManagement from "../components/TitleManagement";
import { useDispatch, useSelector } from "react-redux";
import { addCategory, getCategory } from "../store/redux/Category";
import type { RootState } from "../store/store";
import { getTest } from "../store/redux/Test";
import type { Test } from "../utils/Type";
export default function Management({
  type,
  props_type,
}: {
  type: string;
  props_type: (type: string) => void;
}) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    props_type(type);
  }, [type]);
  console.log("Trang:", type);
  const [sort, setSort] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const category = useSelector((data: RootState) => data.category.category);

  const test = useSelector((data: RootState) => data.test.test);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const ArrTest =
    sort === "name"
      ? [...test].sort((a: Test, b: Test) =>
          a.testName.localeCompare(b.testName)
        )
      : sort === "time"
      ? [...test].sort((a: Test, b: Test) => a.playTime - b.playTime)
      : test;
  const filteredTests: Test[] =
    search.trim() === ""
      ? ArrTest
      : ArrTest.filter((item: Test) =>
          item.testName.toLowerCase().includes(search.toLowerCase())
        );
  const dispatch: any = useDispatch();
  useEffect(() => {
    dispatch(getCategory());
    dispatch(getTest());
  }, []);
  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("sort:", e.target.value);
    setSort(e.target.value);
  };
  const handleAdd = (category: any) => {
    console.log("handle:", category);
    dispatch(addCategory(category));
  };
  return (
    <>
      {open && (
        <ModalAddEdit
          setOpen={setOpen}
          category={category}
          handleAdd={handleAdd}
        />
      )}
      <div className="p-[50px] max-w-6xl mx-auto">
        {/* Tiêu đề quản lý */}
        <TitleManagement type_management={type} />
        {/* Nút thêm danh mục */}
        <div className="flex justify-between ">
          {type == "catalogue" && (
            <button
              className="bg-[#0D6EFD] p-2 rounded-[6px] text-white text-[16px] mb-[20px]"
              onClick={() => setOpen(true)}
            >
              Thêm danh mục
            </button>
          )}
          {type == "test" && (
            <button
              className="bg-[#0D6EFD] p-2 rounded-[6px] text-white text-[16px] mb-[20px]"
              // onClick={() => setOpen(true)}
            >
              Thêm bài test
            </button>
          )}

          {type == "test" && (
            <div className="flex justify-center  gap-2">
              <select
                name=""
                id=""
                className="border w-[150px] h-[35px] rounded-[6px]"
                onChange={handleSort}
              >
                <option value="none">Sắp xếp theo</option>
                <option value="name">Tên</option>
                <option value="time">Thời gian chơi</option>
              </select>
              <input
                className="w-[200px] h-[35px] m-[0px]"
                type="text"
                placeholder="Tìm kiếm theo tên"
                onChange={handleSearch}
              />
            </div>
          )}
        </div>
        {/* Phần hiển thị bảng */}
        <Table
          type_management={type}
          category={category}
          test={type === "test" ? filteredTests : test}
        />
        {/* Phần phân trang */}
        <div className="flex justify-center items-center  mt-4">
          <button className="px-3 py-1 border rounded-l-lg text-gray-400 text-[16px] bg-gray-300">
            ‹
          </button>
          <button className="px-3 py-1 border  bg-blue-500 text-white">
            1
          </button>
          <button className="px-3 py-1 border  bg-white">2</button>
          <button className="px-3 py-1 border  bg-white">3</button>
          <button className="px-3 py-1 border rounded-r-lg bg-white">›</button>
        </div>
      </div>
    </>
  );
}
