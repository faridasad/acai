// React and Hooks
import useKitchenStore from "../../store/KitchenStore";

// Components and Pages
import KitchenListItem from "../../components/KitchenListItem/KitchenListItem";

// Assets and Styles
import "./kitchen.scss";

// Types

interface KitchenProps {}

const Kitchen: React.FC<KitchenProps> = () => {
  const [kitchen, resetKitchen] = useKitchenStore((state) => [
    state.kitchen,
    state.resetKitchen,
  ]);

  return (
    <div className="container">
      <section className="kitchen">
        <h1>Mətbəx</h1>
        <div className="kitchen__content">
          {kitchen.length !== 0 ? (
            <>
              <ul role="list" className="kitchen-orders-list">
                {kitchen.map((order) => {
                  return <KitchenListItem order={order} />;
                })}
              </ul>
              <button className="button-reset" onClick={() => resetKitchen()}>
                <span>Mətbəxi boşalt</span>
              </button>
            </>
          ) : (
            <h2 className="info">Mətbəx boşdur!</h2>
          )}
        </div>
      </section>
    </div>
  );
};

export default Kitchen;
