export const getData = async () => {
  return await fetch("https://api.escuelajs.co/api/v1/products", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
