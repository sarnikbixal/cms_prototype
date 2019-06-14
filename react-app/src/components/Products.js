import React from 'react';
import * as _ from 'lodash';

const Products = (props) =>{
    return _.map(props.products, (product)=>{
        return (
            <div className="product" key={product.id}>
                <span>{product.title}</span>
                <span>{product.desc}</span>
            </div>
        )
    });
}

export default Products;