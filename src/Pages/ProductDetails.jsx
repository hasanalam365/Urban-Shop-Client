import React from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';

const ProductDetails = () => {

    const { imgUrl, price, rating, title, description, brand, category, features } = useLoaderData()
    const navigate = useNavigate()

    const handleBack = () => {
        navigate(-1)
    }

    return (
        <div className='pt-20'>
            <div className="card lg:card-side bg-base-100 shadow-xl">
                <figure>
                    <img className='w-full h-[400px] md:h-[500px] lg:h-[500px]'
                        src={imgUrl}
                        alt="Album" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{title}</h2>
                    <p>{description}</p>
                    <div>
                        <p>Category: {category}</p>
                        <p>Brand: {brand}</p>
                        <p>Rating: {rating}</p>
                        <p className='font-medium'>Features:</p>
                        {
                            features.map(feature => <li key={feature}> {feature} </li>)
                        }
                    </div>
                    <div className="card-actions justify-end">
                        <button onClick={handleBack} className="btn btn-primary">Go Back</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;