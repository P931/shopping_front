import {
  Grid,
  Button,
  Paper,
  Input,
  Typography,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,

} from "@mui/material";

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch, connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { makeStyles, } from '@mui/styles';
import CartItem from "./CartItem";
import loader from "../assest/loader.svg";
import { BASE_URL } from '../services/Helper';
import { createProduct, getAllProductDetails } from "../action/productAction";

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const useStyles = makeStyles({

  userShoppingCart: {

    "&>div": {

      "&::-webkit-scrollbar": {
        display: "none",
      },

      "&>div:first-child": {

        "&>button": {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "24px 0px 19px 19px",
          position: "fixed",

          top: "85PX",
          left: "10PX",
          zIndex: "982",
        }
      },

      // product items 
      "&>div:nth-child(2)": {
        gap: "10px",

        display: "flex",
        flexWrap: "wrap",
        margin: "171px 8px 0px 12px",

        overflowY: "auto",
        height: "500px",

        "&::-webkit-scrollbar": {
          display: "none",
        },

        "&>div": {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "2%",
          width: "27%",

          '@media (max-width: 768px)': {
            width: "100%",
          },
        }
      },

      '@media (max-width: 2200px)': {

        "&>div:nth-child(2)": {
          height: 'calc(100vh - 171px) !important',
        }
      },

      '@media (max-width: 768px)': {

        "&>div:nth-child(2)": {
          // maxHeight: 'calc(100vh - 171px) !important',
          height: 'calc(100vh - 171px) !important',
        }
      },

      '@media (max-width: 1024px)': {

        "&>div:nth-child(2)": {
          height: 'calc(100vh - 171px) !important',
        }
      },

      '@media (max-width: 1440px)': {

        "&>div:nth-child(2)": {
          height: 'calc(100vh - 171px) !important',
        }
      },
    }
  },


  userProdtDialogContainer: {

    "&>div:nth-child(3)": {

      // MuiDialog MuiPaper ..................
      "&>div:first-child": {
        boxShadow: "0px 11px 74px 0px rgba(0, 0, 0, 0.35)",
        padding: "14px 10px 12px 10px",
        borderRadius: "20px",
        width: "100%",

        '&::-webkit-scrollbar': {
          display: 'none',
        },

        "&>div:nth-child(2)": {

          // Submit button ............
          "&>button": {

            margin: "0 auto 0px",
            color: "#fff",
            padding: "12px 30px",
            fontSize: "15px",
            fontWeight: "600",
            letterSpacing: "1.5px",
            background: "#191919",
            position: "relative",
            zIndex: "2",
            borderRadius: "5px",
            transition: "all 0.5s ease-out",
            display: "block",
            width: "fit-content",
            whiteSpace: "nowrap",
            border: "none",
          }

        },
      }
    }
  },


  userProductDialogContent: {

    "&>div": {

      "&>p:first-child": {

        display: "block",
        fontSize: "24px",
        fontWeight: "600",
        margin: "0px 0px 15px 0px",

      },

      "&>div:nth-child(2)": {

        // five text field divs
        "&>div": {
          padding: "0px 0px 11px 0px",

          "&>div": {
            padding: "0px 0px 5px 0px",

            '& .MuiInput-input': {
              '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
                // remove the up and down icon in mobileField
                '-webkit-appearance': 'none',
              },
            },
          },
        },

        "&>div:nth-child(4)": {
          display: "flex",
          justifyContent: "space-between",

          "&>img": {
            padding: "8px 0px 0px 15px",
          }
        },
      }
    }
  }

})

