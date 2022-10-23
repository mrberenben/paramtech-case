import styles from "src/styles/pages/paymentSuccess.module.scss";

// components
import { SuccessIcon } from "src/components/icons";

const PaymentSuccess = () => {
  return (
    <div className={styles.payment_success}>
      <div className={styles.card}>
        <SuccessIcon />

        <p>Başarıyla Tamamlandı.</p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
