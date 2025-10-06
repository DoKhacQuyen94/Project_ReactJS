import React, { useEffect, useState } from "react";
import type { category, notification } from "../utils/Type";

export default function ModalAddEdit({
  setOpen,
  category,
  handleAdd,
  initialData,
}: {
  category: category[];
  setOpen: (open: boolean) => void;
  handleAdd: (category: category) => void;
  initialData?: category | null;
}) {
  const [validate, setValidate] = useState({
    categoryName: initialData?.categoryName ?? "",
    categoryImg: initialData?.categoryImg ?? "",
  });
  const [notification, setNotification] = useState<notification>({
    message: "",
    type: "",
  });
  useEffect(() => {
    if (initialData) {
      setValidate({
        categoryName: initialData.categoryName,
        categoryImg: initialData.categoryImg,
      });
    }
  }, [initialData]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValidate({ ...validate, [e.target.name]: e.target.value });
  };
  const Add = (newCategory: category) => {
    if (newCategory?.id) {
      handleAdd(newCategory);
      setOpen(false);
    }
    if (
      category.filter(
        (item) =>
          item.categoryName.toLocaleLowerCase() ===
          validate.categoryName.toLocaleLowerCase()
      ).length > 0
    ) {
      setNotification({
        message: "Tên danh mục đã tồn tại",
        type: "categoryName",
      });
      return;
    }
    if (!validate.categoryName) {
      setNotification({
        message: "Không được để trống",
        type: "categoryName",
      });
      return;
    }
    if (!validate.categoryImg) {
      setNotification({
        message: "Không được để trống",
        type: "emoji",
      });
      return;
    }
    setNotification({
      message: "",
      type: "",
    });

    handleAdd(newCategory);
    setOpen(false);
  };
  return (
    <div className="modal-content">
      <div className="modal h-[334px]">
        <div className="header-modal flex justify-between items-center p-4 border-b border-gray-300">
          <h2 className=" text-[25px]">Thêm/sửa danh mục</h2>
          <span className="close text-[25px]" onClick={() => setOpen(false)}>
            &times;
          </span>
        </div>
        <div className="body-modal p-4">
          <label>Tên danh mục</label>
          <input
            name="categoryName"
            type="text"
            value={validate.categoryName}
            onChange={handleChange}
          />
          {notification.type == "categoryName" && (
            <span className="text-red-500">{notification.message}</span>
          )}
          <br />
          <label htmlFor="">Hành ảnh danh mục</label>
          <input
            name="categoryImg"
            type="text"
            value={validate.categoryImg}
            onChange={handleChange}
          />
          {notification.type == "emoji" && (
            <span className="text-red-500">{notification.message}</span>
          )}
        </div>
        <div className="footer-modal p-4 border-t border-gray-300 flex justify-end gap-2">
          <button
            className="bg-[#6c757d] p-2 rounded-[6px] text-white"
            onClick={() => setOpen(false)}
          >
            Hủy
          </button>
          <button
            className="bg-[#0D6EFD] p-2 rounded-[6px] text-white"
            onClick={() => {
              if (initialData?.id) {
                // Update
                Add({ id: initialData.id, ...validate });
              } else {
                // Add
                Add(validate);
              }
            }}
          >
            {initialData ? "Cập nhật" : "Lưu"}
          </button>
        </div>
      </div>
    </div>
  );
}