const Cart = ({ productCart, setProductData, getAllProductDetails, createProduct }) => {

  const classes = useStyles();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userAddNewProductCart, setUserAddNewProductCart] = useState(false);

  const [userProductImg, setUserProductImg] = useState()
  const [userProductImgValidation, setUserProductImgValidation] = useState(false)


  // create date
  const [employeeSelectApplyFromDate, setEmployeeSelectApplyFromDate] = useState(null);
  const [openEmployeeApplyFromDatePicker, setOpenEmployeeApplyFromDatePicker] = useState(false);
  const [employeeApplyFromDateValidation, setEmployeeApplyFromDateValidation] = useState(false)


  const [userProductDetail, setUserProductDetail] = useState({
    ProductName: "",
    ProductQuantity: "",
    ProductPrice: "",
    ProductSize: "",
    ProductColor: "",
    ProductImage: null,
    ProductCreated: "",
  })

  const [userProductDetailValidation, setUserProductDetailValidation] = useState(false)

  const handleUserShoppingProductDetails = (e) => {

    setUserProductDetail({
      ...userProductDetail,
      [e.target.name]: e.target.value
    })


    if (e.target.files) {

      const file = e.target.files[0];

      const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/svg+xml", "image/apng", "image/avif", "image/gif", "image/webp"];

      if (allowedTypes.includes(file.type)) {

        setUserProductDetail({ ...userProductDetail, ProductImage: e.target.files[0] })
        setUserProductImg(URL.createObjectURL(file))

        setUserProductImgValidation(false)

      } else {
        setUserProductImgValidation(true)
      }
    }
  }


  const handleUserOpenProductDialogBox = () => {

    setUserAddNewProductCart(true)

    setUserProductDetail({
      ProductName: "",
      ProductQuantity: "",
      ProductPrice: "",
      ProductSize: "",
      ProductColor: "",
      ProductImage: null,
      ProductCreated: "",
    })

    setUserProductImg()

    setUserProductDetailValidation(false)
  }


  const handlerEmployeeSelectApplyFromDate = (newValue) => {

    setEmployeeSelectApplyFromDate(newValue)

    // starting date picker valdiation
    setEmployeeApplyFromDateValidation(true)
  }

  const handleUserProductCloseDialogBox = () => {

    setUserAddNewProductCart(false)
  }


  const handleUserProductSubmitBtn = async () => {

    try {

      const formData = new FormData()
      formData.append('ProductName', userProductDetail.ProductName);
      formData.append('ProductSize', userProductDetail.ProductSize);
      formData.append('ProductColor', userProductDetail.ProductColor);
      formData.append('ProductImage', userProductDetail.ProductImage);
      formData.append('ProductQuantity', userProductDetail.ProductQuantity);
      formData.append('ProductPrice', userProductDetail.ProductPrice);
      // formData.append('ProductDescription', userProductDetail.ProductDescription);

      const config = {
        headers: {
          // "Accept": "application/json, text/plain, */*",
          "Content-Type": "multipart/form-data"
        }
      }

      if (userProductDetail.ProductName !== "" && userProductDetail.ProductSize !== "" && userProductDetail.ProductQuantity !== "" &&
        userProductDetail.ProductColor !== "" && userProductDetail.ProductImage !== null && userProductImg &&
        userProductDetail.ProductPrice !== ""
        // userProductDetail.ProductDescription !== ""
      ) {

        // const res = createProduct(formData)

        const res = await createProduct(formData)

        // all product cart
        await getAllProductDetails()

        if (res && res.status === 201) {

          await getAllProductDetails()

          setUserProductDetail({
            ProductName: "",
            ProductQuantity: "",
            ProductPrice: "",
            ProductSize: "",
            ProductColor: "",
            ProductImage: null,
            ProductCreated: "",
          })

          setUserProductImg()

          setUserAddNewProductCart(false)
          setUserProductDetailValidation(false)

          setEmployeeApplyFromDateValidation(false)

        } else {

          setUserProductDetailValidation(true)

          setUserAddNewProductCart(false)

          getAllProductDetails()
        }

      } else {

        setUserProductDetailValidation(true)

        setEmployeeApplyFromDateValidation(true)
      }

    } catch (error) {
      setUserProductDetailValidation(true)
      setEmployeeApplyFromDateValidation(true)
      console.log("error handleUserProductSubmitBtn is :- ", error);
    }
  }

  useEffect(() => {

    getAllProductDetails()

  }, []);

  return (
    <Grid className={classes.userShoppingCart}>

      <Grid>

        <Grid>
          <Button
            variant="contained"
            onClick={() => {
              handleUserOpenProductDialogBox()
            }}
          >
            Add New Cart
          </Button>
        </Grid>

        <Dialog
          open={userAddNewProductCart}
          onClose={() => handleUserProductCloseDialogBox()}
          className={classes.userProdtDialogContainer}
        >
          <Grid>
            <DialogContent className={classes.userProductDialogContent}>

              <Grid>

                <Typography>
                  Product Details
                </Typography>

                <Grid>

                  <Grid>

                    <TextField
                      error={userProductDetailValidation === false ? "" : !userProductDetail.ProductName}
                      helperText={userProductDetailValidation === false ? "" : !userProductDetail.ProductName && "Please enter product name"}

                      autoFocus
                      label="Product Name"
                      fullWidth
                      variant="standard"
                      placeholder="Product Name"

                      name="ProductName"
                      value={userProductDetail.ProductName}
                      onChange={(e) => handleUserShoppingProductDetails(e)}

                    />
                  </Grid>

                  <Grid>

                    <TextField
                      error={userProductDetailValidation === false ? "" : !userProductDetail.ProductSize}
                      helperText={userProductDetailValidation === false ? "" : !userProductDetail.ProductSize && "Please enter product size"}

                      autoFocus
                      fullWidth
                      label="Product Size"
                      variant="standard"

                      placeholder="Product Size"
                      // type="number"

                      name="ProductSize"
                      value={userProductDetail.ProductSize}
                      onChange={(e) => handleUserShoppingProductDetails(e)}

                    />

                  </Grid>

                  <Grid>

                    <TextField
                      error={userProductDetailValidation === false ? "" : !userProductDetail.ProductQuantity}
                      helperText={userProductDetailValidation === false ? "" : !userProductDetail.ProductQuantity && "Please enter product quantity"}

                      autoFocus
                      fullWidth
                      label="Product quantity"
                      variant="standard"

                      placeholder="Product quantity"
                      // type="number"

                      name="ProductQuantity"
                      value={userProductDetail.ProductQuantity}
                      onChange={(e) => handleUserShoppingProductDetails(e)}

                    />

                  </Grid>

                  <Grid>

                    <TextField
                      error={userProductDetailValidation === false ? "" : !userProductDetail.ProductPrice}
                      helperText={userProductDetailValidation === false ? "" : !userProductDetail.ProductPrice && "Please enter product price"}

                      autoFocus
                      fullWidth
                      label="Product Price"
                      variant="standard"

                      placeholder="Product Price"
                      // type="number"

                      name="ProductPrice"
                      value={userProductDetail.ProductPrice}
                      onChange={(e) => handleUserShoppingProductDetails(e)}

                    />

                  </Grid>

                  <Grid>

                    <TextField
                      error={userProductDetailValidation === false ? "" : !userProductDetail.ProductColor}
                      helperText={userProductDetailValidation === false ? "" : !userProductDetail.ProductColor && "Please enter product color"}

                      autoFocus
                      fullWidth
                      label="Product Color"
                      variant="standard"
                      placeholder="Product Color"

                      name="ProductColor"
                      value={userProductDetail.ProductColor}
                      onChange={(e) => handleUserShoppingProductDetails(e)}

                    />

                  </Grid>

                  <Grid>

                    <Input
                      id='ProductImage'
                      name='ProductImage'
                      // accept="image/*"
                      // accept=".png, .jpg, .jpeg"
                      accept="image/png, image/gif, image/jpeg"
                      type='file'
                      onChange={(e) => handleUserShoppingProductDetails(e)}
                    />

                    <img alt="product image" src={userProductImg} width={100} height={100} />

                    {userProductDetailValidation === false && userProductImgValidation === false ? "" : !userProductImg && (
                      <Typography variant="caption" color="error">
                        Please select a product image
                      </Typography>
                    )}

                  </Grid>

                  <Grid>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={['DatePicker', 'DatePicker']}>
                        <DatePicker
                          // required

                          // onError={(newError) => setError(newError)}

                          disablePast
                          style={{ cursor: "pointer" }}

                          open={openEmployeeApplyFromDatePicker}
                          onClose={() => setOpenEmployeeApplyFromDatePicker(false)}

                          slotProps={{
                            textField: {
                              onClick: () => setOpenEmployeeApplyFromDatePicker(true),

                              error: employeeApplyFromDateValidation === false ? "" : !employeeSelectApplyFromDate,
                              helperText: employeeApplyFromDateValidation === false ? "" : !employeeSelectApplyFromDate && "Please select the from date",
                            }
                          }}
                          // label="Bond Start Date"
                          // label="dd-mm-yyyy"
                          placeholder="dd-mm-yyyy"
                          format="DD/MM/YYYY"
                          value={employeeSelectApplyFromDate}
                          onChange={(newValue) => handlerEmployeeSelectApplyFromDate(newValue)}

                        />
                      </DemoContainer>
                    </LocalizationProvider>

                  </Grid>

                </Grid>

              </Grid>

            </DialogContent>
          </Grid>

          <DialogActions>
            <Button
              variant="outlined"
              onClick={() => {
                handleUserProductSubmitBtn()
              }}
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>

        <Grid>

          {productCart?.productData ?
            (
              productCart?.productData?.map((item, key) => {

                return (
                  <Grid>

                    <CartItem prop={item} userProductImg={userProductImg} key={key} />

                  </Grid>
                )
              })
            )
            : (
              <Grid
                style={{ display: "block", marginLeft: "auto", marginRight: "auto", width: "40%" }}
              >
                <img
                  alt="product loading.."
                  src={loader}
                  width={100}
                  height={100}
                  style={{
                    display: "block",
                    marginLeft: "auto",
                    marginRight: "auto",
                    width: "40%",
                  }}
                />
              </Grid>
            )
          }
        </Grid>
      </Grid>

    </Grid>
  );
}


const mapStateToProps = (state) => {

  return {

    productCart: state.ProductReducer.Product,
  }
};

const mapDispatchToProps = {
  getAllProductDetails,
  createProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
