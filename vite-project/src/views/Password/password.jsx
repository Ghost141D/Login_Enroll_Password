import { Button, Form, Input, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../../redux/authSlice";
import "./password.scss";

export default function Password() {

  const [form] = Form.useForm();
  const [countdown, setCountdown] = useState(0); 
  const [canSendCode, setCanSendCode] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    console.log("修改密码成功:", values);
    // 存储到 Redux
    dispatch(loginSuccess(values));
    // 存储到 localStorage
    localStorage.setItem("user", JSON.stringify(values));
    // 提示修改密码成功
    message.success("密码修改成功！");
  };

  // 表单验证失败时处理
  const onFinishFailed = (errorInfo) => {
    console.log("修改密码失败:", errorInfo);
    message.error("请检查表单输入！");
  };
  // 切换到注册模块
  const handleEnroll = () => {
    navigate("/enroll");
  };
  // 切换到登录模块
  const handleLogin = () => {
    navigate("/");
  };

  return (
    <div className="password">
      <div className="content">
        <h3>忘记密码</h3>
        <Form
          form={form}
          name="password"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 12 }}
          style={{ maxWidth: 600 }}
          initialValues={{
            phone: "",
            newPassword: "",
            verificationCode: "",
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
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
            name="newPassword"
            rules={[
              { required: true, message: "请输入新密码!" },
              {
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                message:
                  "密码至少6位,包含至少1个大写字母、1个小写字母、1个数字和1个特殊字符!",
              },
            ]}
          >
            <Input.Password
              placeholder="请输入新密码"
              style={{ width: "250px", marginLeft: "-20px" }}
            />
          </Form.Item>

          <Form.Item
            label={null}
            name="verificationCode"
            rules={[{ required: true, message: "请输入验证码!" }]}
          >
            <div className="verification_container">
              <Input placeholder="请输入验证码" maxLength={6} />
              <Button
                type="primary"
                onClick={sendVerificationCode}
                disabled={!canSendCode || countdown > 0}
              >
                {countdown > 0 ? `${countdown}s 后重新发送` : "发送验证码"}
              </Button>
            </div>
          </Form.Item>

          <Form.Item label={null}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: "250px", marginLeft: "-20px",fontFamily:'宋体'}}
            >
              确定
            </Button>
          </Form.Item>
        </Form>

        <div className="switch">
          <Button type="link" onClick={handleLogin}>
            立刻登录
          </Button>
          <span className="text" >没有账号？</span>
          <Button type="link" onClick={handleEnroll}>
            快速注册
          </Button>
        </div>
      </div>
    </div>
  );
}
