import LocalizedStrings from 'react-native-localization';

export const strings = new LocalizedStrings({
  en: {
    HELLO: 'Hello',
    LOGIN: 'Login',
    EMAIL: 'Email',
    PASSWORD: 'Password',
    SIGNUP: 'SIGN UP',
    LOGIN: 'LOGIN',
    LOGIN: 'LOGOUT',
    FORGOT_PW: 'Forgot password?',
    FIND_PW: 'FIND PASSWORD',
    NAME: 'NAME',
    STATUS_MSG: 'Status message',
    REGISTER: 'REGISTER',
    SEND_LINK: 'Send Link',
    FRIEND: 'Friend',
    MESSAGE: 'Message',
    MY_PROFILE: 'My profile',
    UPDATE: 'Update',
    NO_CONTENT: 'No content',
    ADD_FRIEND: 'ADD',
    GO_CHAT: 'GO CHAT',
  },
  ko: {
    HELLO: '안녕하세요',
    LOGIN: '로그인',
    LOGOUT: '로그아웃',
    EMAIL: '이메일',
    PASSWORD: '패스워드',
    SIGNUP: '회원가입',
    LOGIN: '로그인',
    FORGOT_PW: '비밀번호를 잊어버리셨나요?',
    FIND_PW: '비밀번호 찾기',
    NAME: '이름',
    STATUS_MSG: '상태메세지',
    REGISTER: '가입',
    SEND_LINK: '링크 보내기',
    FRIEND: '친구',
    MESSAGE: '메세지',
    MY_PROFILE: '나의 프로필',
    UPDATE: '수정',
    NO_CONTENT: '컨텐츠가 없습니다',
    ADD_FRIEND: '친구추가',
    GO_CHAT: '채팅하기',
  },
});

export const getString = (str: string) => {
  return strings[str];
};
