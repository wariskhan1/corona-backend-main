const validateEmail = (email) => {
  let flag = false;
  if (email) {
    if (email.includes("@") && email.includes(".com")){
      flag = true;
    }
  } else {
    flag = false;
  }
  return flag;
};



const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

const generateString = (length) => {
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

// const SecretKey = "mysecret";
const SecretKey = "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";

module.exports = { validateEmail  , SecretKey , generateString};
