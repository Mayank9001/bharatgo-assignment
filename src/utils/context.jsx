import { createContext, useEffect, useState } from "react";
const ShoppingCartContext = createContext();

const totalPrice = (products) => {
  const total = products.reduce(
    (count, product) => count + product.price * product.count,
    0
  );

  return total;
};

function ShoppingCartProvider({ children }) {
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  const [isCheckoutSideMenuOpen, setCheckOutMenuOpen] = useState(false);
  const [productToShow, setProductToShow] = useState({});
  const [cartProducts, setCartProducts] = useState([]);
  const [totalPriceOfProducts, setTotalPriceOfProducts] = useState(0);
  const [order, setOrder] = useState([]);
  const [items, setItems] = useState(null);
  const [filteredItems, setFilteredItems] = useState(null);
  const [searchTitleBar, setSearchTitleBar] = useState(null);
  const [searchByCategory, setSearchByCategory] = useState(null);
  const [animationSwitch, setAnimationSwitch] = useState(false);
  const [categoryItems, setCategoryItems] = useState(null);
  const [activeCategory, setActiveCategory] = useState("");

  const openProductDetail = () => setIsProductDetailOpen(true);
  const closeProductDetail = () => setIsProductDetailOpen(false);
  const openCheckOutSideMenu = () => setCheckOutMenuOpen(true);
  const closeCheckOutSideMenu = () => setCheckOutMenuOpen(false);
  const cleanTitlebarState = () => setSearchTitleBar(null);
  const updateTotalPriceOfProducts = () =>
    setTotalPriceOfProducts(totalPrice(cartProducts));

  const filteredItemsByTitle = (items, title) =>
    items?.filter((item) =>
      item.title.toLowerCase().includes(title.toLowerCase())
    );
  const filteredItemsByCategory = (items, cat) =>
    items?.filter((item) =>
      item.category.name.toLowerCase().includes(cat.toLowerCase())
    );

  const filterBy = (type, items, title, category) => {
    if (type === "BY_TITLE") return filteredItemsByTitle(items, title);
    if (type === "BY_CATEGORY") return filteredItemsByCategory(items, category);
    if (type === "BY_TITLE_AND_CATEGORY")
      return filteredItemsByCategory(items, category).filter((item) =>
        item.title.toLowerCase().includes(title.toLowerCase())
      );
    return items;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://api.escuelajs.co/api/v1/products");
        const data = await res.json();
        setItems(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    if (items && Array.isArray(items)) {
      const categorized = items.reduce((acc, product) => {
        const categoryName =
          product.category?.name?.split(" ")[0] || "Miscellaneous";

        if (!acc[categoryName]) {
          acc[categoryName] = [];
        }

        acc[categoryName].push(product);

        return acc;
      }, {});

      setCategoryItems(categorized);
    } else {
      setCategoryItems({});
    }
  }, [items]);

  useEffect(() => {
    updateTotalPriceOfProducts();
  }, [cartProducts]);

  useEffect(() => {
    if (searchTitleBar && searchByCategory) {
      setFilteredItems(
        filterBy(
          "BY_TITLE_AND_CATEGORY",
          items,
          searchTitleBar,
          searchByCategory
        )
      );
    } else if (searchTitleBar) {
      setFilteredItems(filterBy("BY_TITLE", items, searchTitleBar));
    } else if (searchByCategory) {
      setFilteredItems(filterBy("BY_CATEGORY", items, null, searchByCategory));
    } else {
      setFilteredItems(filterBy(null, items));
    }
  }, [items, searchTitleBar, searchByCategory]);

  return (
    <ShoppingCartContext.Provider
      value={{
        isProductDetailOpen,
        openProductDetail,
        closeProductDetail,
        isCheckoutSideMenuOpen,
        openCheckOutSideMenu,
        closeCheckOutSideMenu,
        productToShow,
        setProductToShow,
        cartProducts,
        setCartProducts,
        totalPriceOfProducts,
        updateTotalPriceOfProducts,
        order,
        setOrder,
        items,
        setItems,
        filteredItems,
        setFilteredItems,
        searchTitleBar,
        setSearchTitleBar,
        searchByCategory,
        setSearchByCategory,
        cleanTitlebarState,
        animationSwitch,
        setAnimationSwitch,
        categoryItems,
        activeCategory,
        setActiveCategory,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}

export { ShoppingCartProvider, ShoppingCartContext };
