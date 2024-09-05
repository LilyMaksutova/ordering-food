import styles from './CartItem.module.css';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart.slice';
import { AppDispatch } from '../../store/store';
import { CartItemProps } from './CartItem.props';
import cn from 'classnames';

const CartItem = (props: CartItemProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const decrease = () => {
    dispatch(cartActions.decrease(props.id));
  };

  const increase = () => {
    dispatch(cartActions.add(props.id));
  };

  const remove = () => {
    dispatch(cartActions.remove(props.id));
  };

  return (
    <div className={styles['item']}>
      <div
        className={styles['image']}
        style={{ backgroundImage: `url('${props.image}')` }}
      ></div>
      <div className={styles['description']}>
        <div className={styles['name']}>{props.name}</div>
        <div className={styles['price']}>{props.price}&nbsp;₽</div>
      </div>
      <div className={styles['actions']}>
        <button className={styles['button']} onClick={decrease}>
          <img src="/minus-icon.svg" alt="Убрать из корзины" />
        </button>
        <div className={styles['number']}>{props.count}</div>
        <button
          className={cn(styles['button'], styles['plus'])}
          onClick={increase}
        >
          <img src="/plus-icon.svg" alt="Добавить в корзину" />
        </button>
        <button className={styles['remove']} onClick={remove}>
          <img src="/delete-icon.svg" alt="Удалить все" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
