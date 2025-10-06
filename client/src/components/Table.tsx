import { useState, useEffect } from "react";
import ModalDelete from "./ModalDelete";
import type { category, Test } from "../utils/Type";
import { useDispatch } from "react-redux";
import { deleteCategory, editCategory } from "../store/redux/Category";
import Swal from "sweetalert2";
import ModalAddEdit from "./ModalAddEdit";
import { deleteTest } from "../store/redux/Test";

export default function Table({
  type_management,
  category,
  test,
}: {
  category: category[];
  test: Test[];
  type_management: string;
}) {
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [editingItem, setEditingItem] = useState<category | null>(null);
  const [openAddEdit, setOpenAddEdit] = useState(false);
  const dispatch: any = useDispatch();

  useEffect(() => {
    setOpen(false);
    setSelectedId(null);
    setOpenAddEdit(false);
    setEditingItem(null);
  }, [type_management]);
  console.log(category);

  const handleDeleteClickCategory = (id: number) => {
    setSelectedId(id);
    setOpen(true);
  };

  const handleDeleteClickTest = (id: number) => {
    setSelectedId(id);
    setOpen(true);
  };

  const confirmDeleteCategory = () => {
    if (selectedId !== null) {
      dispatch(deleteCategory(selectedId));
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Xóa danh mục thành công!",
        showConfirmButton: false,
        timer: 1500,
      });
      setSelectedId(null);
      setOpen(false);
    }
  };

  const confirmDeleteTest = () => {
    if (selectedId !== null) {
      dispatch(deleteTest(selectedId));
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Xóa bài test thành công!",
        showConfirmButton: false,
        timer: 1500,
      });
      setSelectedId(null);
      setOpen(false);
    }
  };

  return (
    <>
      {open && (
        <ModalDelete
          setDelete={setOpen}
          onConfirm={confirmDeleteCategory}
          confirmTest={confirmDeleteTest}
          type={type_management}
        />
      )}

      {openAddEdit && type_management === "catalogue" && (
        <ModalAddEdit
          setOpen={setOpenAddEdit}
          category={category}
          handleAdd={(data: category) => {
            if (data.id) {
              dispatch(editCategory(data));
            }
          }}
          initialData={editingItem}
        />
      )}

      <table key={type_management} className="w-full border border-gray-300">
        <thead>
          <tr className="bg-[#212529] text-white text-[14.7px] rounded-[6px] border-inherit">
            {type_management === "catalogue" && (
              <>
                <th className="text-center w-[15%]">ID</th>
                <th className="p-2 w-[55%]">Tên danh mục</th>
              </>
            )}
            {type_management === "test" && (
              <>
                <th className="text-center w-[4%]">ID</th>
                <th className="p-2 w-[30%]">Tên bài test</th>
                <th className="p-2 w-[15%]">Danh mục</th>
                <th className="p-2 w-[20%]">Số câu hỏi</th>
                <th className="p-2 w-[15%]">Thời gian</th>
              </>
            )}
            <th className="text-center w-[35%]">Hành động</th>
          </tr>
        </thead>

        <tbody>
          {type_management === "catalogue" &&
            category.map((item) => (
              <tr key={item.id} className="border border-[#DEE2E6] text-[14px]">
                <td className="text-center">{item.id}</td>
                <td className="text-left">
                  <div className="flex items-center gap-2 p-2 w-full">
                    <span className="rounded-full w-[40px] h-[40px] flex justify-center items-center bg-gray-300">
                      {item.categoryImg}
                    </span>
                    <span>{item.categoryName}</span>
                  </div>
                </td>
                <td className="text-center space-x-2">
                  <button
                    className="bg-[#FFC107] p-2 rounded-[4px]"
                    onClick={() => {
                      setEditingItem(item);
                      setOpenAddEdit(true);
                    }}
                  >
                    Sửa
                  </button>
                  <button
                    className="bg-[#DC3545] p-2 rounded-[4px] text-white"
                    onClick={() => {
                      if (item?.id) {
                        handleDeleteClickCategory(item.id);
                      }
                    }}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}

          {type_management === "test" &&
            test.map((item) => {
              const cate = category.find((c) => c.id === item.categoryId);
              return (
                <tr
                  key={item.id}
                  className="border border-[#DEE2E6] text-[14px]"
                >
                  <td className="text-center">{item.id}</td>
                  <td className="p-2">{item.testName}</td>
                  <td>
                    <div className="flex items-center gap-2 p-2">
                      <span className="rounded-full w-[40px] h-[40px] flex justify-center items-center bg-gray-300">
                        {cate?.categoryImg}
                      </span>
                      <span>{cate?.categoryName}</span>
                    </div>
                  </td>
                  <td className="p-2">{item.playAmount}</td>
                  <td className="p-2">{item.playTime} min</td>
                  <td className="text-center space-x-2">
                    <button className="bg-[#FFC107] p-2 rounded-[4px]">
                      Sửa
                    </button>
                    <button
                      className="bg-[#DC3545] p-2 rounded-[4px] text-white"
                      onClick={() => handleDeleteClickTest(item.id)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
}
