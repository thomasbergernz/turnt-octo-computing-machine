/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
		it('have valid URL', function() { // set test title and loop through fields
			for(var i = 0; i < allFeeds.length; i++) {
				expect(allFeeds[i].url).toBeDefined();      // URL is defined
				expect(allFeeds[i].url.length).not.toBe(0); // URL not empty
			}
        });

        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have valid name', function() { // set test title and loop through fields
			for(var i = 0; i < allFeeds.length; i++) {
				expect(allFeeds[i].name).toBeDefined();      // name is defined
				expect(allFeeds[i].name.length).not.toBe(0); // name not empty
			}
        });
    });


    /* Write a new test suite named "The menu" */
	describe('The menu', function() { // set header for new test suite to 'The menu'
        /* Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden by default', function() { // set test title 
	        var bodyClass = $('body').attr("class");  // set var to class of <body>
	        expect(bodyClass).toMatch('menu-hidden'); // match the class 'menu-hidden'
        });
        
		/* Write a test that ensures the menu changes
		 * visibility when the menu icon is clicked. This test
		 * should have two expectations: does the menu display when
		 * clicked and does it hide when clicked again.
		 */
        it('switch working', function() { // set test title 
			$('.menu-icon-link').click(); // simulate click event 
			expect($('body').hasClass('menu-hidden')).toBe(false); // expect that click toggled class and class is not 'menu-hidden'
			$('.menu-icon-link').click(); // simulate click event
			expect($('body').hasClass('menu-hidden')).toBe(true); // expect that click toggled class and class is 'menu-hidden'
        });
          
    });
    /* Write a new test suite named "Initial Entries" */
	describe('Initial Entries', function() { // set header for new test suite to 'Initial Entries'
        /* Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
		beforeEach(function(done) {  // take an optional single argument that should be called when the async work is complete
			loadFeed(0, function() { // load Feed 0
				done(); 			 // Jasmine's done() callback function to simulate asynchronous behaviour
			});
		});
		
		it("container has at least one entry", function(done) {   // This spec will not start until the done function is called 
			expect($(".feed").children().length).not.toBe(0); 	  // in the call to beforeEach above. 
			done();											  	  // And this spec will not complete until its done is called.
		});
		
    });
    /* Write a new test suite named "New Feed Selection" */
	describe('New Feed Selection', function() {
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
		// compare loadFeed(0) and loadFeed(1)
		var currentFeedContent = $(".feed").html();
		beforeEach(function(done) {  // take an optional single argument that should be called when the async work is complete
			loadFeed(1, function() { // load Feed 1
				done(); 			 // Jasmine's done() callback function to simulate asynchronous behaviour
			});
		});
		it("content actually changes", function(done) {   				// This spec will not start until the done function is called in the call to beforeEach above. 
			expect(currentFeedContent).not.toMatch($(".feed").html()); 	// test that html is different 
			done();											  	  		// And this spec will not complete until its done is called.
		});
    });
}());
