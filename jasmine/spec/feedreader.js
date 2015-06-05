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
         // set test title and loop through fields
         // URL is defined
         // URL not empty
		it('have valid URL', function() {
			for(var i = 0; i < allFeeds.length; i++) {
				expect(allFeeds[i].url).toBeDefined();
				expect(allFeeds[i].url.length).not.toBe(0);
			}
		});

        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
		 // set test title and loop through fields
		 // name is defined
		 // name not empty
		 it('have valid name', function() {
			for(var i = 0; i < allFeeds.length; i++) {
				expect(allFeeds[i].name).toBeDefined();
				expect(allFeeds[i].name.length).not.toBe(0);
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

		 // set test title
		 // set var to class of <body>
		 // match the class 'menu-hidden'
		 it('is hidden by default', function() {
			var bodyClass = $('body').attr("class");
			expect(bodyClass).toMatch('menu-hidden');
		});

		/* Write a test that ensures the menu changes
		 * visibility when the menu icon is clicked. This test
		 * should have two expectations: does the menu display when
		 * clicked and does it hide when clicked again.
		 */
		 // set test title
		 // simulate click event
		 // expect that click toggled class and class is not 'menu-hidden'
		 // simulate click event
		 // expect that click toggled class and class is 'menu-hidden'
		 it('switch working', function() {
			$('.menu-icon-link').click();
			expect($('body').hasClass('menu-hidden')).toBe(false);
			$('.menu-icon-link').click();
			expect($('body').hasClass('menu-hidden')).toBe(true);
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
		// take an optional single argument that should be called when the async work is complete
		// load Feed 0
		// Jasmine's done() callback function to simulate asynchronous behaviour
		beforeEach(function(done) {
			loadFeed(0, function() {
				done();
			});
		});

		// This spec will not start until the done function is called
		// in the call to beforeEach above.
		// And this spec will not complete until its done is called.
		it("container has at least one entry", function(done) {
			expect($(".feed .entry").length).not.toBe(0);
			done();
		});

	});
	/* Write a new test suite named "New Feed Selection" */
	describe('New Feed Selection', function() {
		/* Write a test that ensures when a new feed is loaded
		 * by the loadFeed function that the content actually changes.
		 * Remember, loadFeed() is asynchronous.
		 */
		// take an optional single argument that should be called when the async work is complete
		// load Feed 0 and then load Feed 1 to compare
		// Jasmine's done() callback function to simulate asynchronous behaviour

		/*
		This test is not assured to run fine on every case.
		On line 105 you are saving the currentFeedContent variable without having a guarantee about jQuery selector containing something.

		I suggest you to follow these steps:

		1 - Load a feed
		2 - Use callback from line 1 to save html and load another feed
		3 - Use callback from line 2 to run done();
		4 - Compare feeds from line 1 and 2.
		*/

		var currentFeedContent = '';

		beforeEach(function(done) {
			loadFeed(0, function() {
  			currentFeedContent = function() {
    			if($(".feed").html() !== undefined) {
    				return $(".feed").html();
    		  }
          loadFeed(1, done);
			  };
  		});
		});
		// This spec will not start until the done function is called in the call to beforeEach above.
		// test that html is different
		// And this spec will not complete until it's done is called.
		it("content actually changes", function(done) {
			expect(currentFeedContent).not.toMatch($(".feed").html());
			done();
		});
	});
}());
