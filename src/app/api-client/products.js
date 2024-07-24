import {productsAxios} from "./index";

export async function getProducts(bearer) {
  try {
    const res = await productsAxios.get("/", {
      headers: {
        'Authorization': `Bearer ${bearer}`
      }
    });
    return res.data;
  } catch (err) {
    return err;
  }
}
