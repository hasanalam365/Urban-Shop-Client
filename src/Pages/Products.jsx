import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Bars } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";

const Products = () => {
    const navigate = useNavigate();
    const [hasFocus, setHasFocus] = useState(false);
    const [searchProduct, setSearchProduct] = useState('')
    const [searchInput, setSearchInput] = useState('')
    const [selectBrand, setSelectBrand] = useState('')
    const [selectCategory, setSelectCategory] = useState('')
    const [priceRange, setPriceRange] = useState('')
    const [sortBy, setSortBy] = useState('');
    const token = localStorage.getItem('accessToken');

    const [itemsPerPage, setItemsPerPage] = useState(8)
    const [currentPage, setCurrentPage] = useState(1)

    const { data: productsCatBrand } = useQuery({
        queryKey: ['productsCatBrand'],
        queryFn: async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_URL_PATH}/productsCatBrand`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                return res.data
            } catch (err) {
                if (err.response && err.response.status === 401) {

                    navigate('/login');
                }
                throw err;
            }

        },


    })

    const { data: products, refetch, isLoading } = useQuery({
        queryKey: ['all-products', searchProduct, sortBy, currentPage],
        queryFn: async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_URL_PATH}/products`, {
                    params: {
                        searchProduct,
                        brand: selectBrand,
                        category: selectCategory,
                        priceRange: priceRange,
                        sortBy: sortBy,
                        currentPage,
                        itemsPerPage
                    },
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                return res.data;
            } catch (err) {
                if (err.response && err.response.status === 401) {

                    navigate('/login');
                }
                throw err;
            }
        },
        refetchOnWindowFocus: false,
        enabled: !!token
    });




    const totalItems = products?.totalItems
    const numberOfPages = Math.ceil(totalItems / itemsPerPage)

    const pages = [];
    for (let i = 0; i < numberOfPages; i++) {
        pages.push(i + 1);
    }

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


    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
            refetch();
        }
    }
    const handleNextPage = () => {
        if (currentPage < numberOfPages) {
            setCurrentPage(prevPage => prevPage + 1);
            refetch();
        }
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

            <div className="flex flex-col mt-5">
                <div className="flex flex-col  md:flex-row lg:flex-row  gap-3">
                    <select className="select select-bordered join-item " value={selectBrand} onChange={handleBrandChange}>
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

                <div className="mt-5">
                    <select className="select select-bordered join-item" value={sortBy} onChange={handleSortChange}>
                        <option value="" disabled>Sort By</option>
                        <option value="priceAsc">Price: Low to High</option>
                        <option value="priceDesc">Price: High to Low</option>
                        <option value="dateDesc"> Newest first</option>
                    </select>
                </div>

            </div>

            <div>
                <div className="divider"></div>
                <h1 className="text-3xl font-bold mt-4">All Products </h1>
                <div className="divider"></div>
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
            {

                products?.products?.length === 0 ? <div className="flex items-center justify-center mt-10 ">
                    <h1 className="flex items-center justify-center text-lg font-semibold">Opps! No match any products</h1>
                </div>

                    :

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-5 ">
                        {
                            products?.products?.map(product => <div className="card card-compact bg-base-100  shadow-xl" key={product._id}>
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
                                        <Link to={`/product-details/${product._id}`} className="btn btn-primary btn-sm">more info</Link >
                                    </div>
                                </div>
                            </div>)
                        }
                    </div>}

            {
                products?.products?.length > 0 && <div className="mt-10">
                    <button onClick={handlePrevPage} className="btn">Prev</button>
                    {
                        pages.map(page => <button
                            onClick={() => setCurrentPage(page)}
                            key={page} className={`btn ml-2 ${page === currentPage ? 'bg-orange-600 text-white' : ''}`}>
                            {page}
                        </button>)
                    }
                    <button onClick={handleNextPage} className="btn">Next</button>

                </div>
            }
        </div>
    );
};

export default Products;