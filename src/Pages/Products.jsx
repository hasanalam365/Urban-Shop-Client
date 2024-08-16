import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Bars } from "react-loader-spinner";

const Products = () => {

    const [hasFocus, setHasFocus] = useState(false);
    const [searchProduct, setSearchProduct] = useState('')
    const [searchInput, setSearchInput] = useState('')
    const { data: products, refetch, isLoading } = useQuery({
        queryKey: ['all-products', searchProduct],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/products?searchProduct=${searchProduct}`)
            return res.data
        }
    })


    const handleSearch = () => {
        refetch()
        setSearchProduct(searchInput)
    }



    return (
        <div className="pt-28 p-5">

            <div className="flex items-center justify-center">
                <div className="join ">

                    <div>
                        <input
                            className={`p-3 join-item border-2 ${hasFocus ? 'border-sky-600' : 'border-gray-300'}`}
                            placeholder="Search"
                            type="text"
                            onFocus={() => setHasFocus(true)}
                            onBlur={() => setHasFocus(false)}
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                    </div>

                    {/* <select className="select select-bordered join-item">
                        <option disabled selected>Filter</option>
                        <option>Sci-fi</option>
                        <option>Drama</option>
                        <option>Action</option>
                    </select> */}
                    <div className="indicator">

                        <button onClick={handleSearch} className="btn join-item">Search</button>
                    </div>
                </div>
            </div>
            <div>
                <h1 className="text-3xl font-bold mb-4">All Products </h1>
            </div>
            <div className="flex items-center justify-center">
                {
                    isLoading && <Bars
                        height="60"
                        width="60"
                        color="#F29120"
                        ariaLabel="bars-loading"
                        wrapperStyle={{}}
                        wrapperClass="mt-10"
                        visible={true}
                    />
                }
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 ">
                {
                    products?.map(product => <div className="card card-compact bg-base-100  shadow-xl" key={product._id}>
                        <figure>
                            <img
                                src={product.imgUrl}
                                alt="Product Image" className="w-[250px] h-[170px]" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{product.title}</h2>
                            <p>{product.description.slice(0, 50)}.......</p>
                            <div className="flex items-center justify-center gap-5 ">
                                <p>${product.price}</p>
                                <p>{product.rating}</p>
                            </div>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary btn-sm">see more</button>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Products;