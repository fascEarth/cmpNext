import styles from './index.module.css';
import SurfaceLayout from '../../../../../../components/layouts/surface/Layout';
import Link from 'next/link';
function MinstanceDetail() {
  return (
    <SurfaceLayout>
    <div className={styles.container}>
      <h1>Welcome to the customer Minstance Details</h1>
      <p>Here is where you can manage your account and view your orders.</p>
      <Link href="list" variant="body3" > Minstance List</Link>
      <div className={styles.orderList}>
        <h2>Your Orders</h2>
        <ul>
          <li>Order 1</li>
          <li>Order 2</li>
          <li>Order 3</li>
        </ul>
      </div>
    </div>
    </SurfaceLayout>
  );
};



export default MinstanceDetail;
