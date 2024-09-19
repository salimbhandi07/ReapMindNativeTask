

export const validateEmail = (text) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(text);
  };
  
  export const validatePassword = (text) => {
    return text.length >= 6;
  };
  