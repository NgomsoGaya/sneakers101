export default function query(db) {
  async function signup(username, password, confirm) {
    if (username && password && confirm) {
      const existingUser = await db.oneOrNone(
        "SELECT * FROM users WHERE username = $1",
        username
      );
      if (existingUser) {
        return "Username already exists";
      } else if (!existingUser) {
        if (password === confirm) {
          await db.none(
          "INSERT INTO users (username, password, role) VALUES ($1, $2, $3)",
          [username, password, 'Client']
        );
        return "Sign-up successful";
        }
      }
    }
    return "Sign-up failed";
  }

  async function login(username, password) {
    let role = null;

    if (username && password) {
      const user = await db.oneOrNone(
        "SELECT role FROM users WHERE username = $1 AND password= $2",
        [username, password]
      );

      if (user) {
        role = user.role;
      }
    }
    return role;
  }

  async function showAllShoes() {
        const shoes = await db.many("SELECT * FROM shoes")
        return shoes;
  }

  async function filterByBrandColorSize(brand, color, size) {
    const BCSfilteredShoes = await db.manyOrNone("SELECT * FROM shoes WHERE brand = $1 AND color = $2 AND size = $3", [brand, color, size])

    return BCSfilteredShoes;
  }

  async function filterByBrandColor(brand, color) {
    const BCfilteredshoes = await db.manyOrNone("SELECT * FROM shoes WHERE brand = $1 AND color = $2", [brand, color])
    
    return BCfilteredshoes;
  }

  async function filterByColorSize(color, size) {
    const CSfilteredshoes = await db.manyOrNone("SELECT * FROM shoes WHERE color = $1 AND size = $2", [color, size])

    return CSfilteredshoes;
  }

  async function filterByBrandSize(brand, size) {
    const BSfilteredshoes = await db.manyOrNone("SELECT * FROM shoes WHERE brand = $1 AND size = $2", [brand, size])

    return BSfilteredshoes;
  }

  async function filterByBrand(brand) {
    const brandFilteredShoes = await db.manyOrNone(
      "SELECT * FROM shoes WHERE brand = $1",
      [brand]
    )

    return brandFilteredShoes;
  }

  async function filterBySize(size) {
    const sizeFilteredShoes = await db.manyOrNone("SELECT * FROM shoes WHERE size = $1", [size]);
    
    return sizeFilteredShoes;
  }

  async function filterByColor(color) {
    const colorFilteredShoes = await db.many(
      "SELECT * FROM shoes WHERE color = $1",
      [color]
    )

    return colorFilteredShoes;
  }

  async function addToCart(userId, shoeId, quantity) {
    const inStock = await db.manyOrNone("SELECT instock FROM shoes WHERE shoe_id = $1", [shoeId])

    if (quantity > inStock) {
      return "Not enough items in the shop."
    }

    await db.none("INSERT INTO cart (shoe_id, user_id, quantity) VALUES ($1, $2, $3)", [shoeId, userId, quantity])

    const cartItems = await db.manyOrNone(
      "SELECT * FROM cart WHERE  user_id = $1",
      [userId]
    );
    
    return cartItems;
  }
  async function getCart (userId){
   let shoeInCartId =  await db.any("select shoe_id from cart where user_id = $1", [userId])
  // console.log(shoeInCartId)
  let uniqueIds = [];
    
  shoeInCartId.forEach(item => {
      if (!uniqueIds.includes(item.shoe_id)) {
          uniqueIds.push(item.shoe_id);
      }
  });

  let shoesInCart = []
  for (let i = 0; i < uniqueIds.length; i++) {
   
     shoesInCart.push( await db.any( 'SELECT * FROM shoes WHERE shoe_id = $1',[uniqueIds[i]]))
  }

 
 return shoesInCart;
  }

  async function clearCart(userId){

   await db.none('delete from cart where user_id =$1', [userId])

  }

  return {
    signup,
    login,
    showAllShoes,
    filterByBrandColorSize,
    filterByBrandColor,
    filterByColorSize,
    filterByBrandSize,
    filterByBrand,
    filterBySize,
    filterByColor,
    addToCart,
    getCart,
    clearCart
  };
}