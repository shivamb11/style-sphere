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

function mergeSearchParams(pathname, search, navigate, key, value) {
  const idxKey = search.indexOf(key);

  if (idxKey != -1) {
    const keyParam = `${key}=${value}`;
    // KEY is present
    const idxAnd = search.indexOf("&", idxKey + 1);
    if (idxAnd != -1) {
      // Another SEARCH PARAM after KEY
      navigate(
        pathname + search.slice(0, idxKey) + keyParam + search.slice(idxAnd)
      );
    } else {
      // No SEARCH PARAM after KEY
      navigate(pathname + search.slice(0, idxKey) + keyParam);
    }
  } else if (search) {
    const keyParam = `&${key}=${value}`;
    // KEY is absent but there is another SEARCH PARAM
    navigate(pathname + search + keyParam);
  } else {
    const keyParam = `?${key}=${value}`;
    // KEY is absent and there is no other search param
    navigate(pathname + keyParam);
  }
}

function mergeSearchParams2(
  pathname,
  search,
  navigate,
  key1,
  value1,
  key2,
  value2
) {
  const idxKey1 = search.indexOf(key1);
  const idxKey2 = search.indexOf(key2);

  if (idxKey1 != -1) {
    const keyParam = `${key1}=${value1}&${key2}=${value2}`;
    // KEY is present
    const idxAnd = search.indexOf("&", idxKey2 + 1);
    if (idxAnd != -1) {
      // Another SEARCH PARAM after KEY
      navigate(
        pathname + search.slice(0, idxKey1) + keyParam + search.slice(idxAnd)
      );
    } else {
      // No SEARCH PARAM after KEY
      navigate(pathname + search.slice(0, idxKey1) + keyParam);
    }
  } else if (search) {
    const keyParam = `&${key1}=${value1}&${key2}=${value2}`;
    // KEY is absent but there is another SEARCH PARAM
    navigate(pathname + search + keyParam);
  } else {
    const keyParam = `?${key1}=${value1}&${key2}=${value2}`;
    // KEY is absent and there is no other search param
    navigate(pathname + keyParam);
  }
}

export {
  getDeliveryDate,
  validateEmail,
  mergeSearchParams,
  mergeSearchParams2,
};
