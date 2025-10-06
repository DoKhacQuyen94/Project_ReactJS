// import React from 'react'
import "../Form.css";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import type { AuthorRegister, notification } from "../utils/Type";
import { useState } from "react";
import { addUser, CheckEmail } from "../apis/User";
import Swal from "sweetalert2";
export default function Register() {
  const navigate = useNavigate();
  const [validate, setValidate] = useState<AuthorRegister>({
    email: "",
    password: "",
    fullName: "",
    comfirmPassword: "",
  });
  const [notification, setNotification] = useState<notification>({
    message: "",
    type: "",
  });
  const isValidEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValidate({ ...validate, [e.target.name]: e.target.value });
    // console.log(validate);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(validate.email);

    const check = await CheckEmail(validate.email);

    if (!validate.fullName) {
      setNotification({
        message: "Họ và tên không được để trống",
        type: "fullName",
      });
      return;
    }
    if (!validate.email) {
      setNotification({ message: "Email không được để trống", type: "email" });
      return;
    }
    if (!isValidEmail(validate.email)) {
      setNotification({ message: "Email không đúng định dạng", type: "email" });
      return;
    }
    if (check.data.length > 0) {
      setNotification({ message: "Email đã được sử dụng", type: "email" });
      return;
    }
    if (!validate.password) {
      setNotification({
        message: "Mật khẩu không được để trống",
        type: "password",
      });
      return;
    }
    if (validate.password.length < 8) {
      setNotification({
        message: "Mật khẩu phải từ 8 ký tự trở lên",
        type: "password",
      });
      return;
    }
    if (validate.password !== validate.comfirmPassword) {
      setNotification({
        message: "Mật khẩu xác nhận không khớp",
        type: "comfirmPassword",
      });
      return;
    }
    addUser(validate);
    setValidate({
      email: "",
      password: "",
      fullName: "",
      comfirmPassword: "",
    });
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Đăng ký thành công!",
      showConfirmButton: false,
      timer: 1500,
    });
    navigate("/login");
  };
  return (
    <div className="register">
      <h1>Đăng Ký</h1>
      <p>
        QuizForge – Nền tảng sáng tạo bài kiểm tra trực tuyến, giúp bạn dễ dàng
        thiết kế, chia sẻ và thực hiện các bài kiểm tra một cách nhanh chóng và
        hiệu quả!{" "}
      </p>
      <form action="" className="form">
        <div style={{ marginBottom: "24px" }}>
          <input
            type="text"
            placeholder="Họ và tên"
            onChange={handleChange}
            name="fullName"
          />
          {notification.type === "fullName" && (
            <span className="text-red-600">
              <span>*</span>
              {notification.message}
            </span>
          )}
          <br />
          <input
            type="email"
            placeholder="Địa chỉ email"
            name="email"
            onChange={handleChange}
          />
          {notification.type === "email" && (
            <span className="text-red-600">
              <span>*</span>
              {notification.message}
            </span>
          )}
          <br />
          <input
            type="password"
            placeholder="Mật khẩu"
            name="password"
            onChange={handleChange}
          />
          {notification.type === "password" && (
            <span className="text-red-600">
              <span>*</span>
              {notification.message}
            </span>
          )}
          <br />

          <input
            type="password"
            placeholder="Xác nhận mật khẩu"
            name="comfirmPassword"
            onChange={handleChange}
          />
          {notification.type === "comfirmPassword" && (
            <span className="text-red-600">
              <span>*</span>
              {notification.message}
            </span>
          )}
          <br />
        </div>

        <button className="submit" onClick={handleSubmit}>
          Đăng Ký{" "}
        </button>

        <p className="footer-form">
          Đã có tài khoản?
          <Link to="/login" className="link text-[#0D6EFD]">
            Đăng nhập
          </Link>
          {/* <span>
            <a href="#">Đăng nhập</a>
          </span> */}
        </p>
      </form>
    </div>
  );
}
