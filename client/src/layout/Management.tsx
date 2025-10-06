import { useEffect, useState } from "react";
import "../scss/table.scss";
import ModalAddEdit from "../components/ModalAddEdit";
import Table from "../components/Table";
import TitleManagement from "../components/TitleManagement";
import { useDispatch, useSelector } from "react-redux";
import { addCategory, getCategory } from "../store/redux/Category";
import type { RootState } from "../store/store";
import { getTest } from "../store/redux/Test";
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

  const category = useSelector((data: RootState) => data.category.category);

  const test = useSelector((data: RootState) => data.test.test);

  const dispatch: any = useDispatch();
  useEffect(() => {
    dispatch(getCategory());
    dispatch(getTest());
  }, []);
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
      <div className="p-[50px]">
        {/* Tiêu đề quản lý */}
        <TitleManagement type_management={type} />
        {/* Nút thêm danh mục */}
        <div className="flex justify-between ">
          <button
            className="bg-[#0D6EFD] p-2 rounded-[6px] text-white text-[16px] mb-[20px]"
            onClick={() => setOpen(true)}
          >
            Thêm danh mục
          </button>

          {type == "test" && (
            <div className="flex justify-center  gap-2">
              <select
                name=""
                id=""
                className="border w-[150px] h-[35px] rounded-[6px]"
              >
                <option value="none">Sắp xếp theo</option>
              </select>
              <input
                className="w-[200px] h-[35px] m-[0px]"
                type="text"
                placeholder="Tìm kiếm theo tên"
              />
            </div>
          )}
        </div>
        {/* Phần hiển thị bảng */}
        <Table type_management={type} category={category} test={test} />
        {/* Phần phân trang */}
        <div className="page flex justify-center items-center ">
          <div className="flex items-center justify-around w-[150px] mt-[20px] border rounded-[6px] ">
            <div className="prev text-[20px]">&lt;</div>
            <div className="number-page flex justify-between items-center text-center ">
              <div className="number border-r-[1px] border-l-[1px] active">
                1
              </div>
              <div className="number border-r-[1px]">2</div>
              <div className="number border-r-[1px]">3</div>
            </div>
            <div className="next">&gt;</div>
          </div>
        </div>
      </div>
    </>
  );
}
