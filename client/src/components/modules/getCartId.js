import axios from 'axios'

export default async function getCartId(userId) {
  const data = await axios
    .post('api/cart?type=cart_id', {
      user_id: userId,
    })
    .then((cartIdResponse) => {
      return cartIdResponse.data.json[0]['cart_id']
    })
    .catch((cartIdError) => console.log(cartIdError))
  return data
}
