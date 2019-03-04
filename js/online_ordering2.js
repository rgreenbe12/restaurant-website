

//this function gets the cost, quantity, and name for a selection the user adds to the cart (by id). That id will be the argument to this function.
//name it whatever you want, as long as you call that argument name again within your DOM manipulations, inside the function's code.
  function getSingleItemDetails(item) {  //the argument is a generic name we choose; it could be 'cow' as long as inside
                          // function code its 'cow.getElementsByClassName' -- the argument value basically changes
                                        //for each time the client adds a food selection to cart....the argument could be 
                                        //'ramen' or'yellownoodlesoup' -- it simply refers to the id that was placed
                                        //on the div that holds the food selections, the other classes, and the
                                        //input name and value attributes (in menu-practice.html)
                                        //usually its document.getElementsByClassName 
                                        //but here I call item.getElementsByClassName because I am referring
                                        //to the element 'item' in the document. 
      var costElement = item.getElementsByClassName('cost')[0]; //the 'cow' argument (which stands for the item's unique id in the html...see above) 
                                                              //has class elements within it, which is why
                                                                //we search in 'cow' and not 'document' to get our values.
                                                                //this code gets the 'cost' class within the 'ramen' div id or whatever
                                                                //other div id the user selected to add to cart
                                                                //there is only one instance of the cost class to put in the collection,
                                                                //so we show this by adding [0] otherwise the code turns up as NaN
      var quantityElement = item.getElementsByClassName('quantity')[0];
      var nameElement = item.getElementsByClassName('name')[0]; //WE ARE PREPARING THE VARIABLES 
                                                                //FROM THE FORM INPUTS AND ATTRIBUTES IN THE HTML

      //WE ARE CREATING AN OBJECT AND STICKING THOSE VARIABLE VALUES IN IT, USING NAME/VALUE PAIRS 
      var data = { cost: +costElement.innerHTML, quantity: +quantityElement.value, name: nameElement.innerHTML };
      return data; //return the newly-created object. We will use it in the next function
  }


 var cart = []; //create empty array for cart -- we'll pass in items and their details
 

  //this function runs each time the 'add to cart' button is clicked
  //we pass the id of the element of class 'item' into the function
  function addItemToCartById(id) { //the argument is a generic name we choose; 
                                    //it corresponds to the specific menu item's id that was passed as the argument, in the html doc
                                  //notice how the argument in the prior function was the element that getElementsByClassName acted on,
                                  //while here, the argument is passed to getElementsById as the id we want to find.
                                  //and remember, that id we want to find is specified in the html doc, and it changes
                                  //from menu item to menu item

      var item = document.getElementById(id); //look up the item element by its id
                                            //and set it equal to var item 

      var data = getSingleItemDetails(item); //now that we have created and defined 'var item,' we pass it into the
                                              //previously defined function, getSingleItemDetails, in order to 
                                              //parse the customer's selection into name/value pairs

      cart.push(data); //add the data details for each item to the cart  -- we will use this cart array in the next function

  }


  //this is called when the Show Cart button is clicked
  //it loops through the cart array (defined on line 32) and parses out the details of each item that was added
  function showCart() {
    document.getElementById("cart").style.display = "block"; //change the cart to display bc in the css it is hidden
    var delivery_total = 0; // initialize total amount user will pay to 0
    for (var i = 0; i < cart.length; i++) { 
        var data = cart[i]; //set a variable of data to equal the details for the current item in the array
                            
        
        //now add each item that the user chose (its name and price and quantity) into a div or send as an alert
        var item_total = data.quantity * data.cost; // 'quantity' and 'cost' are the properties we defined for 'data' object in
                                                    //line 27
        var cart_table = document.getElementById("totalbody")// totalbody is the name i chose for the tbody id
        cart_table.innerHTML += '<tr><td>' + data.name + '</td><td>' + data.quantity + '</td><td>' + item_total + '</td></tr>';
                                                            //i append the properties of the json data object to the innerHTML of
                                                            //the cells of <table id=totalbody> element
        alert('Item: ' + data.name + ' - quantity: ' + data.quantity + ' at cost ' + data.cost + '. Item Total: $ ' + item_total); 
                                                                                                        //an alert for good measure
        delivery_total += item_total; //add the item_total for each item to the order total
      }

      var totalordername=document.getElementById("totalordername"); //totalordervalue is the id i gave to the table footer

      totalordername.innerHTML += 'Delivery Total:';
      var totalordervalue=document.getElementById("totalordervalue");
      totalordervalue.innerHTML += '$' + delivery_total + '.00';//note that delivery_total was defined before the
                                                                //for loop starts, and by the time the loop finishes
                                                                  //its value is greatly increased.
  }

