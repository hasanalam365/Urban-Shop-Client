import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Products = () => {

    const { data: products, refetch, isLoading } = useQuery({
        queryKey: ['all-products'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:5000/products')
            return res.data
        }
    })


    return (
        <div className="pt-28 p-5">
            <div>
                <h1 className="text-3xl font-bold mb-4">All Products </h1>
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