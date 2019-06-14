import React from 'react';
import * as _ from 'lodash';

const Products = (props) =>{
    return _.map(props.products, (product)=>{
        return (
            <label className="product btn btn-outline-secondary btn-block text-left font-weight-bolder" key={product.id}>
                <small className="font-weight-normal pl-4">{product.title}</small>    
                <small className="font-weight-normal pl-4">{product.desc}</small>
            </label>
        )
    });
}

export default Products;