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

function resetPage(key, url) {
  const idxPage = url.indexOf("page");

  if (key === "page" || idxPage === -1) {
    return url;
  }

  // PAGE is present and it is either incremented or decremented
  const keyParam = `page=1`;
  const idxAnd = url.indexOf("&", idxPage + 1);
  if (idxAnd != -1) {
    // Another SEARCH PARAM after PAGE
    return url.slice(0, idxPage) + keyParam + url.slice(idxAnd);
  } else {
    // No SEARCH PARAM after PAGE
    return url.slice(0, idxPage) + keyParam;
  }
}

function mergeSearchParamsOneKey(pathname, search, navigate, key, value) {
  const idxKey = search.indexOf(key);

  if (idxKey != -1) {
    // KEY is present
    const keyParam = `${key}=${value}`;
    const idxAnd = search.indexOf("&", idxKey + 1);
    if (idxAnd != -1) {
      // Another SEARCH PARAM after KEY
      navigate(
        resetPage(
          key,
          pathname + search.slice(0, idxKey) + keyParam + search.slice(idxAnd)
        )
      );
    } else {
      // No SEARCH PARAM after KEY
      navigate(resetPage(key, pathname + search.slice(0, idxKey) + keyParam));
    }
  } else if (search) {
    // KEY is absent but there is another SEARCH PARAM
    const keyParam = `&${key}=${value}`;
    navigate(resetPage(key, pathname + search + keyParam));
  } else {
    // KEY is absent and there is no other search param
    const keyParam = `?${key}=${value}`;
    navigate(resetPage(key, pathname + keyParam));
  }
}

function mergeSearchParamsTwoKey(
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
    // KEY is present
    const keyParam = `${key1}=${value1}&${key2}=${value2}`;
    const idxAnd = search.indexOf("&", idxKey2 + 1);
    if (idxAnd != -1) {
      // Another SEARCH PARAM after KEY
      navigate(
        resetPage(
          key1,
          pathname + search.slice(0, idxKey1) + keyParam + search.slice(idxAnd)
        )
      );
    } else {
      // No SEARCH PARAM after KEY
      navigate(resetPage(key1, pathname + search.slice(0, idxKey1) + keyParam));
    }
  } else if (search) {
    // KEY is absent but there is another SEARCH PARAM
    const keyParam = `&${key1}=${value1}&${key2}=${value2}`;
    navigate(resetPage(key1, pathname + search + keyParam));
  } else {
    // KEY is absent and there is no other search param
    const keyParam = `?${key1}=${value1}&${key2}=${value2}`;
    navigate(resetPage(key1, pathname + keyParam));
  }
}

export {
  getDeliveryDate,
  validateEmail,
  mergeSearchParamsOneKey,
  mergeSearchParamsTwoKey,
};
