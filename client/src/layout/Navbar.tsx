import { Link, NavLink } from "react-router-dom";

export default function Navbar({ type }: { type: string }) {
  console.log("Nav:", type);

  return (
    <div className="bg-black flex items-center justify-between p-2 w-full pl-[40px] pr-[40px]">
      <Link to={"/home"} className="logo text-white text-[25px]">
        QuizzForge
      </Link>
      {type == "home" && (
        <input
          type="text"
          placeholder="Tìm kiếm bài viết"
          className="w-[350px] h-[40px]"
        />
      )}

      <div className="flex gap-4 ">
        {type == "home" && (
          <NavLink to="/home" className="text-white">
            Trang chủ
          </NavLink>
        )}
        {type == "test" && (
          <>
            <NavLink to="/catalogue">Danh mục</NavLink>
            <NavLink to="/management-test">Bài test</NavLink>
          </>
        )}
        {type == "catalogue" && (
          <>
            <NavLink to="/catalogue">Danh mục</NavLink>
            <NavLink to="/management-test">Bài test</NavLink>
          </>
        )}

        <NavLink to="/" className="text-white ">
          Đăng xuất
        </NavLink>
      </div>
    </div>
  );
}
