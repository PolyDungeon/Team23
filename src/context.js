import React, { Component } from "react";
import { storeProducts, detailProduct } from "./data";
const ProductContext = React.createContext();

class ProductProvider extends Component {
    state = {
        products: [],
        detailProduct: detailProduct,
        checkout: [],
        PopupOpen: false,
        PopupProduct: detailProduct,
        cartSubTotal: 0,
        cartTax: 0,
        cartTotal: 0
    };
    componentDidMount() {
        this.setProducts();
    }

    setProducts = () => {
        let products = [];
        storeProducts.forEach(item => {
            const singleItem = { ...item };
            products = [...products, singleItem];
        });
        this.setState(() => {
            return { products };
        }, this.checkCartItems);
    };

    getItem = id => {
        const product = this.state.products.find(item => item.id === id);
        return product;
    };


    handleDetail = id => {
        const product = this.getItem(id);
        this.setState(() => {
            return { detailProduct: product };
        }
        );
    };


    addToCart = id => {
        let tempProducts = [...this.state.products];
        const prodIndex = tempProducts.indexOf(this.getItem(id));
        const product = tempProducts[prodIndex];
        product.inCart = true;
        product.count = 1;
        const price = product.price;
        product.total = price;

        this.setState(() => {
            return {
                products: [...tempProducts],
                checkout: [...this.state.checkout, product],
                detailProduct: { ...product }
            };
        }, this.addTotals);
    };


    openPopup = id => {
        const product = this.getItem(id);
        this.setState(() => {
            return { PopupProduct: product, PopupOpen: true };
        });
    };


    closePopup = () => {
        this.setState(() => {
            return { PopupOpen: false };
        });
    };


    increment = id => {
        let tempCart = [...this.state.checkout];
        const selectedProduct = tempCart.find(item => {
            return item.id === id;
        });
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];
        product.count = product.count + 1;
        product.total = product.count * product.price;
        this.setState(() => {
            return {
                checkout: [...tempCart]
            };
        }, this.addTotals);
    };


    decrement = id => {
        let tempCart = [...this.state.checkout];
        const selectedProduct = tempCart.find(item => {
            return item.id === id;
        });
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];
        product.count = product.count - 1;
        if (product.count === 0) {
            this.removeItem(id);
        } else {
            product.total = product.count * product.price;
            this.setState(() => {
                return { checkout: [...tempCart] };
            }, this.addTotals);
        }
    };


    getTotals = () => {
        // const subTotal = this.state.checkout
        //   .map(item => item.total)
        //   .reduce((acc, curr) => {
        //     acc = acc + curr;
        //     return acc;
        //   }, 0);
        let subTotal = 0;
        this.state.checkout.map(item => (subTotal += item.total));
        const tempTax = subTotal * 0.1;
        const tax = parseFloat(tempTax.toFixed(2));
        const total = subTotal + tax;
        return {
            subTotal,
            tax,
            total
        };
    };


    addTotals = () => {
        const totals = this.getTotals();
        this.setState(
            () => {
                return {
                    cartSubTotal: totals.subTotal,
                    cartTax: totals.tax,
                    cartTotal: totals.total
                };
            },
            () => {
                // console.log(this.state);
            }
        );
    };

    // Function to add a new product
    addProduct = (newProduct) => {
        this.setState(prevState => ({
            products: [...prevState.products, newProduct],
        }));
    };

    removeItem = id => {
        let tempProducts = [...this.state.products];
        let tempCart = [...this.state.checkout];

        const prodIndex = tempProducts.indexOf(this.getItem(id));
        let removedProduct = tempProducts[prodIndex];
        removedProduct.inCart = false;
        removedProduct.count = 0;
        removedProduct.total = 0;

        tempCart = tempCart.filter(item => {
            return item.id !== id;
        });

        this.setState(() => {
            return {
                checkout: [...tempCart],
                products: [...tempProducts]
            };
        }, this.addTotals);
    };


    clearCart = () => {
        this.setState(
            () => {
                return { checkout: [] };
            },
            () => {
                this.setProducts();
                this.addTotals();
            }
        );
    };



    // Function to remove a product
    removeProduct = (productId) => {
        this.setState(prevState => ({
            products: prevState.products.filter(product => product.id !== productId),
        }));
    };

    render() {
        return (
            <ProductContext.Provider
                value={{
                    ...this.state,
                    handleDetail: this.handleDetail,
                    addToCart: this.addToCart,
                    openPopup: this.openPopup,
                    closePopup: this.closePopup,
                    increment: this.increment,
                    decrement: this.decrement,
                    removeItem: this.removeItem,
                    clearCart: this.clearCart,
                    addProduct: this.addProduct,
                    removeProduct: this.removeProduct
                }}
            >
                {this.props.children}
            </ProductContext.Provider>
        );
    }
}

const TruckerCatelog = ProductContext.Consumer;

export { ProductProvider, TruckerCatelog };
