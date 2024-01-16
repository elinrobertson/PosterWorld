import { useContext } from "react"
import { Checkbox, Form, Input } from 'antd';
// import { NavLink } from "react-router-dom";
import { Credentials, UserContext } from "../../context/UserContext";
import "./Login.css"

const Login = () => {
  const { login } = useContext(UserContext)!;
  const onFinishFailed = (errorInfo: object) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="form-wrapper">
      
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={(values: Credentials) => login(values)}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      {/* <div className="newuser-div">
        <h3>Är du ny?</h3>
        <NavLink to={"/createuser"}>Skapa nytt konto här</NavLink>
      </div> */}
      <h3>Logga in</h3>
      <Form.Item
        label="E-mail"
        name="email"
        rules={[{ required: true, message: 'Skriv in ditt användarnamn!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Lösenord"
        name="password"
        rules={[{ required: true, message: 'Skriv in ditt lösenord!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
        <Checkbox>Kom ihåg mig</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <button>
          Logga in
        </button>
      </Form.Item>
    </Form>
    </div>
  )
};

export default Login