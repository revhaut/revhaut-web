const generateBranchCode = () => {
  return Math.floor(Math.random() * 899999 + 100000).toString();
};

const generate2FACode = () => {
  return Math.floor(Math.random() * 8999 + 1000).toString();
};

export { generateBranchCode, generate2FACode };
