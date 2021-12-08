const Home = {
    template:'#home',
    name: 'Home',
    data:() => {
        return {
            products,
            searchKey:'',
            liked:[],
            cart:[]
        }
    },
    computed:{
       filteredList(){
           return this.products.filter((product) => {
             return  product.description.toLowerCase().includes(this.searchKey.toLowerCase())
           })
       },
       getLikeCookie(){
           let cookieValue = JSON.parse($cookies.get('like'))
           cookieValue == null ? this.liked = [] : this.liked = cookieValue;
       },
       cartTotalAmount(){
           let total = 0;
           for (let item in this.cart) {
                total = total + (this.cart[item].quantity * this.cart[item].price)
           }
           return total;
       },
       itemTotalAmount(){
           let itemTotal = 0;
           for (const item in this.cart) {
               itemTotal = itemTotal + (this.cart[item].quantity);
           }
           return itemTotal;
       }
    },
    methods:{
      setLikeCookie(){
          document.addEventListener('input',()=> {
              setTimeout(() => {
                  $cookies.set('like', JSON.stringify(this.liked));
                  
              }, 300);
          })
      },
      addToCard(product){
          for (let i = 0; i < this.cart.length; i++) {
             if(this.cart[i].id === product.id){
                 return this.cart[i].quantity++
             }
              
          }
        this.cart.push({

            id:product.id,
            img:product.img,
            description:product.description,
            price:product.price,
            quantity: 1
        })
      },
      cartPlusOne(product){
          product.quantity = product.quantity +1;
      },
      cartMinusOne(product,id){
         if(product.quantity == 1){
             this.cartRemoveItem(id);
         }else{
             product.quantity = product.quantity-1
         }
      },
      cartRemoveItem(id){
        this.$delete(this.cart, id)
    }
    },
    mounted:()=> {
        this.getLikeCookie;
    }
}

const UserSetting = {
    template:'<h1>User Setting</h1>',
    name: 'UserSetting'
}

const WishList = {
    template:'<h1>Wish List</h1>',
    name: 'WishList'
}

const ShoppingCart = {
    template:'<h1>Shopping Cart</h1>',
    name: 'ShoppingCart'
}

//router
const router = new VueRouter({
    routes:[
        { path: '/', component: Home , name: 'home'},
        { path: '/user-setting', component: UserSetting ,name: 'UserSetting' },
        { path: '/wish-list', component: WishList ,name: 'WishList'},
        { path: '/shopping-cart', component: ShoppingCart, name: 'ShoppingCart'},
    ]
})

 vue = new Vue ({
  router


})

vue.$mount('#app')