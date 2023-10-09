// React and Hooks
import React, { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import useCartStore from "../../store/CartStore";

// Components and Styles
import Search from "../../components/Search";
import CategoryData from "../../data/categories.json";
import CategoryListItem from "../../components/CategoryListItem";
import Error from "../Error";
import { Drawer } from "vaul";

import "./category.scss";


export interface SelectedProduct {
  id: number,
  quantity: number;
}


interface CategoryProps {}

const Category: React.FC<CategoryProps> = () => {
  const { pathname } = useLocation();
  const path = pathname.split("/")[1];
  const categories: { [key: string]: typeof CategoryData.categories.salads } =
    CategoryData.categories;

  if (!categories.hasOwnProperty(path)) return <Error />;

  const categoryItems = useMemo(() => {
    return categories[path].items;
  }, [path]);

  const cart = useCartStore((state) => state.cart);
  console.log(cart)

  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([]);

  return (
    <div className="container">
      <Search />
      <section className="category">
        <ul role="list" className="category-list">
          {categoryItems.map((item) => {
            return (
              <Drawer.Root key={item.id}>
                <Drawer.Trigger asChild>
                    <CategoryListItem item={item} isInModal={false} setSelectedProducts={setSelectedProducts} selectedProducts={selectedProducts} />
                </Drawer.Trigger>
                {/* Draggable modal */}
                <Drawer.Portal>
                  <Drawer.Overlay className="fixed inset-0 bg-black/40" />
                  <Drawer.Content className="bg-zinc-100 flex flex-col rounded-t-[10px] mt-24 fixed bottom-0 left-0 right-0">
                    <div className="p-3 bg-white rounded-t-[10px] flex-1">
                      <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-accent-100 mb-8" />
                      <div className="max-w-md mx-auto flex flex-col">
                        <CategoryListItem item={item} isInModal={true} setSelectedProducts={setSelectedProducts} selectedProducts={selectedProducts} />
                      </div>
                    </div>
                  </Drawer.Content>
                </Drawer.Portal>
              </Drawer.Root>
            );
          })}
        </ul>
      </section>
    </div>
  );
};

export default Category;
