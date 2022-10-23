import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "src/styles/pages/payment.module.scss";

// 3rd library
import InputMask from "react-input-mask";

// redux
import { useSelector } from "react-redux";

// components
import Container from "src/components/layout/container";
import Button from "src/components/button/index";

// utils
import Fetch from "src/utils/fetch";
import API from "src/utils/api";

const Payment = () => {
  const navigate = useNavigate();
  const { basket } = useSelector(state => state.package);
  const [agreement, setAgreement] = useState("");
  const [card, setCard] = useState({
    holder: "",
    number: "",
    expiration: "",
    cvv: ""
  });
  const [cardSide, setCardSide] = useState("front");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAgreement = async () => {
      const { data } = await Fetch(API.PAYMENT);
      setAgreement(data.content);
    };

    fetchAgreement();
  }, []);

  const handleChange = useCallback(
    e => {
      setCard(current => ({
        ...current,
        [e.target.name]: e.target.value
      }));
    },
    [card]
  );

  const pay = useCallback(async () => {
    setLoading(true);
    const body = {
      packageIds: basket.packages.map(p => p.id),
      totalAmount: basket.total,
      cardHolderName: card.holder,
      cardNumber: card.number.replace(/ /g, ""), // this regex is faster than other methods like split/join
      expireDate: card.expiration,
      cvv: card.cvv
    };

    const form = new FormData();

    Object.entries(body).forEach(([key, value]) => {
      form.append(key, value);
    });

    const res = await Fetch(API.PAYMENT, "POST", form, true);

    if (res.error) {
      throw new Error("Error while creating payment post request.");
    }

    setLoading(false);
    navigate("/payment/success");
  }, [card]);

  return (
    <Container>
      <div className={styles.payment}>
        <section className={styles.main}>
          {basket.packages.length > 0 ? (
            <div className={styles.payment_card}>
              <div className={styles.payment_section}>
                <header className={styles.payment_header}>
                  <h6>Kart Bilgileri</h6>
                </header>
                <div className={styles.payment_body}>
                  <div className={styles.payment_body_row}>
                    <form className={styles.payment_form}>
                      <div className={styles.payment_form_row}>
                        <label htmlFor="holder">Kart üzerindeki isim</label>
                        <input
                          type="text"
                          id="holder"
                          name="holder"
                          placeholder="İsminizi girin"
                          defaultValue={card.holder}
                          required
                          onChange={handleChange}
                        />
                      </div>
                      <div className={styles.payment_form_row}>
                        <label htmlFor="number">Kart numarası</label>
                        <InputMask
                          id="number"
                          name="number"
                          mask="9999 9999 9999 9999"
                          maskChar=""
                          value={card.number}
                          onChange={handleChange}
                          required
                        >
                          {props => (
                            <input
                              type="text"
                              placeholder="XXXX XXXX XXXX XXXX"
                              {...props}
                            />
                          )}
                        </InputMask>
                      </div>
                      <div
                        className={`${styles.payment_form_row} ${styles.multiple}`}
                      >
                        <div className={styles.payment_form_row_half}>
                          <label htmlFor="expiration">
                            Son kullanma tarihi
                          </label>
                          <InputMask
                            id="expiration"
                            name="expiration"
                            mask="99/99"
                            maskChar=""
                            value={card.expiration}
                            onChange={handleChange}
                            required
                          >
                            {props => (
                              <input
                                type="text"
                                placeholder="XX/XX"
                                {...props}
                              />
                            )}
                          </InputMask>
                        </div>
                        <div className={styles.payment_form_row_half}>
                          <label htmlFor="cvv">CVV/CVC</label>
                          <InputMask
                            id="cvv"
                            name="cvv"
                            mask="999"
                            maskChar=""
                            value={card.cvv}
                            onChange={handleChange}
                            onFocus={() => setCardSide("back")}
                            onBlur={() => setCardSide("front")}
                            required
                          >
                            {props => (
                              <input type="text" placeholder="XXX" {...props} />
                            )}
                          </InputMask>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className={styles.payment_body_row}>
                    <div className={styles.credit_card}>
                      <div
                        className={`${styles.card} ${
                          cardSide === "back" ? styles.reversed : ""
                        }`}
                      >
                        <div className={styles.front}>
                          <div className={styles.holder_info}>
                            <div className={styles.number}>
                              <label>Number</label>
                              {card.number}
                            </div>
                            <div className={styles.holder_and_exp}>
                              <div className={styles.holder}>
                                <label>Holder</label>
                                <p>{card.holder}</p>
                              </div>
                              <div className={styles.exp}>
                                <label>Expiration</label>
                                {card.expiration}
                              </div>
                            </div>
                          </div>
                          <div className={styles.mastercard}>
                            <span />
                            <span />
                          </div>
                        </div>
                        <div className={styles.back}>
                          <div className={styles.black_line} />
                          <div className={styles.secret}>
                            <div className={styles.stripes} />
                            <div className={styles.cvv}>{card.cvv}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.payment_section}>
                <header className={styles.payment_header}>
                  <h6>Sözleşme</h6>
                </header>
                <div className={styles.agreement_body}>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: decodeURIComponent(agreement)
                    }}
                  />
                </div>
              </div>
            </div>
          ) : (
            "Sepette hiç ürün yok."
          )}
        </section>

        <aside className={styles.sidebar}>
          <div className={styles.sidebar_card}>
            <header className={styles.sidebar_header}>
              <h6>Sepetteki Paketler</h6>
              <span>{basket.packages.length}</span>
            </header>
            <div className={styles.sidebar_body}>
              {basket.packages.length > 0
                ? basket.packages.map(p => (
                    <div key={p.id} className={styles.package}>
                      <div className={styles.package_name}>{p.name}</div>
                      <div className={styles.package_price}>
                        {p.amount}
                        {p.currency}
                      </div>
                    </div>
                  ))
                : "Sepette hiç ürün yok."}

              <div className={styles.total}>
                <span>Toplam</span>
                <strong>{basket.total}₺</strong>
              </div>

              <Button
                variant="primary"
                stretch={true}
                onClick={pay}
                loading={loading}
                disabled={basket.packages.length === 0}
              >
                Ödeme Yap
              </Button>
            </div>
          </div>
        </aside>
      </div>
    </Container>
  );
};

export default Payment;
