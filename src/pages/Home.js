import { useCallback, useEffect } from "react";
import styles from "src/styles/pages/home.module.scss";

// redux
import { useSelector, useDispatch } from "react-redux";
import { selectPackage, setPackages } from "src/features/package/packageSlice";

// components
import Container from "src/components/layout/container";

// utils
import API from "src/utils/api";
import Fetch from "src/utils/fetch";
import Button from "src/components/button/index";

const HomePage = () => {
  const { packages, basket } = useSelector(state => state.package);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPackages = async () => {
      const { data, error } = await Fetch(API.PACKAGES);

      if (error) {
        throw new Error("Error while fetching packages.");
      }

      dispatch(setPackages(data));
    };

    fetchPackages();
  }, []);

  // if basket includes package
  const isPackageInBasket = packageId =>
    basket.packages.filter(item => item.id === packageId).length > 0;

  // throw to basket
  const addToBasket = item => {
    dispatch(selectPackage(item));
  };

  return (
    <div className={styles.home}>
      <Container>
        <div className={styles.packages_card}>
          <div className={styles.packages}>
            {packages && packages.length > 0
              ? packages.map(p => (
                  <div
                    key={p.id}
                    className={`${styles.package} ${
                      isPackageInBasket(p.id) ? styles.selected : ""
                    }`}
                    onClick={() => addToBasket(p)}
                  >
                    <div className={styles.package_image}>
                      <img src={p.imagePath} alt={p.name} />
                    </div>
                    <div className={styles.package_info}>
                      <div className={styles.package_info_name}>
                        <h6>{p.name}</h6>
                        <div className={styles.package_info_price}>
                          {p.amount}
                          {p.currency}
                        </div>
                      </div>
                      <ul className={styles.package_info_details}>
                        {p.details.map((d, i) => (
                          <li key={i}>{d}</li>
                        ))}
                      </ul>
                      <ul className={styles.package_info_tags}>
                        {p.tags.map((t, i) => (
                          <li key={i}>{t}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))
              : "No packages."}
          </div>

          <div className={styles.progress}>
            <div className={styles.selected_packages}>
              Seçilen Paket Tutarı: <strong>{basket.total}₺</strong>
            </div>

            <Button variant="primary">Devam Et</Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HomePage;
