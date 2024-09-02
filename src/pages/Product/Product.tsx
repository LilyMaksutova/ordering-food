import { useLoaderData, Await } from 'react-router-dom';
import { Product } from '../../interfaces/product.interface';
import { Suspense } from 'react';

export const Product = () => {
  const data = useLoaderData() as { data: Product };
  return (
    <Suspense fallback={'Загружаю...'}>
      <Await resolve={data.data}>
        {({ data }: { data: Product }) => {
          return <>Product - {data.name}</>;
        }}
      </Await>
    </Suspense>
  );
};
