import { useEffect, useState } from 'react';
import Heading from '../../components/Heading/Heading';
// import ProductCard from '../../components/ProductCard/ProductCard';
import Search from '../../components/Search/Search';
import { PREFIX } from '../../helpers/API';
import { Product } from '../../interfaces/product.interface';
import styles from './Menu.module.css';
import axios, { AxiosError } from 'axios';
import { MenuList } from './MenuList/MenuList';

const Menu = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>('');

  const getMenu = async () => {
    try {
      setIsLoading(true);
      // await new Promise((resolve) =>
      //   setTimeout(() => {
      //     resolve();
      //   }, 2000)
      // );
      const { data } = await axios.get<Product[]>(`${PREFIX}/products`);
      setProducts(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError) {
        setError(error.message);
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMenu();
  }, []);
  return (
    <>
      <div className={styles['head']}>
        <Heading>Меню</Heading>
        <Search placeholder="Введите блюдо или состав" />
      </div>
      <div>
        {error && <>{error}</>}

        {!isLoading && <MenuList products={products}></MenuList>}
        {isLoading && <>Загружаем продукты...</>}
      </div>
    </>
  );
};

export default Menu;
