import pgPromise from "pg-promise";
import "dotenv/config";
import query from "../backEndFunctions/query.js";
import axios from "axios";

// import shoeIdClick from "../extractingFromFront.js";
//console.log(shoeIdClick)


const connectionString = process.env.DATABASE_URL;
const pgp = pgPromise();
const db = pgp(connectionString);
const queryFunction = query(db);

export default function render() {
  //DATA FROM QUERIES SENT AS JSON
  async function getAllAPIShoes(req, res, next) {
    try {
      const data = await queryFunction.showAllShoes();

      res.json(data);
    } catch (error) {
      next(error);
    }
  }
  async function filterByBrandColorSizeAPI(req, res, next) { 
    try {
      const brand = req.params.brandname
      const color = req.params.shoecolor
      const size = req.params.shoesize

      const data = await queryFunction.filterByBrandColorSize(brand, color, size);
        
      res.json(data)
      } catch (error) {
        next(error)
      }
  }
  async function filterByBrandColorAPI(req, res, next) {
    try {
       const brand = req.params.brandname;
       const color = req.params.shoecolor;
      
      const data = await queryFunction.filterByBrandColor(brand, color);
      
      res.json(data)
    } catch (error) {
      next(error)
    }
  }
  async function filterByBrandSizeAPI(req, res, next) {
    try {
       const brand = req.params.brandname;
       const size = req.params.shoesize;
      
       const data = await queryFunction.filterByBrandSize(brand, size)
      
      res.json(data)
    } catch (error) {
      next(error)
    }
  }
  async function filterByColorSizeAPI(req, res, next) {
    try {
       const color = req.params.shoecolor;
       const size = req.params.shoesize;
      
      const data = await queryFunction.filterByColorSize(color, size)

      res.json(data)
    } catch (error) {
      next(error)
    }
  }
  async function filterByBrandAPI(req, res, next) {
    try {
      const brand = req.params.brandname;
      const data = await queryFunction.filterByBrand(brand);

      res.json(data);
    } catch (error) {
      next(error);
    }
  }
  async function filterBySizeAPI(req, res, next) {
    try {
      const size = req.params.shoesize;
      const data = await queryFunction.filterBySize(size);

      res.json(data);
    } catch (error) {
      next(error);
    }
  }
  async function filterByColorAPI(req, res, next) {
    try {
      const color = req.params.shoecolor;
      const data = await queryFunction.filterByColor(color);

      res.json(data);
    } catch (error) {
      next(error);
    }
  }

 
  async function getCartAPI(req, res, next) {
    try {
      const username = req.body.username;
      const userId = await db.manyOrNone(
        "SELECT id FROM users WHERE username = $1",
        [username]
      );
      // const shoeIdRef = req.body.shoeId
      const shoeId = shoeId1
      

      const quantity = 1

      const data = await queryFunction.addToCart(userId, shoeId, quantity)

      

      res.json(data)
    } catch (error) {
      next(error)
    }
   }
  //  console.log('ID1:', shoeId1)

  //----DATA FROM QUERIES SENT AS JSON------

  //END-POINTS ACCESSING THE JSON
  async function displayAllShoes() {
    try {
      const response = await axios.get("https://shoeshop-ess4.onrender.com/api/shoes");

      return response.data;
    } catch (error) {
      throw error;
    }
  }
  async function displayFilteredByBrandColorSize(brand, color, size) {
    try {
      const response = await axios.get(
        `https://shoeshop-ess4.onrender.com/api/shoes/brand/${brand}/color/${color}/size/${size}`
      );
      
      return response.data
    } catch (error) {
      throw error
    }
  }
  async function displayFilteredByBrandSize(brand, size) {
    try {
      const response = await axios.get(
        `https://shoeshop-ess4.onrender.com/api/shoes/brand/${brand}/size/${size}`
      );
      
      return response.data
    } catch (error) {
      throw error
    }
  }
  async function displayFilteredByBrandColor(brand, color) {
    try {
      const response = await axios.get(
        `https://shoeshop-ess4.onrender.com/api/shoes/brand/${brand}/color/${color}`
      );
      
      return response.data
    } catch (error) {
      throw error
    }
  }
  async function displayFilteredByColorSize(color, size) {
    try {
       const response = await axios.get(
      `https://shoeshop-ess4.onrender.com/api/shoes/color/${color}/size/${size}`
    );
    
    return response.data
    } catch (error) {
      throw error
    }
   
  }
  async function displayFilteredByBrand(brand) {
    try {
      const response = await axios.get(
        `https://shoeshop-ess4.onrender.com/api/shoes/brand/${brand}`
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  }
  async function displayFilteredBySize(size) {
    try {
      const response = await axios.get(
        `https://shoeshop-ess4.onrender.com/api/shoes/size/${size}`
      );

      return response.data
    } catch (error) {
      throw error
    }
  }
  async function displayFilteredByColor(color) {
    try {
      const response = await axios.get(
        `https://shoeshop-ess4.onrender.com/api/shoes/color/${color}`
      );

      return response.data
    } catch (error) {
      throw error
    }
  }
  async function displayCart() {
    try {
      const response = await axios.get(`https://shoeshop-ess4.onrender.com/api/cart`);
      
      return response.data
    } catch (error) {
      throw error
    }
  }
  //------END-POINTS ACCESSING THE JSON -------

  //RENDERING THE PAGES /& DATA FROM END-POINTS
  async function allShoes(req, res, next) {
    try {
      const response = await displayAllShoes();
      //  console.log(response)
      res.render("allshoes", { response});
     
    } catch (error) {
      next(error);
    }
  }
  async function filterShoes(req, res, next) {
    try {
      const brand = req.body.brand;
      const size = req.body.size;
      const color = req.body.color;
      
      if (brand !== "all" && size !== "all" && color !== "all") {
        const response = await displayFilteredByBrandColorSize(brand, color, size);
        // console.log(response);
        res.render("allshoes", { response });
      } else if (brand !== "all" && color !== "all") {
        const response = await displayFilteredByBrandColor(brand, color)
        res.render("allshoes", {response})
      } else if (brand !== "all" && size !== "all") {
        const response = await displayFilteredByBrandSize(brand, size)
        res.render("allshoes", {response})
      } else if (color !== "all" && size !== "all") {
        const response = await displayFilteredByColorSize(color, size)
        res.render("allshoes", {response})
      } else if (brand !== "all") {
        const response = await displayFilteredByBrand(brand);
        res.render("allshoes", { response });
      } else if (size !== "all") {
        const response = await displayFilteredBySize(size);
        res.render("allshoes", { response });
      } else if (color !== "all") {
        const response = await displayFilteredByColor(color);
        res.render("allshoes", { response })
      }
    } catch (error) {
      next(error)
    }
  }

  async function signUp(req, res, next) {
    try {
      res.render("signup");
    } catch (error) {
      next(error);
    }
  }
  async function signUpLogic(req, res, next) {
    try {
     let name = req.body.username;
     let password = req.body.password;
     let confirm = req.body.confirm_password;
    
     const signUpMsg = await queryFunction.signup(name, password, confirm)

      res.render("signup", { signUpMsg });
   } catch (error) {
    next(error)
   }
 }

  async function login(req, res, next) {
    try {
      res.render("login");
    } catch (error) {
      next(error);
    }
  }

  let userName = ''
  async function loginLogic(req, res, next) {
    try {
      const username = req.body.username;
      const password = req.body.password;
      userName = username;

      let role = await queryFunction.login(username, password)

      if (username && password && role === 'Client') {
        res.redirect(`/shop/${username}`)
      }else if (username && password && role === 'Admin') {
        res.redirect('/admin')
      }
      
    } catch (error) {
      next(error)
    }
  }

  let items = ''
  let shoeId1;
  let cartItemsId;
  let userid;

  async function addToCart(req, res, next) {
    try {

      if (userName == '') {
        res.redirect('/login')
      } else {
        const userId = await db.oneOrNone(
          "SELECT id FROM users WHERE username = $1",
          [userName]
        );


        userid = userId.id;

        const quantity = 1;
        shoeId1 =  Math.floor(Math.random() * 12) + 1;

        // console.log('ID', shoeId1)
        
        items = await queryFunction.addToCart(userid, shoeId1, quantity);
        // console.log(items);

        cartItemsId = await queryFunction.getCart(userid)

        console.log(cartItemsId)

        //return uniqueIds;
      
        res.redirect(`/shop/${userName}`);
      }
       
    } catch (error) {
      next(error)
    }
  }

 

  async function cart(req, res, next) {
    try {
      res.render("cart", { cartItemsId });
      // console.log(items)
    } catch (error) {
      next(error);
    }
  }

  async function checkoutCart(req, res, next){
    try {
      const userId2 = await db.oneOrNone(
        "SELECT id FROM users WHERE username = $1",
        [userName]
      );


      let useridd = userId2.id;
      cartItemsId = await queryFunction.clearCart(useridd)

      res.render("cart", { cartItemsId });
    } catch (error) {
      next(error)
    }
  }
  async function admin(req, res, next) {
    try {
      res.render("admin");
    } catch (error) {
      next(error);
    }
  }
  //---------RENDERING THE PAGES /& DATA FROM END-POINTS-------

  return {
    signUp,
    signUpLogic,
    login,
    loginLogic,
    allShoes,
    addToCart,
    displayCart,
    cart,
    admin,
    getAllAPIShoes,
    displayAllShoes,
    filterByBrandColorSizeAPI,
    displayFilteredByBrandColorSize,
    filterByBrandColorAPI,
    displayFilteredByBrandColor,
    filterByBrandSizeAPI,
    displayFilteredByBrandSize,
    filterByColorSizeAPI,
    displayFilteredByColorSize,
    filterByBrandAPI,
    displayFilteredByBrand,
    filterBySizeAPI,
    displayFilteredBySize,
    filterByColorAPI,
    displayFilteredByColor,
    filterShoes,
    getCartAPI,
    checkoutCart
  };
}
