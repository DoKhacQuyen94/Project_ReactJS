export default function TitleManagement({
  type_management,
}: {
  type_management: string;
}) {
  return (
    <div>
      {" "}
      {type_management === "catalogue" && (
        <h2 className="text-[31.01px] text-[#212529] mb-[20px] ">
          Quản lý danh mục
        </h2>
      )}
      {type_management === "test" && (
        <h2 className="text-[31.01px] text-[#212529] mb-[20px] ">
          Quản lý bài test
        </h2>
      )}
    </div>
  );
}
