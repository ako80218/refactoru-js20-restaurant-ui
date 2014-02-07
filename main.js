/////function returns navbar jQuery object 
var createNavBar = function () {
	return $("<nav>\
			<ul>\
				<li>\
					<button id='view-order-btn' class='btn btn-primary btn-lg' data-toggle='modal' data-target='#myModal'>\
						View Order\
					</button>\
				</li>\
			</ul>\
		</nav>");
};



////////Restaurant Objects:
var MenuItem = function(name, description, price, ingredients){
	this.name = name;
	this.description = description;
	this.price = price;
	this.ingredients = ingredients;
};
MenuItem.prototype.isVegan= function(){
	for (var i =0; i<this.ingredients.length; i++){
		if (!this.ingredients[i].vegan){
			return false;
		}
	}
	return  true;
};
MenuItem.prototype.isGlutenFree = function(){
	for (var i =0; i<this.ingredients.length; i++){
		if (!this.ingredients[i].glutenFree){
			return false;
		}
	}
	return  true;
};
MenuItem.prototype.isCitrusFree = function(){
	for (var i =0; i<this.ingredients.length; i++){
		if (!this.ingredients[i].citrusFree){
			return false;
		}
	}
	return  true;
};
MenuItem.prototype.toString = function(){
	//console.log(this.ingredients.toString().replace(/,/g , ""));
	return "{0}: {1}  Price: {2}. {3}{4}{5}   \nIngredients: {6}".supplant([
		this.name,
		this.description,
		this.price,
		this.isVegan() ? "  This " + (this instanceof Plate ? "plate" : "drink") + " is vegan." : "",
		this.isGlutenFree() ? "  This " + (this instanceof Plate ? "plate" : "drink") + " is gluten free." : "", 
		this.isCitrusFree() ? "  This " + (this instanceof Plate ? "plate" : "drink") + " is citrus free." : "",
		this.ingredients.toString().replace(/,/g , "")
	]);
};
// MenuItem.prototype.create = function(){
	
// 	return  $('<div class="food-item">{name}</div>'.supplant(this));
// };




var FoodItem = function(name, calories, isVegan, isGlutenFree, isCitrusFree){
this.name = name;
this.calories=calories;
this.vegan = isVegan || false;
this.glutenFree = isGlutenFree || false;
this.citrusFree = isCitrusFree || false;
}
FoodItem.prototype.toString = function(){
	// tempArray = 
	return "\n  --{0}:  {1} calories.{2}{3}{4}".supplant([this.name, this.calories,
		this.vegan ? "  This ingredient is vegan." : "",
		this.glutenFree ? "  This ingredient is gluten free." : "", 
		this.citrusFree ? "  This ingredient is citrus free." : "" ]);
};
FoodItem.prototype.create = function(){
	
	return  $('<div class="food-item">{name}</div>'.supplant(this));
};


var Drink = function(name, description, price, ingredients){
	MenuItem.call(this, name, description, price, ingredients);
};
Drink.prototype= new MenuItem();
Drink.prototype.create = function(isOrderItem){

	if (isOrderItem){
		return  $('<li class="drink order-item" data-item="{name}"><div><button class="remove-order-btn btn btn-info btn-lg">Remove from Order</button><img src="images/drink.png"></img><h3>{name}</h3></div></li>'.supplant(this));


	} else {
		return  $('<li class="drink order-item" data-item="{name}"><div><button class="order-btn btn btn-info btn-lg">Add to Order</button><img src="images/drink.png"></img><h3>{name}</h3></div></li>'.supplant(this));

	}
	
};


var Plate = function(name, description, price, ingredients){
	MenuItem.call(this, name, description, price, ingredients);
};
Plate.prototype= new MenuItem();
Plate.prototype.create = function(isOrderItem){
	
	if (isOrderItem){
		return  $('<li class="plate order-item" data-item="{name}"><div><button class="remove-order-btn btn btn-info btn-lg">Remove from Order</button><img src="images/plate.png"><h3>{name}</h3></div></li>'.supplant(this));

	} else {
		return  $('<li class="plate order-item" data-item="{name}"><div><button class="order-btn btn btn-info btn-lg">Add to Order</button><img src="images/plate.png"><h3>{name}</h3></div></li>'.supplant(this));

	}
	
};


var Order = function(menuItems){
this.menuItems = menuItems;
};
Order.prototype.toString = function(){
	return "Order Items: {0}".supplant([this.menuItems.toString()]);
};
Order.prototype.create = function(isOrderItem){
	
	// return  $('<div class="order"></div>');
	var orderElement = $('<div class="order"><ul class="order-list"></ul></div>');
	for (var i = 0; i < this.menuItems.length; i++){
		orderElement.find("ul").append(this.menuItems[i].create(isOrderItem? true: false));
	}
	return orderElement;
};


