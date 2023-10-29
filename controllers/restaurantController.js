const Member = require("../models/Member");
const Product = require("../models/Product");

let restaurantController = module.exports;

restaurantController.home = (req, res) => {
  try {
    console.log("GET/home");
    res.render('home-page');

  }catch(err){
    console.log(`ERROR, cont/home, ${err.message}`);
    res.json({ state: "fail", message: err.message });

  }
}  

restaurantController.getMyRestaurantProduct = async (req, res) => {
  try {
    console.log("GET: cont/getMyRestaurantProduct");
  
    const product = new Product();
    const data = await product.getAllProductDataResto(res.locals.member);


    res.render("restaurant-menu", {restaurant_data: data});
  } catch (err) {
    console.log(`ERROR, cont/getMyRestaurantProduct, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
}; 

restaurantController.getSignupMyRestaurant = async (req, res) => {
  try {
    console.log("GET: cont/getSignUpMyRestautant");
    res.render("signup");
  } catch (err) {
    console.log(`ERROR, cont/getSignUpMyRestautant, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

restaurantController.signupProcess = async (req, res) => {
  try {
    console.log("POST: cont/signup");
    const data = req.body;
    console.log("body:::", req.body);

    const member = new Member(),
      new_member = await member.signupData(data);

    req.session.member = new_member;
    res.redirect("/resto/products/menu");
  } catch (err) {
    console.log(`ERROR, cont/signup, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

restaurantController.getLoginMyRestaurant = async (req, res) => {
  try {
    console.log("GET: cont/getLoginMyRestaurant");
    res.render("login-page");
  } catch (err) {
    console.log(`ERROR, cont/getLoginMyRestaurant, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

restaurantController.loginProcess = async (req, res) => {
  try {
    console.log("POST: cont/login");
    const data = req.body;
    // console.log("body:::", req.body);
    (member = new Member()), (result = await member.loginData(data));

    req.session.member = result;
    req.session.save(function () {
      res.redirect("/resto/products/menu");
    });
  } catch (err) {
    console.log(`ERROR, cont/login, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

restaurantController.logout = (req, res) => {
  console.log("GET cont/logout");
  res.send("Logout sahifadasiz");
};

restaurantController.validateAuthRestaurant = (req, res, next) => {
  if (req.session?.member?.mb_type === "RESTAURANT") {
    req.member = req.session.member;
    next();
  } else
    res.json({
      state: "fail,",
      message: "only authenticated members with restaurant type",
    });
};

restaurantController.checkSessions = (req, res) => {
  if (req.session?.member) {
    res.json({ state: "succeed", data: req.session.member });
  } else {
    res.json({ state: "fail", message: "You are not authenticated" });
  }
};
