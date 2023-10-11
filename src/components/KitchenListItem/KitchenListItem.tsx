// React and Hooks
import { useRef } from "react";
import useKitchenStore, { Order } from "../../store/KitchenStore";

// Components and Pages
// *

// Assets and Styles
import RemoveIcon from "../../assets/images/icon-close.svg";

// Types
interface KitchenListItemProps {
  order: Order;
}

const KitchenListItem: React.FC<KitchenListItemProps> = ({ order }) => {
  const removeOrder = useKitchenStore((state) => state.removeOrder);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <li className="kitchen-order-item" key={order.id}>
      <button
        className="trigger"
        onClick={() => {
          contentRef.current?.getAttribute("aria-hidden") === "true"
            ? contentRef.current?.setAttribute("aria-hidden", "false")
            : contentRef.current?.setAttribute("aria-hidden", "true");
        }}
      >
        <h2>{order.items.map((p) => p.name).join(", ")}</h2>+
      </button>
      <div className="content" ref={contentRef} aria-hidden="true">
        <div>
          <div className="content__inner">
            {order.items.map((p) => {
              return (
                <div className="product" key={p.id}>
                  <img src={p.imgUrl} alt={p.name} />
                  <div className="details">
                    <span className="name">{p.name}</span>
                    <span className="quantity">{p.quantity}</span>
                    <div className="notes">{p.notes}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <button className="remove-order" onClick={() => removeOrder(order)}>
        <img src={RemoveIcon} alt="remove order" />
      </button>
    </li>
  );
};

export default KitchenListItem;
