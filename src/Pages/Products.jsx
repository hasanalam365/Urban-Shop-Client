import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Bars } from "react-loader-spinner";

const Products = () => {

    const [hasFocus, setHasFocus] = useState(false);
    const [searchProduct, setSearchProduct] = useState('')
    const [searchInput, setSearchInput] = useState('')
    const [selectBrand, setSelectBrand] = useState('')
    const [selectCategory, setSelectCategory] = useState('')
    const [priceRange, setPriceRange] = useState('')
    const [sortBy, setSortBy] = useState('');

    const { data: productsCatBrand } = useQuery({
        queryKey: ['productsCatBrand'],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_URL_PATH}/productsCatBrand`);
            return res.data
        },


    })

    const { data: products, refetch, isLoading } = useQuery({
        queryKey: ['all-products', searchProduct, sortBy],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_URL_PATH}/products`, {
                params: {
                    searchProduct,
                    brand: selectBrand,
                    category: selectCategory,
                    priceRange: priceRange,
                    sortBy: sortBy
                },
            });
            return res.data
        },
        refetchOnWindowFocus: false,
        enabled: true
    })

    // console.log(import.meta.env.VITE_URL_PATH_LOCAL)

    const handleSearch = () => {

        setSearchProduct(searchInput)
        setSelectCategory('');
        setSelectBrand('');
        setPriceRange('');
        setSortBy('');
        refetch()

    }

    const handleBrandChange = (e) => {
        setSelectBrand(e.target.value);
    };
    const handleCategoryChange = (e) => {
        setSelectCategory(e.target.value);
    };
    const handlePriceChange = (e) => {
        setPriceRange(e.target.value);

    };

    const handleSortChange = (e) => {
        setSortBy(e.target.value)

    }


    const handleFilter = () => {


        refetch()
    };


    const categories = [...new Set(productsCatBrand?.map(product => product.category))]

    const brands = [...new Set(productsCatBrand?.map(product => product.brand))]

    const handleIdCHeck = (e) => {
        console.log(e)
    }



    return (
        <div className="pt-28 p-5">

            <div className="">
                <div className="join ">

                    <div>
                        <input
                            className={`p-3 join-item border-2 ${hasFocus ? 'border-sky-600' : 'border-gray-300'}`}
                            placeholder="Search by product name"
                            type="text"
                            onFocus={() => setHasFocus(true)}
                            onBlur={() => setHasFocus(false)}
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                    </div>


                    <div className="indicator">

                        <button onClick={handleSearch} className="btn join-item">Search</button>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between mt-5">
                <div className="flex items-center justify-center gap-3">
                    <select className="select select-bordered join-item" value={selectBrand} onChange={handleBrandChange}>
                        <option value="" disabled>Brand Name</option>
                        {
                            brands.map((brand, index) => (
                                <option key={index} value={brand}>{brand}</option>
                            ))
                        }
                    </select>
                    <select className="select select-bordered join-item" value={selectCategory} onChange={handleCategoryChange}>
                        <option value="" disabled>Category</option>
                        {
                            categories.map((category, index) => (
                                <option key={index} value={category}>{category}</option>
                            ))
                        }
                    </select>
                    <select className="select select-bordered join-item" value={priceRange} onChange={handlePriceChange}>
                        <option value="" disabled>Price Range</option>
                        <option value="0-500" >$0 - $500</option>
                        <option value="500-1000" >$500 - $1000</option>
                        <option value="1000-2000" >$1000 - $1700</option>
                        <option value="2000-5000" >$1700 - $2500</option>

                    </select>

                    <div className="indicator">

                        <button onClick={handleFilter} className="btn join-item">Filter</button>
                    </div>
                </div>

                <select className="select select-bordered join-item" value={sortBy} onChange={handleSortChange}>
                    <option value="" disabled>Sort By</option>
                    <option value="priceAsc">Price: Low to High</option>
                    <option value="priceDesc">Price: High to Low</option>
                    <option value="dateDesc"> Newest first</option>
                </select>

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
                                <button onClick={() => handleIdCHeck(product.imgUrl)} className="btn btn-primary btn-sm">see more</button>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Products;