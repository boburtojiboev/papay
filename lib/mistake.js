class Definer {
    /** general error */
static general_err1 = "att: something went wrong!";
static general_err2 = "att: there is no data with that params!";
static general_err3 = "att: file upload error!";
    /** member  auth related err */
static auth_err1 = "att: mangodb validation is failed!";
static auth_err2 = "jwt token creation error"
static auth_err3 = "att: no member with that mb_nick!";
static auth_err4 = "att: your creadentials do not match!";
static auth_err5 = "Att: you are not authenticated!";

 /** product  related err*/
 static product_err1 = "att: product creation is failed!";

   /** order related errors */
   static order_err1 = "Att: order creation is falied";
   static order_err2 = "Att: order items creation is falied";
}

module.exports = Definer;