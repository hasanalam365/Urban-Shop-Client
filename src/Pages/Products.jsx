import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Bars } from "react-loader-spinner";
import { useLoaderData, useNavigate } from "react-router-dom";

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
    const [currentPage, setCurrentPage] = useState(0)

    const { data: TotalCount } = useQuery({
        queryKey: ['count-page'],
        queryFn: async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_URL_PATH}/totalCount`, {
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
        }
    })


    const count = TotalCount?.count


    // const itemsPerPages = 8
    const numberOfPages = Math.ceil(count / itemsPerPage)

    const pages = []
    for (let i = 0; i < numberOfPages; i++) {
        pages.push(i)
    }



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



    const { data: products, refetch, isLoading, error } = useQuery({
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

    const handleItemsPerPage = (e) => {

        const value = e.target.value
        setItemsPerPage(value)
        setCurrentPage(0)
    }

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1)
        }
    }
    const handleNextPage = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1)
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

            <div className="mt-10">
                <button onClick={handlePrevPage} className="btn">Prev</button>
                {
                    pages.map(page => <button
                        onClick={() => setCurrentPage(page)}
                        key={page} className={`btn ml-2 ${page === currentPage ? 'bg-orange-600 text-white' : ''}`}>
                        {page + 1}
                    </button>)
                }
                <button onClick={handleNextPage} className="btn">Next</button>
                <select value={itemsPerPage} onChange={handleItemsPerPage} id="" className="ml-2 p-2 h-10 bg-gray-200 rounded-xl">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                </select>
            </div>
        </div>
    );
};

export default Products;