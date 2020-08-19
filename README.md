# Asset Control Test



Node service
------------
- Mock service that logs to a file.

- An api that accepts a line identifier parameter which represents which line to send from and a page size parameter which signifies how many lines to send.


Front end
---------
- Always starts with a call for line 1, with a page size determined by the height of the area that will render.

- The 1st page will automatically be filled, if there is not enough lines in the server file, a polling mechanism keeps retrying until the page is full.

- A periodic pull based mechanism that checks if there are new events unseen by the UI. If so a 'show more' link is rendered.

- Pressing show more fires a new request to node service giving the next line it needs and page size.


## Installation

- `yarn` or `npm install`

## Running

- `yarn start` or `npm run start`

