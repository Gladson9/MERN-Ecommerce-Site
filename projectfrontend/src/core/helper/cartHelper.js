export const addItemToCart = (item) => {
  let cart = [];
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    const inCart = cart.find((product) => product._id === item._id);
    if (inCart) {
      cart.forEach((product) => {
        if (product._id === item._id && product.count < product.stock) {
          product.count++;
          product.totalPrice += product.price;
        }
      });
    } else {
      cart.push({
        ...item,
        count: 1,
        totalPrice: item.price,
      });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

export const loadCart = () => {
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart"));
    } else {
      return [];
    }
  }
};

export const cartItemsCount = () => {
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      const cart = JSON.parse(localStorage.getItem("cart"));
      return cart.length;
    }
  }
};
export const removeItemFromCart = (productId) => {
  let cart = [];
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.forEach((product, index) => {
      if (product._id === productId) {
        cart.splice(index, 1);
      }
    });
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  return cart;
};

export const emptyCart = (next) => {
  if (typeof window !== undefined) {
    localStorage.removeItem("cart");
    let cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    next();
  }
};

export const increaseItemCount = (id) => {
  let cart = JSON.parse(localStorage.getItem("cart"));

  cart.forEach((product) => {
    if (product._id === id && product.count < product.stock) {
      product.count++;
      product.totalPrice += product.price;
    }
  });
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const decreaseItemCount = (id) => {
  let cart = JSON.parse(localStorage.getItem("cart"));

  cart.forEach((product) => {
    if (product._id === id) {
      product.count--;
      product.totalPrice -= product.price;
      if (product.count === 0) {
        cart.forEach((product, index) => {
          if (product._id === id) {
            cart.splice(index, 1);
          }
        });
      }
    } else {
      return product;
    }
  });
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const itemInCart = (id) => {
  let cart = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];
  return cart.some((product) => product._id === id);
};
