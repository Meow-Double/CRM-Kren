export const handleEmailValidation = (email: string) => {
    const isValid =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email,
      );
    return isValid;
  };

  export const handlePriceValidation = (price: string) => {
    const isValid = /^\d+(\.\d+)?$/.test(price);
    return isValid;
  };