import React from 'react';
import * as _ from 'lodash';

const Products = (props) =>{
    return _.map(props.products, (product)=>{
        let imgSrc = `/${product.imgSrc}`;
        return (
            <div className="" key={product.id}>
                <div className="media mt-2 mb-3">
                    <img src={imgSrc} className="mr-3" alt="monitor" />
                    <div className="media-body">
                        <h5 className="mt-0"><a href="#">{product.title}</a></h5>
                        {product.desc}
                    </div>
                </div>
            
                <dl className="row">
                <dt className="col-sm-3">Quantity</dt>
                    <dd className="col-sm-3">{product.qty}</dd>
                    <dd className="col-sm"><a href="#"><small>Change</small></a></dd>
                </dl>
                
                <dl className="row">
                <dt className="col-sm-3">Price</dt>
                <dd className="col-sm">${product.price}</dd>
                </dl>
            </div>
        )
    });
}

export default Products;