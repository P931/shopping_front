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
import { BASE_URL } from '../services/Helper';
import { addToProductCart, increaseProductQuantity, decreaseProductQuantity, getAllProductDetails } from "../action/productAction";

const useStyles = makeStyles({

  userShoppingCartItem: {

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",

    // card........
    "&>div": {

      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "27px 9px 25px 9px",

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
  }

})

const CartItem = ({
  prop,
  addToProductCart,
  increaseProductQuantity,
  decreaseProductQuantity,
  getAllProductDetails,

}) => {

  const { ProductName, _id, ProductImage, ProductPrice, ProductQuantity, ProductDescription, } = prop


  const classes = useStyles();

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleUserAddToShoppingCart = async (product) => {

    try {

      await addToProductCart(product)

      getAllProductDetails()

    } catch (error) {
      console.log("error handleUserAddToShoppingCart is :- ", error);
    }
  }


  return (
    <Grid className={classes.userShoppingCartItem}>

      <Card key={_id}>

        <Grid>

          <Grid>
            <img src={`${BASE_URL}/uploads/${ProductImage}`} alt="" className="image" style={{ objectFit: "contain" }} />
            <div>{ProductName}</div>
            <Typography>{ProductDescription}</Typography>
          </Grid>

          <Grid>

            <Grid>
              <Typography>
                Price
              </Typography>

              <Grid>
                ${ProductPrice}
              </Grid>

            </Grid>

            <Grid>

              <Button
                variant="outlined"
                onClick={() => handleUserAddToShoppingCart(prop)}
              >
                Add To Cart
              </Button>

            </Grid>

          </Grid>

        </Grid>

      </Card>

    </Grid>
  );
}


const mapStateToProps = (state) => {

  return {

    productCart: state.ProductReducer.Product,

  }
};

const mapDispatchToProps = {
  addToProductCart,
  increaseProductQuantity,
  decreaseProductQuantity,
  getAllProductDetails,
};

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
