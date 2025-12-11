Website built using AngularJS for a fictional order page for Los Pollos Hermanos. Pages are loaded dynamically using ngroute. 
Items on the menu are stored in a service which holds name, price, description image nutrition category.
Controllers pull data from Menuservice. HomeController loads specials, MenuController loads the full menu, MenuDetailController loads one item’s details,  AboutController loads the About page.
The menu search bar uses AngularJS filter and dynamically loads search terms with ngrepeat. 
