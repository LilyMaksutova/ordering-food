import { useSelector } from 'react-redux';
import Heading from '../../components/Heading/Heading';
import { RootState } from '../../store/store';
import CartItem from '../../components/CartItem/CartItem';
import { useEffect, useState } from 'react';
import { PREFIX } from '../../helpers/API';
import axios from 'axios';
import { Product } from '../../interfaces/product.interface';
import styles from './Cart.module.css';

export const Cart = () => {
  const items = useSelector((state: RootState) => state.cart.items);
  const [cartProducts, setCartProducts] = useState<Product[]>([]);

  const getItem = async (id: number) => {
    const { data } = await axios.get<Product>(`${PREFIX}/products/${id}`);
    return data;
  };

  const loadAllItems = async () => {
    const res = await Promise.all(items.map((item) => getItem(item.id)));
    setCartProducts(res);
  };

  useEffect(() => {
    loadAllItems();
  }, [items]);

  return (
    <>
      <Heading className={styles['head']}>Корзина</Heading>
      {items.map((item) => {
        const product = cartProducts.find((p) => p.id === item.id);
        if (!product) {
          return;
        }
        return <CartItem count={item.count} {...product} />;
      })}
    </>
  );
};
