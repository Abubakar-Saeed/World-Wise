// Uses the same styles as Product
import PageNav from "../components/PageNav";
import styles from "./Product.module.css";

export default function Product() {
  return (
    <main className={styles.product}>
      <PageNav />
      <section>
        <div>
          <h2>
            Simple Pricing.
            <br />
            Just $9/month.
          </h2>
          <p>
            Get access to all premium features with our straightforward and
            affordable pricing. No hidden fees, no complicated plans—just one
            low price of $9 per month for unlimited access.
          </p>
          <p>
            Enjoy seamless integration, priority support, and regular updates to
            enhance your experience. Upgrade today and unlock the full potential
            of our platform!
          </p>
        </div>
        <img src="img-2.jpg" alt="overview of a large city with skyscrapers" />
      </section>
    </main>
  );
}
