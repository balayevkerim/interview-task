import {
    ProductCartContainer,
    Footer,
    Name,
    Rating,
    Price,
  } from './product-styles';
export const ProductItem = ({product}) => {
    const {thumbnail, title, price,rating} = product
  return (
    <ProductCartContainer>
      <img src={thumbnail} alt={`${title}`} />
      <Footer>
        <Name>{title}</Name>
        <Price>${price}</Price>
        <Rating>
        Rating:{rating} </Rating>

      </Footer>
     
    </ProductCartContainer>
  )
}
