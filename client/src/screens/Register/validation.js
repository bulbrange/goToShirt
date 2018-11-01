import { client } from '../../App';
import { NEW_USER, GET_USER } from '../../queries/user.queries';

const samePass = (pass, repass) => pass.length > 0 && pass === repass;

const goodEmail = email => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email);

const msgInfo = (passOk = false, goodMail = false, uniqueMail = false) => {
  let title = 'Register fail...';
  let msg = 'Your passwords dont match';
  let success = false;
  if (passOk) {
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
      query: GET_USER,
      variables: { email },
    })
    .then(res => res.data.user)
    .catch(err => console.log('ERROR: ', err));
  return data;
};
const registerProtocol = async (state) => {
  const {
    username, email, password, repassword,
  } = state;

  const passOk = samePass(password, repassword);
  let info = msgInfo();
  if (passOk) {
    const data = await uniqueMail(email);

    if (data === null && goodEmail(email)) {
      await client
        .mutate({
          mutation: NEW_USER,
          variables: { email, username, password },
        })
        .then(res => res)
        .catch(err => console.log('ERROR: ', err));
      client.resetStore();
    }
    info = msgInfo(passOk, goodEmail(email), data === null);
  }
  return info;
};

export default registerProtocol;
