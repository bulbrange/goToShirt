import { client } from '../../App';
import { NEW_USER, GET_USER_BY_EMAIL } from '../../queries/user.queries';

const samePass = (pass, repass) => pass.length > 0 && pass === repass;
const goodEmail = email => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email);
const completedFields = (username, phone) => username.length && phone.length;

const msgInfo = (passOk = false, goodMail = false, uniqueMail = false, completedFields = false) => {
  let title = 'Register fail...';
  let msg = 'Your passwords doesnt match';
  let success = false;
  if (passOk) {
    if (completedFields) {
      if (goodMail) {
        if (uniqueMail) {
          title = 'Welcome!!';
          msg = 'You are now a member of goToShirt';
          success = true;
        } else {
          msg = 'Your email is already in use';
        }
      } else {
        msg = 'Your email format is wrong';
      }
    } else {
      msg = 'You must complete all fields';
    }
  }
  return {
    title,
    msg,
    success,
  };
};
const uniqueMail = async (email) => {
  const data = await client
    .query({
      query: GET_USER_BY_EMAIL,
      variables: { email },
    })
    .then(res => res.data.userByEmail)
    .catch(err => console.log('ERROR: ', err));
  return data;
};
const registerProtocol = async (state) => {
  const {
    username, email, phone, password, repassword,
  } = state;
  const passOk = samePass(password, repassword);
  let info = msgInfo();
  if (passOk) {
    const data = await uniqueMail(email);
    if (data === null && goodEmail(email) && completedFields(username, phone)) {
      await client
        .mutate({
          mutation: NEW_USER,
          variables: {
            email: email.trim(), username: username.trim(), phone, password,
          },
        })
        .then(res => res)
        .catch(err => console.log('ERROR: ', err));
      client.resetStore();
    }
    info = msgInfo(passOk, goodEmail(email), data === null, completedFields(username, phone));
  }
  return info;
};

export default registerProtocol;
