import styled from 'styled-components';
import { Form, Input, Toast } from 'antd-mobile';
import NavBarAgain from '@/components/NavBarAgain';
import ButtonAgain from '@/components/ButtonAgain';

const LoginBox = styled.div`
  .adm-form {
    margin-top: 20px;

    .adm-list.adm-list-default {
      margin: 0 15px;
    }

    .adm-list-item-content-extra {
      .adm-button-shape-default {
        min-width: 158px;
        height: 45px;
        border-radius: 4px;
      }
    }

    .adm-form-footer {
      text-align: center;
      .adm-button {
        height: 58px;
        min-width: 332px;
        padding: 10px 140px;
        border-radius: 4px;
      }
    }
  }
`;

// 自定义表单校验规则
const validate = {
  phone(_, value) {
    const tempValue = value.trim();
    const reg = /^(?:(?:\+\+|00)86)?1\d{10}$/;
    if (tempValue.length === 0) return Promise.reject(new Error('手机号是必填项！'));
    if (!reg.test(tempValue)) return Promise.reject(new Error('手机号格式有误！'));
    return Promise.resolve();
  },
  code(_, value) {
    const tempValue = value.trim();
    const reg = /^\d{6}$/;
    if (tempValue.length === 0) return Promise.reject(new Error('验证码是必填项！'));
    if (!reg.test(tempValue)) return Promise.reject(new Error('验证码格式有误！'));
    return Promise.resolve();
  },
};

const Login = () => {
  const [formIns] = Form.useForm();

  const delay = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 4000);
    });
  };
  // 表单提交
  const submitHandle = async () => {
    try {
      await formIns.validateFields();
      const values = formIns.getFieldsValue();
      console.log(values);
      await delay();

      Toast.show({
        icon: 'success',
        content: '校验成功',
      });
    } catch (e) {
      return e;
    }
  };

  // 发送验证码
  const sendCodeHandle = async () => {
    // try {
    //   await formIns.validateFields(['phone']);
    // } catch (e) {
    //   return e;
    // }
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 4000);
    });
  };
  return (
    <LoginBox>
      <NavBarAgain title='登录/注册' />
      <Form
        layout='horizontal'
        style={{ '--border-top': 'none' }}
        footer={
          <ButtonAgain type='primary' color='primary' onClick={submitHandle}>
            提交
          </ButtonAgain>
        }
        form={formIns}
        initialValues={{ phone: '', code: '' }}
      >
        <Form.Item name='phone' label='手机号' rules={[{ validator: validate.phone }]}>
          <Input placeholder='请输入手机号' />
        </Form.Item>
        <Form.Item
          name='code'
          label='验证码'
          rules={[{ validator: validate.code }]}
          extra={
            <ButtonAgain size='small' color='primary' onClick={sendCodeHandle}>
              发送验证码
            </ButtonAgain>
          }
        >
          <Input />
        </Form.Item>
      </Form>
    </LoginBox>
  );
};

export default Login;
