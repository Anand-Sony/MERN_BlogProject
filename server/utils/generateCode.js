const generateCode = (codeLength) => {
    if (!codeLength) {
      codeLength = 4;
    }
    let code = '';
    for (let i = 0; i < codeLength; i++) {
      code += Math.floor(Math.random() * 10);
    }
    return code;
  };
  module.exports = generateCode;
