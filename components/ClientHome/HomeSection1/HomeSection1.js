import React, { useEffect, useState } from "react";
import hamburgerImg from "../../../assets/images/foodImages/hamburgerImg.png";
import styles from "../HomeSection1/homesection1.module.css";
import Image from "next/image";
import pizzaMini from "../../../assets/images/foodImages/pizzaMini.svg";
import fries from "../../../assets/images/foodImages/fries.svg";
import burger from "../../../assets/images/foodImages/burger.svg";
import AOS from "aos";
import "aos/dist/aos.css";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/navigation";

const HomeSection1 = () => {
  const { t } = useTranslation("common");
  const [isLogoutUser, setIsLogoutUser] = useState(false)
  const router = useRouter();

  useEffect(() => {
    setIsLogoutUser(localStorage.getItem('access_token'))
    AOS.init();
  }, []);

  return (
    <>
      <section className="lg:mb-20 mb-5">
        <div className={styles["home-client-bg"]}>
          <div className={styles["hamburger-left"]} data-aos="fade-up">
            <h2>{t("Our Food site makes it easy to find local food")}</h2>
            <p>
              Lorem ipsum is placeholder text commonly used in the graphic,
              print, and publishing industries for previewing layouts and visual
              mockups.
            </p>
            <div className={styles["hamburger-btn"]}>
              {!isLogoutUser &&
                <button
                  className={styles["register-btn"]}
                  onClick={() => router.push("/register")}
                >
                  {t("Register")}
                </button>
              }
              <button className={styles['order-btn']} onClick={() => router.push("/restaurants")}>
                {t("Order now")}
              </button>
            </div>
          </div>
          <div className={styles["hamburger-right"]}>
            <div className={styles["hamburger-bg"]}></div>
            <Image
              src={hamburgerImg}
              className={styles["hamburger-image"]}
              alt="hamburger-image"
              data-aos="fade-right"
            />
            <div className={styles["foody-card"]} data-aos="fade-right">
              <div className="mr-6">
                <Image src={pizzaMini} alt="pizza" />
              </div>
              <div className={styles["foody-card-text"]}>
                <p>Pizza Hut</p>
                <p>Yummy....</p>
              </div>
            </div>
            <div className={styles["foody-card-2"]} data-aos="fade-right">
              <div className="mr-6">
                <Image src={fries} alt="pizza" />
              </div>
              <div className={styles["foody-card-text"]}>
                <p>French Fries</p>
                <p>Yummy....</p>
              </div>
            </div>
            <div className={styles["foody-card-3"]} data-aos="fade-right">
              <div className="mr-6">
                <Image src={burger} alt="pizza" />
              </div>
              <div className={styles["foody-card-text"]}>
                <p>Cheesburger</p>
                <p>Yummy....</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeSection1;