var Menu = function(menuItems){
this.menuItems = menuItems;
};
Menu.prototype.toString = function(){
	// return "Menu menuItems: {0}".supplant([this.menuItems.toString()]));
	var messageString = "Menu Items: \n";
	for (var i=0; i < this.menuItems.length; i++){
		messageString += "#" + (i + 1) + "  " + this.menuItems[i].toString() +"\n";
	} 
	return messageString;
};
Menu.prototype.create = function(){

	var menuElement = $('<div class="menu"><ul class="menu-list"></ul></div>');
	for (var i = 0; i < this.menuItems.length; i++){
		menuElement.find("ul").append(this.menuItems[i].create());
	}
	return menuElement;

};

var Restaurant = function(name, description, menu){
this.name = name;
this.description = description;
this.menu = menu
};
Restaurant.prototype.toString = function(){
	return "{0}: {1} {2}".supplant([this.name, this.description, this.menu.toString()]);
};
Restaurant.prototype.create = function(){
	
	var restObj = $('<div class="restaurant">\
			<header>\
				<h1>{name}</h1>\
				<h2>{description}</h2>\
			</header>\
		</div>'.supplant(this)).append(this.menu.create());

	restObj.find("header").append(createNavBar());
 
 	return restObj;

};

var Customer = function(dietaryPreference){
this.dietaryPreference = dietaryPreference;
};
Customer.prototype.toString = function(){
	return "Dietary preferences: {0}".supplant([this.dietaryPreference.toString()]);
};

/////////////////////////////////////////////////////////
//////////////// EVENT HANDLERS ///////////////////////
$(document).on('click', '.order-btn', function(){
	if (order.menuItems.length === 0){
		// console.log('empty!!!!');
	}
	for (var i=0; i<myMenu.menuItems.length; i++){
		if (myMenu.menuItems[i].name === $(this).closest('li').attr('data-item')){
			order.menuItems.push(myMenu.menuItems[i]);
		}
	}

});

//toggles visibity of add to order button when  user hovers over .order-item li
$(document).on('mouseenter', '.order-item', function(){
	$(this).find('.order-btn').toggle();
	$(this).css('background', '#dedede');
});$(document).on('mouseleave', '.order-item', function(){
	$(this).find('.order-btn').toggle();
	$(this).css('background', 'inherit');
});

//toggles visibity of "remove from order" button when  user hovers over .order-item li
$(document).on('mouseenter', '.order-item', function(){
	$(this).find('.remove-order-btn').toggle();
	$(this).css('background', '#dedede');
});$(document).on('mouseleave', '.order-item', function(){
	$(this).find('.remove-order-btn').toggle();
	$(this).css('background', 'inherit');
});

$(document).on('click', '#view-order-btn', function(){
	$(".modal-body").append(order.create(true));


});

$(document).on('mouseenter', '.restaurant', function(){
	$(".modal-body").empty();
});

$(document).on('click', '.remove-order-btn', function(){

		for (var i=0; i<order.menuItems.length; i++){
		if (order.menuItems[i].name === $(this).closest('li').attr('data-item')){
			$(this).closest("li").toggle();
			order.menuItems.splice(i+1, 1);
			return;
		}
	}
	

});

//////////////// INSTANTIATE OBJECT HIERARCHY ///////////////////////

/////ORDER OBJECT
var order = new Order([]);

/////FOOD ITEMS
var salt = new FoodItem('salt', 0, true, true, true);
var lime = new FoodItem('lime', 20, true, true, false);
var tequila = new FoodItem('tequila', 200, true, true, true);

var cornShell = new FoodItem('cornShell', 200, true, false, true);
var lettuce = new FoodItem('lettuce', 150, true, true, true);
var avocado = new FoodItem('avocado', 200, true, true, true);
var cheese = new FoodItem('cheese', 250, false, true, true);
var tortilla = new FoodItem('tortilla', 100, true, false, true);
var beans = new FoodItem('beans', 100, true, true, true);
var beef = new FoodItem('beef', 200, false, true, true);

///// DRINKS
var manhattan = new Drink("manhattan", "adult bev", "$9.00", ["sweet vermouth", "soda", "cherries"]);
var margarita = new Drink("margarita", "Delicious made lime juice and good tequila", "$15", [tequila, lime, salt]);

/////// PLATES
var guacamole = new Plate("guacamole", "Delicious, made fresh daily, green!", "$10", [avocado, salt, lime]);
var beanBurrito = new Plate("bean burrito", "Delicious made with fresh ingredients", "$9", [tortilla, lettuce, cheese, beans]);

///////  MENU
var myMenu = new Menu ([guacamole, beanBurrito, margarita]);

/////////  RESTAURANT
var myRestaurant = new Restaurant("Tequila Nirvana", "~~Spanish Hindu Fusion~~", myMenu);

////////  MAIN  

console.log(myRestaurant.toString());

$('body').prepend(myRestaurant.create());


