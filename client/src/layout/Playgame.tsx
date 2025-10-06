// import { NavLink } from "react-router-dom";

export default function Playgame() {
  return (
    <div className="bg-[#4A3DB5] w-full h-[100%] flex-col justify-center items-center p-4 text-center">
      <h2 className="text-white mb-[20px] text-[29px]">
        Hãy thử 1 bài kiểm tra ngẫu nhiên
      </h2>
      {/* <NavLink ></NavLink> */}
      <a href="#" className="bg-[#FFC107] text-black p-2 rounded-md  ">
        Play
      </a>
    </div>
  );
}
