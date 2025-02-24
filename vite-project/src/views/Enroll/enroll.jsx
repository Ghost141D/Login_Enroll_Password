import { Button, Form, Input, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../../redux/authSlice";
import "./enroll.scss";

export default function Enroll() {
  const [form] = Form.useForm();
  const [countdown, setCountdown] = useState(0);
  const [canSendCode, setCanSendCode] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [countdown]);

  const sendVerificationCode = () => {
    if (countdown === 0) {
      setCountdown(30);
      message.success("验证码已发送！");
    }
  };

  const handlePhoneChange = (e) => {
    const phone = e.target.value;
    const phoneReg = /^1[3-9]\d{9}$/;
    setCanSendCode(phoneReg.test(phone));
  };

  const onFinish = (values) => {
    console.log("注册成功:", values);
    // 存储到 Redux
    dispatch(loginSuccess(values));
    // 存储到 localStorage
    localStorage.setItem("user", JSON.stringify(values));
    message.success("注册成功！");
  };
  // 表单验证失败时的处理
  const onFinishFailed = (errorInfo) => {
    console.log("注册失败:", errorInfo);
    message.error("请检查表单输入！");
  };
  // 切换到忘记密码模块
  const handleForgetPassword = () => {
    navigate("/password");
  };
  // 切换到登录模块
  const handleLogin = () => {
    navigate("/");
  };

  return (
    <div className="enroll">
      <div className="content">
        <h3>快速注册</h3>
        <Form
          form={form}
          name="enroll"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 12 }}
          style={{ maxWidth: 600 }}
          initialValues={{
            username: "",
            phone: "",
            password: "",
            verificationCode: "",
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label={null}
            name="username"
            rules={[
              { required: true, message: "请输入用户名!" },
              {
                pattern: /^[a-zA-Z0-9]{1,6}$/,
                message: "用户名不超过6位,且只能为字母或数字!",
              },
            ]}
          >
            <Input
              placeholder="请输入用户名"
              style={{ width: "250px", marginLeft: "-20px" }}
            />
          </Form.Item>

          <Form.Item
            label={null}
            name="phone"
            rules={[
              { required: true, message: "请输入手机号!" },
              {
                pattern: /^1[3-9]\d{9}$/,
                message: "手机号格式不正确!",
              },
            ]}
          >
            <Input
              placeholder="请输入手机号"
              onChange={handlePhoneChange}
              style={{ width: "250px", marginLeft: "-20px" }}
            />
          </Form.Item>
          <Form.Item
            label={null}
            name="verificationCode"
            rules={[{ required: true, message: "请输入验证码!" }]}
          >
            <div className="verification_container">
              <Input
                placeholder="请输入验证码"
                maxLength={6}
              />
              <Button
                type="primary"
                onClick={sendVerificationCode}
                disabled={!canSendCode || countdown > 0}
              >
                {countdown > 0 ? `${countdown}s 后重新发送` : "发送验证码"}
              </Button>
            </div>
          </Form.Item>

          <Form.Item
            label={null}
            name="password"
            rules={[
              { required: true, message: "请输入密码!" },
              {
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                message:
                  "密码至少6位,包含至少1个大写字母、1个小写字母、1个数字和1个特殊字符!",
              },
            ]}
          >
            <Input.Password
              placeholder="请输入密码"
              style={{ width: "250px", marginLeft: "-20px" }}
            />
          </Form.Item>

          <Form.Item label={null}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: "250px", marginLeft: "-20px",fontFamily:'宋体'}}
            >
              立即注册
            </Button>
          </Form.Item>
        </Form>
        <div className="switch">
          <Button type="link" onClick={handleForgetPassword}>
            忘记密码
          </Button>
          <span className="text">已有账号？</span>
          <Button type="link" onClick={handleLogin}>
            马上登录
          </Button>
        </div>
      </div>
    </div>
  );
}
