// import React from 'react'
import "../Form.css";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import type { AuthorLogin, notification } from "../utils/Type";
import { LoginUser } from "../apis/User";
import Swal from "sweetalert2";

export default function Login() {
  const navigate = useNavigate();
  const [validate, setValidate] = useState<AuthorLogin>({
    email: "",
    password: "",
  });
  const [notification, setNotification] = useState<notification>({
    message: "",
    type: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate.email) {
      setNotification({ message: "Email không được để trống", type: "email" });
      return;
    }
    if (!validate.password) {
      setNotification({
        message: "Mật khẩu không được để trống",
        type: "password",
      });
      return;
    }
    const check = await LoginUser(validate.email, validate.password);
    if (check.data.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Tài Khoàn mật khẩu không chính xác!",
      });
      return;
    }

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Đăng nhập thành công!",
      showConfirmButton: false,
      timer: 1500,
    });
    if (check.data[0].role === "user") {
      console.log(check.data[0].role);
      navigate("/home");
    }
    if (check.data[0].role === "admin") {
      console.log(check.data[0].role);
      navigate("/catalogue");
    }
    console.log(check);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValidate({ ...validate, [e.target.name]: e.target.value });
  };
  return (
    <div className="login">
      <h1>Đăng Nhập</h1>
      <p>
        QuizForge – Nền tảng sáng tạo bài kiểm tra trực tuyến, giúp bạn dễ dàng
        thiết kế, chia sẻ và thực hiện các bài kiểm tra một cách nhanh chóng và
        hiệu quả!{" "}
      </p>
      <form action="" className="form">
        <div style={{ marginBottom: "24px" }}>
          <label>Email</label>
          <br />
          <input
            name="email"
            type="email"
            placeholder="Địa chỉ email"
            onChange={handleChange}
          />
          {notification.type === "email" && (
            <span className="text-red-600">{notification.message}</span>
          )}
          <br />
          <label>Mật khẩu</label>
          <br />
          <input
            name="password"
            type="password"
            placeholder="Mật khẩu"
            onChange={handleChange}
          />
          {notification.type === "password" && (
            <span className="text-red-600">
              <span>*</span>
              {notification.message}
            </span>
          )}
        </div>

        <button className="submit" onClick={handleSubmit}>
          Đăng nhập
        </button>

        <p className="footer-form">
          Đã có tài khoản?
          <Link className="text-[#0D6EFD] link" to="/">
            Đăng ký
          </Link>
          {/* <span>
            <a href="#">Đăng ký</a>
          </span> */}
        </p>
      </form>
    </div>
  );
}
