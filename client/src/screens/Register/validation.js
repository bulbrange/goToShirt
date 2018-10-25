const samePass = (pass, repass) => pass.length > 0 && pass === repass;
const goodEmail = email => email.length > 0;

const msgInfo = (passOk, uniqueMail) => {
  let title;
  let msg;
  if (passOk) {
    if (uniqueMail) {
      title = 'Welcome!!';
      msg = 'You are now a member of goToShirt';
    } else {
      title = 'Register fail...';
      msg = 'Your email is already in use';
    }
  }
  return {
    title,
    msg,
  };
};

export { samePass, goodEmail, msgInfo };
