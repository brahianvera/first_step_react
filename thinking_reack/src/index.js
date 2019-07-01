import React from 'react'
import ReactDom from 'react-dom'
import './index.css'

class Product_category_row extends React.Component{
    render(){
        const category = this.props.category;
        return(
            <tr>
                <th colSpan='2'>
                    {category}
                </th>
            </tr>
        );
    }
}

class Product_row extends React.Component{
    render(){
        const product = this.props.product;
        const name = product.stocked ?
            product.name :
            <span style={{color:'red'}}>
                {product.name}
            </span>;
        return(
            <tr>
                <td>{name}</td>
                <td>{product.price}</td>    
            </tr>
        )
    }
}

class Product_table extends React.Component{
    render(){
        const rows = [];
        let last_category = null;
        this.props.products.forEach((product)=>{
            if(product.category !== last_category){
                rows.push(
                    <Product_category_row 
                    category={product.category}
                    key={product.category}/>
                );
            }
            rows.push(
                <Product_row 
                    product={product}
                    key={product.name}
                />
            );
            last_category = product.category;
        });
        return(
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        )
    }
}

class Search_bart extends React.Component{
    render(){
        return(
            <form>
                <input type="text" placeholder="Search.." />
                <p>
                    <input type="checkbox" />
                    {' '}
                    Only show products in stock
                </p>
            </form>
        );
    }
}

class Filterable_product_table extends React.Component{
    render(){
        return(
            <div>
                <Search_bart />
                <Product_table products={this.props.products} />
            </div>
        )
    }
}

const PRODUCTS = [
    {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
    {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
    {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
    {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
    {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
    {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

ReactDom.render(
    <Filterable_product_table products={PRODUCTS} />,
    document.getElementById("container_ln")
);