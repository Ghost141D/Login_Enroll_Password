import { Button, Form, Input, message } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../../redux/authSlice";
import "./login.scss";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("登录成功:", values);
    dispatch(loginSuccess(values));
    localStorage.setItem("user", JSON.stringify(values));
    message.success("登录成功！");
    navigate("/");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("登录失败:", errorInfo);
    message.error("请检查表单输入！");
  };

  const handleForgetPassword = ()=>{
    navigate("/password")
  }
  const handleEnroll = ()=>{
    navigate("/enroll")
  }
  return (
    <div className="login">
      <div className="content">
        <h3>登录</h3>
        <Form
          name="basic"
          form={form}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          initialValues={{
            loginId: "",
            loginPwd: "",
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label={null}
            name="loginId"
            rules={[
              { required: true, message: "请输入用户名！" },
              {
                pattern: /^[a-zA-Z0-9]{1,6}$/,
                message: "用户名不超过6位,且只能为字母或数字！",
              },
            ]}
          >
            <Input placeholder="请输入用户名" style={{ width: '250px',marginLeft:'-20px'}} className="item" />
          </Form.Item>
          <Form.Item
            label={null}
            name="loginPwd"
            rules={[
              { required: true, message: "请输入密码！" },
              {
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                message:
                  "密码至少6位,包含至少1个大写字母、1个小写字母、1个数字和1个特殊字符!",
              },
            ]}
          >
            <Input.Password placeholder="请输入密码" style={{ width: '250px', marginLeft:'-20px'}}/>
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit" style={{ width: "250px" , marginLeft:'-20px'}}>
              登录
            </Button>
          </Form.Item>
        </Form>
        <div className="switch">
          <Button type="link" onClick={handleForgetPassword}>忘记密码</Button>
          <span className="text">没有账号？</span>
          <Button type="link" onClick={handleEnroll}>快速注册</Button>
        </div>
      </div>
    </div>
  );
}
