import {
  Grid,
  Paper,
  Typography,

} from "@mui/material";

import React from 'react';
import { useSelector, useDispatch, connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import { addToProductCart, getAllProductDetails } from "../action/productAction";

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({

  userNavbar: {

    "&>div:first-child": {

      "&>div": {

        width: "100%",
        padding: "10px 0px 10px 0px",

        position: "relative",

        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",

        // header sticky in scrolling .....
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        zIndex: "982",

        // mobile shopping.....
        "&>div:first-child": {

          "&>img": {
            maxWidth: "100%",
            height: "36px",
            objectFit: "contain",
            padding: "0px 0px 0px 17px",
          }
        },

        // Home and shopping Icon ...............
        "&>div:nth-child(2)": {

          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          "&>div:first-child": {
            padding: "0px 33px 0px 0px",
          },

          "&>div:nth-child(2)": {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0px 15px 0px 0px",
            cursor: "pointer",
          }

        }
      },
    },

  },

})

const Navbar = ({ Cart, addToProductCart, getAllProductDetails }) => {

  const classes = useStyles();

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handlUserHomePage = () => {

    try {

      navigate('/')

      getAllProductDetails()

    } catch (error) {
      console.log("error handlUserHomePage is :- ", error);
    }
  }

  const handleUserCartItem = () => {

    try {

      navigate("/Addcart");

    } catch (error) {
      console.log("handleUserCartItem error is :- ", error);
    }
  };

  return (
    <Grid className={classes.userNavbar}>
      <Grid>

        <Paper>

          <Grid>

            <h2>
              Mobile Shopping
            </h2>

          </Grid>

          <Grid>

            <Grid>
              <h2
                onClick={() => handlUserHomePage()}
                style={{ cursor: "pointer" }}
              >
                Home
              </h2>
            </Grid>

            <Grid>

              <Grid>
                <ProductionQuantityLimitsIcon
                  color="primary"
                  aria-label="add to shopping cart"
                  variant="outline-primary"
                  className="Addshopingcart"
                  onClick={() => handleUserCartItem()}
                >
                </ProductionQuantityLimitsIcon>
              </Grid>

              <Grid
                onClick={() => handleUserCartItem()}
              >

                <span>
                  {Cart.length}
                </span>

              </Grid>

            </Grid>

          </Grid>

        </Paper>

      </Grid>
    </Grid>
  );
}


const mapStateToProps = (state) => {

  return {

    Cart: state.ProductReducer.cart,
  }
};

const mapDispatchToProps = {
  addToProductCart,
  getAllProductDetails,
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
