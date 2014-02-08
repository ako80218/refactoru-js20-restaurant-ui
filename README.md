refactoru-js20-restaurant
=========================
This exercise was coded by Andrew Otto and MacGregor Wolstenholme.


Add a create method to each object. This create method should return a DOM element for that object. 
e.g.
return $('<div class="food-item">{name}</div>'.supplant(myFoodItem));

--finished

These create methods should all be pure functions. For code reuse, you can call create methods of contained objects, just like toString was used in the previous exercise.

--finished

When the page loads, render a restaurant with its name and menu.

--finished

When the user clicks on a plate, they get the option to add it to their order.

--finished.  Chose to use hover instead of click

Display the user's order with total price.

--Can display the Order and successfully remove items.  Have not integrated pricing... ran out of time.

Highlight the Plates that match the user's dietary preferences.

--Haven't implemented this filtering. ran out of time.
