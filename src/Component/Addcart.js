import {
  Grid,
  Paper,
  Typography,
  Card,
  Button,

} from "@mui/material";
import React from 'react';

import { useSelector, useDispatch, connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { makeStyles } from '@mui/styles';
import { BASE_URL } from "../services/Helper";
import { addToProductCart, increaseProductQuantity, decreaseProductQuantity, getAllProductDetails } from "../action/productAction";
import Navbar from "./Navbar";


const useStyles = makeStyles({

  userShoppingSelectedCartItem: {

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",

    // card........
    "&>div": {

      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "27px 9px 25px 9px",
      margin: "100px 0px 0px 0px",

      margin: "1%",
      margin: "11px 0px 0px 0px",

      "&>div": {

        "&>div": {

          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",

          // image ..........
          "&>img": {
            position: "relative",
            left: "1px",
            top: "-16px",
            width: "228px",
            height: "155px",
            margin: "3px 2px",
            padding: "10px 14px",
            borderRadius: "30px",
          },
          "&>div": {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "12px 0px 0px 0px",

            "&>p": {
              padding: "10px",
            }
          },

          // description....
          "&>p": {
            padding: "11px 10px 0px 15px",
          }
        }
      }
    }
  },

  userShoppingCart: {

    "&::-webkit-scrollbar": {
      display: "none",
    },

    "&>div:first-child": {

      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "29%",
      height: "100px",
      padding: "8px 10px 8px 12px",
      margin: "0px 0px 0px 18px",

      position: "fixed",

      top: "99px",
      left: "10px",
      // width: "100%",
      zIndex: "982",
    },


    "&>div:nth-child(2)": {

      overflowY: "auto",
      height: "500px",

      margin: "205px 8px 0px 12px",

      "&::-webkit-scrollbar": {
        display: "none",
      },

      "&>div": {
        gap: "10px",
        display: "flex",
        flexWrap: "wrap",
      }
    },


    '@media (max-width: 2200px)': {

      "&>div:nth-child(2)": {
        height: 'calc(100vh - 171px) !important',
      }
    },

    '@media (max-width: 768px)': {

      "&>div:nth-child(2)": {
        height: 'calc(100vh - 171px) !important',
      }
    },

    '@media (max-width: 1024px)': {

      "&>div:nth-child(2)": {
        height: 'calc(100vh - 171px) !important',
      },

    },

    '@media (max-width: 1440px)': {

      "&>div:nth-child(2)": {
        height: 'calc(96vh - 171px) !important',
      },
    },
  },

  userShopingCartDetails: {

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "fixed",
    top: "135px",
    padding: "7px 12px 11px 20px",
    margin: "0px 16px 0px 10px",

  }

})

const Addcart = ({ Cart, TotalPrice, increaseProductQuantity, decreaseProductQuantity, getAllProductDetails }) => {

  const classes = useStyles();

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleAddCartandIncrequan = async (product) => {

    try {

      await increaseProductQuantity(product._id)

      // await addToProductCart(product)

    } catch (error) {
      console.log("error handleAddCartandIncrequan is :- ", error);
    }
  };


  const handleRemoveItemandDecrequan = async (product) => {

    try {

      await decreaseProductQuantity(product._id)

    } catch (error) {
      console.log("error handleRemoveItemandDecrequan is :- ", error);
    }
  };

  if (Cart.length > 0)
    return (
      <Grid>

        <Navbar />

        <Grid className={classes.userShoppingCart}>

          <Paper>
            {`sum of total cart price  is   =  ${TotalPrice}`}
          </Paper>

          <Grid>

            {Cart?.map((addItem, id) => {

              return (
                <Grid className={classes.userShoppingSelectedCartItem}>

                  <Card key={id}>

                    <Grid>

                      <Grid>
                        <img src={`${BASE_URL}/uploads/${addItem.ProductImage}`} alt="product image" style={{ objectFit: "contain" }} />
                        <div>{addItem.ProductName}</div>
                        <Typography>{addItem.ProductDescription}</Typography>
                      </Grid>

                      <Grid>

                        <Grid>
                          <Typography>
                            Price
                          </Typography>

                          <Grid>
                            ${addItem.ProductPrice}
                          </Grid>

                        </Grid>

                        <Grid>
                          <Typography>
                            Total Price
                          </Typography>

                          <Grid>

                            ${addItem.ProductPrice * addItem.ProductQuantity}

                          </Grid>

                        </Grid>

                        <Grid>
                          <Button
                            variant="outlined"
                            onClick={() => handleRemoveItemandDecrequan(addItem)}
                          >
                            -
                          </Button>

                          <Typography>{addItem.ProductQuantity}</Typography>

                          <Button
                            variant="outlined"
                            onClick={() => handleAddCartandIncrequan(addItem)}
                          >
                            +
                          </Button>

                        </Grid>

                      </Grid>

                    </Grid>

                  </Card>

                </Grid>
              );
            })}

          </Grid>

        </Grid>

      </Grid>
    );

  return (
    <>
      <Navbar />

      <Card className={classes.userShopingCartDetails}>
        <>
          {`Customer Shopping Details`}

          <br />
          <br />
          {`1) Total Product Item is  =   ${Cart.length}`}
          <br />
          {`2) Total Product Amount is  = ${TotalPrice}`}
          <br />
          <br />
          {`Please, Select first your shopping product item`}
        </>
      </Card>
    </>
  );
}

const mapStateToProps = (state) => {

  return {

    Cart: state.ProductReducer.cart,
    TotalPrice: state.ProductReducer.TotalPrice,

  }
};

const mapDispatchToProps = {
  addToProductCart,
  increaseProductQuantity,
  decreaseProductQuantity,
  getAllProductDetails,
};

export default connect(mapStateToProps, mapDispatchToProps)(Addcart);
