import axios from 'axios'

export default async function getTotalPrice(userId, cartId) {
  const totalPrice = await axios
    .post('api/cart?type=totalPrice', {
      cart_id: cartId,
      user_id: userId,
    })
    .then((response) => {
      return response.data.json[0]['total_price']
    })
    .catch((error) => console.log(error))
  return totalPrice
}
