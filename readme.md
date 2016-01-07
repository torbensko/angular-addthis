# Angular AddThis directive

Add the AddThis social sharing tool to your site.

View [demo](http://torbensko-demos.s3.amazonaws.com/angular-addthis/demo.html).


# Install

Installing via bower:

    bower install torbensko/angular-addthis

Add the angular module: 

		sko.addThis

Initalise it with your ID:

		addThisProvider.setId('abc');

Add to a page by adding:

    <add-this refresh="{{ title }}"></add-this>

The refresh attribute lets it update itself in response to asyncronous changes.


## Development

Install

    npm install
    bower install

Run server

    node server.js