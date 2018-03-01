import LocalizedStrings from 'react-native-localization';

const strings = new LocalizedStrings({
  en: {
    HELLO: 'Hello',
    LOGIN: 'Login',
    EMAIL: 'Email',
    PASSWORD: 'Password',
    SIGNUP: 'SIGN UP',
    LOGIN: 'LOGIN',
    FORGOT_PW: 'Forgot password?',
    NAME: 'NAME',
    STATUS_MSG: 'Status message',
    REGISTER: 'REGISTER',
  },
  kr: {
    HELLO: '안녕하세요',
    LOGIN: '로그인',
    EMAIL: '이메일',
    PASSWORD: '패스워드',
    SIGNUP: '회원가입',
    LOGIN: '로그인',
    FORGOT_PW: '비밀번호를 잊어버리셨나요?',
    NAME: '이름',
    STATUS_MSG: '상태메세지',
    REGISTER: '가입',
  },
});

export const getString = (str: string) => {
  return strings[str];
};
