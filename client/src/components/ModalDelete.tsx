export default function ModalDelete({
  setDelete,
  onConfirm,
  confirmTest,
  type,
}: {
  type: string;
  onConfirm: () => void;
  confirmTest: () => void;
  setDelete: (open: boolean) => void;
}) {
  return (
    <div className="modal-content">
      <div className="modal h-[200px]">
        <div className="header-modal flex justify-between items-center p-4 border-b border-gray-300">
          <h2 className=" text-[25px]">Xác nhận xóa</h2>
          <span className="close text-[25px]" onClick={() => setDelete(false)}>
            &times;
          </span>
        </div>

        <div className="body-modal p-4">
          <span>Bạn có xác nhận xóa bài test này</span>
        </div>
        <div className="footer-modal p-4 border-t border-gray-300 flex justify-end gap-2">
          <button
            className="bg-[#6c757d] p-2 rounded-[6px] text-white"
            onClick={() => setDelete(false)}
          >
            Hủy
          </button>
          {type === "catalogue" && (
            <button
              className="bg-[#DC3545] p-2 rounded-[6px] text-white"
              onClick={onConfirm}
            >
              Xóa
            </button>
          )}
          {type === "test" && (
            <button
              className="bg-[#DC3545] p-2 rounded-[6px] text-white"
              onClick={confirmTest}
            >
              Xóa
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
