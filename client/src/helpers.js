function getDeliveryDate() {
  const date = new Date();
  const newDate = new Date(date.setDate(date.getDate() + 4));

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return newDate.toLocaleDateString(undefined, options);
}

function validateEmail(email) {
  const regex = /^\S+@\S+\.\S+$/;
  return regex.test(email);
}

export { getDeliveryDate, validateEmail };
