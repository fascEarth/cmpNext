import styles from './index.module.css';
import SurfaceLayout from '../../../../../../components/layouts/surface/Layout';
function MinstanceList() {
  return (
    <SurfaceLayout>
    <div className={styles.container}>
      <h1>Welcome to the customer Minstance Lists</h1>
      <p>Here is where you can manage your account and view your orders.</p>
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



export default MinstanceList;
