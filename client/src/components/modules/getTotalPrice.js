import axios from 'axios'

export default async function getTotalPrice(userId, cartId) {
  let totalPrice = await axios
    .post('api/cart?type=totalPrice', {
      cart_id: cartId,
      user_id: userId,
    })
    .then((response) => {
      return response.data.json[0]['total_price']
    })
    .catch((error) => console.log(error))
  if (totalPrice === null) {
    totalPrice = 0
  }
  return totalPrice
}
