import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SingleProduct from "@/components/SingleProduct";
import { GetAllProducts } from "@/services/products/getAllProducts";
import { Pagination } from "antd";
import { useState } from "react";
import { useEffect } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [size, setSize] = useState(10);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const res = GetAllProducts(size, page);
    res.then((result) => {
      setProducts(result.products);
      setTotalPages(result.total_pages * size);
      setPage(result.page);
    });
  }, [size, page]);

  const onChange = (page) => {
    setPage(page);
  };

  const onShowSizeChange = (current, pageSize) => {
    setSize(pageSize);
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="grid grid-cols-4 gap-4">
          {products.map((item, index) => {
            return (
              <SingleProduct
                key={index}
                ID={item.ID}
                imageUrl={item.image_url}
                name={item.name}
                des={item.short_description}
                price={item.price}
              />
            );
          })}
        </div>
        <Pagination
          className="text-center mt-5"
          defaultCurrent={1}
          onChange={onChange}
          onShowSizeChange={onShowSizeChange}
          total={totalPages}
        />
      </div>
      <Footer />
    </>
  );
}
