import { API } from "../Config";
import queryString from "query-string";

export const getBooks = (sortBy) => {
    return fetch(`${API}/books?sortBy=${sortBy}&order=desc&limit=30`, {
      method: "GET"
    })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};


export const getCategories = () => {
  return fetch(`${API}/categories`, {
    method: "GET"
  })
  .then(response => {
    return response.json();
  })
  .catch(err => console.log(err));
};

export const getFilteredBooks = (skip, limit, filters = {}) => {
  //    console.log({name, email, password});
  const data = {
    limit,
    skip,
    filters
  }
  return fetch(`${API}/books/by/search`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};

export const list = params => {
  const query = queryString.stringify(params);
  console.log('query', query);
  return fetch(`${API}/books/search?${query}`, {
    method: "GET"
  })
  .then(response => {
    return response.json();
  })
  .catch(err => console.log(err));
};

export const listByAuthor = params => {
  const query = queryString.stringify(params);
  console.log('query', query);
  return fetch(`${API}/books/searchByAuthor?${query}`, {
    method: "GET"
  })
  .then(response => {
    return response.json();
  })
  .catch(err => console.log(err));
};

export const listByPublisher = params => {
  const query = queryString.stringify(params);
  console.log('query', query);
  return fetch(`${API}/books/searchByPublisher?${query}`, {
    method: "GET"
  })
  .then(response => {
    return response.json();
  })
  .catch(err => console.log(err));
};

export const read = (bookId) => {
  return fetch(`${API}/book/${bookId}`, {
    method: "GET"
  })
  .then(response => {
    return response.json();
  })
  .catch(err => console.log(err));
}

export const listRelated = (bookId) => {
  return fetch(`${API}/books/related/${bookId}`, {
    method: "GET"
  })
  .then(response => {
    return response.json();
  })
  .catch(err => console.log(err));
};

//Inventory
export const createInventory = (userId, token, createInventoryData) => {
  return fetch(`${API}/inventory/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(
       createInventoryData
    )
  })
  .then(response => {
    return response.json();
  })
  .catch(err => console.log(err));
};

export const inventoryCheck = params => {
  console.log(params);
  const query = queryString.stringify(params);
  // console.log('query', query);
  return fetch(`${API}/inventory/check?${query}`, {
   method: "GET"
  //  headers: {
  //    Accept: "application/json",
  //    "Content-Type": "application/json"
  //  },
 })
 .then(response => {
  // console.log(JSON.stringify(response.body.json()));
  // console.log(response);
  return response.json();
 })
 .catch(err => console.log(err));
};
