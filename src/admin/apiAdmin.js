import { API } from "../Config";

export const createCategory = (userId, token, category) => {
  //    console.log({name, email, password});
  return fetch(`${API}/category/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application//json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(category),
  })
    .then((response) => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};

export const createBook = (userId, token, book) => {
      //  console.log({userId, token, product});
    return fetch(`${API}/book/create/${userId}`, { 
      method: "POST",
      headers: {
        Accept: "application//json",
        // "Content-Type": "application/json", Because we have to send formed data..!!!
        Authorization: `Bearer ${token}`
      },
      body: book,
    })
      .then(response => {
        return response.json();
      })
      .catch(err => {
        console.log(err);
      });
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

export const listItems = (userId, token) => {
    return fetch(`${API}/inventory/list/${userId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
    })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const getStatusValues = (userId, token) => {
  return fetch(`${API}/order/status-values/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
  })
  .then(response => {
    return response.json();
  })
  .catch(err => console.log(err));
};

export const getBooks = () => {
  return fetch(`${API}/books?limit=undefined`, {
      method: 'GET'
  })
      .then(response => {
          return response.json();
      })
      .catch(err => console.log(err));
};

export const deleteBook = (bookId, userId, token) => {
  return fetch(`${API}/book/${bookId}/${userId}`, {
      method: 'DELETE',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
      }
  })
      .then(response => {
          return response.json();
      })
      .catch(err => console.log(err));
};


export const deleteInventoryItem = (itemId, userId, token) => {
  return fetch(`${API}/inventory/${itemId}/${userId}`, {
      method: 'DELETE',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
      }
  })
      .then(response => {
          return response.json();
      })
      .catch(err => console.log(err));
};

export const getBook = bookId => {
  return fetch(`${API}/book/${bookId}`, {
      method: 'GET'
  })
      .then(response => {
          return response.json();
      })
      .catch(err => console.log(err));
};

export const updateBook = (bookId, userId, token, book) => {
  return fetch(`${API}/book/${bookId}/${userId}`, {
      method: 'PUT',
      headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
      },
      body: book
  })
      .then(response => {
          return response.json();
      })
      .catch(err => console.log(err));
};
