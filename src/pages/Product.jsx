import PageNav from "../components/PageNav";
import styles from "./Product.module.css";

export default function Product() {
  return (
    <main className={styles.product}>
      <PageNav />
      <section>
        <img
          src="img-1.jpg"
          alt="person with dog overlooking mountain with sunset"
        />
        <div>
          <h2>About WorldWide</h2>
          <p>
            WorldWide is a global platform dedicated to connecting people,
            businesses, and cultures through innovative technology and seamless
            communication. Our mission is to bridge geographical gaps, enabling
            individuals and organizations to collaborate, trade, and share
            knowledge effortlessly.
          </p>
          <p>
            With a strong presence in multiple industries, including e-commerce,
            finance, and education, WorldWide leverages cutting-edge solutions
            to drive progress. Whether you’re looking for global networking
            opportunities, market expansion, or knowledge exchange, we provide
            the tools and resources to help you succeed in an increasingly
            interconnected world.
          </p>
        </div>
      </section>
    </main>
  );
}
