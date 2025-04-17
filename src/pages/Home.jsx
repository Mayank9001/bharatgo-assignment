import React, { useContext } from "react";
import { Card } from "../components/Card/index";
import { ShoppingCartContext } from "../utils/context";
const Home = () => {
  const context = useContext(ShoppingCartContext);
  return (
    <div className="flex flex-col mt-20 items-center">
      <div className="flex items-center justify-center  relative w-80 mb-4">
        Home
      </div>
      <input
        className="rounded-lg border border-black w-80 p-4 mb-4 focus:outline-none"
        type="text"
        placeholder="Search a product..."
      />
      {context.items && Object.keys(context.items).length > 0 ? (
        <div className="grid place-items-center justify-center xl:gap-4 md:gap-3 sm:gap-2 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 w-full max-w-screen-lg  m">
          {context.filteredItems?.map((item) => {
            return <Card data={item} key={item.id} />;
          })}
        </div>
      ) : (
        <>Nothing Here right now....</>
      )}
    </div>
  );
};

export default Home;
