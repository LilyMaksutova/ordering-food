import { ChangeEvent, useEffect, useState } from 'react';
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
  const [filter, setFilter] = useState<string>();

  useEffect(() => {
    getMenu(filter);
  }, [filter]);

  const getMenu = async (name?: string) => {
    try {
      setIsLoading(true);
      const { data } = await axios.get<Product[]>(`${PREFIX}/products`, {
        params: { name },
      });
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

  const updateFilter = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  return (
    <>
      <div className={styles['head']}>
        <Heading>Меню</Heading>
        <Search
          placeholder="Введите блюдо или состав"
          onChange={updateFilter}
        />
      </div>
      <div>
        {error && <>{error}</>}
        {!isLoading && products.length > 0 && (
          <MenuList products={products}></MenuList>
        )}
        {!isLoading && products.length === 0 && <>Не найдено блюд по запросу</>}
        {isLoading && <>Загружаем продукты...</>}
      </div>
    </>
  );
};

export default Menu;
