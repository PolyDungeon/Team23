import React, { Component } from "react";
import { storeProducts, detailProduct } from "./data";
const ProductContext = React.createContext();

class ProductProvider extends Component {
    state = {
        products: [],
        detailProduct: detailProduct,
        checkout: [],
        PopupOpen: false,
        successfulPurchasePopup: false,
        failedPurchasePopup: false,
        PopupProduct: detailProduct,
        cartSubTotal: 0,
        cartTax: 0,
        cartTotal: 0,
        userPoints: 70
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
        var newSubTotal = totals.subTotal.toFixed(2);
        var newTax = totals.tax.toFixed(2);
        var newTotal = totals.total.toFixed(2);
        this.setState(
            () => {
                return {
                    cartSubTotal: newSubTotal,
                    cartTax: newTax,
                    cartTotal: newTotal
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

    handlePurchase = () => {
        console.log("We called the purchaseItems function yay!");

        // Add up the points for all items in the cart (checkout array)
        var totalPrice = this.state.checkout.reduce((accumulator, item) => accumulator + item.total, 0);

        // Temporary set points
        totalPrice = 10;

        // If we have enough points to purchase everything in the cart
        if (totalPrice <= this.state.userPoints) {
            console.log("We had enough points!");

            // Update user points
            const updatedUserPoints = this.state.userPoints - totalPrice;

            this.setState({
                userPoints: updatedUserPoints,
                successfulPurchasePopup: true,
                
            });

            // Show successful purchase popup 

            // Clear the cart
            this.clearCart();
        }
        // Else we do not have enough points
        else {
            console.log("We do not have enough points :(");

            // Show failed purchase popup

            this.setState({
                failedPurchasePopup: true,
            });
        }
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
                    handlePurchase: this.handlePurchase,
                    addProduct: this.addProduct,
                    removeProduct: this.removeProduct
                }}
            >
                {this.props.children}


                {this.state.successfulPurchasePopup && (
                    // Render successful purchase popup here
                    <div className="popup-container">
                    <div className="popup-content">
                        <h2>Congratulations!</h2>
                        <p>Your purchase has been processed and your items will be shipped to you soon.</p>
                        <button
                            className="close-button"
                            onClick={() =>
                                this.setState({
                                    successfulPurchasePopup: false,
                                })
                            }
                        >
                            Close
                        </button>
                    </div>
                </div>
                )}

                {this.state.failedPurchasePopup && (
                    // Render failed purchase popup here
                    <div className="popup-container">
                    <div className="popup-content">
                        <h2>Unsuccessful Purchase</h2>
                        <p>Please make sure you have enough points to purchase the items in your cart.</p>
                        <button
                            className="close-button"
                            onClick={() =>
                                this.setState({
                                    failedPurchasePopup: false,
                                })
                            }
                        >
                            Close
                        </button>
                    </div>
                </div>
                )}

            </ProductContext.Provider>
        );
    }
}

const TruckerCatelog = ProductContext.Consumer;

export { ProductProvider, TruckerCatelog };
