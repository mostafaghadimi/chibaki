# Chibaki Sample Project Implementation
## Running Project
To run the project without any errors, please follow the instructions.

**Note:** Make sure that you have `nodejs` and `mongodb` installed on your computer.

1. Open your terminal or git bash and type this line then press Enter: `git clone https://github.com/mostafaghadimi/chibaki.git`
2. Change your directory to the project via `cd chibaki`
3. Insert `npm i` to install all the required packages used.
4. Go to the directory of mongodb and in bin folder run `mongod`

## Challenges:
During implementing the front-end side of project I have faced some issues that I will mention some of them in the following context.
- First I used a strategy that the user requests specific URL then I send a html file, then in html file I request to another URL to fetch required data. As it's obvious it wasn't a good solution, because the number of requests was doubled. So I decided to use EJS, which is a template engine (also called template language).

- Sorting logic of the books' data based on their creation time and page number is OK in the back-end. The problem is where the user change the state of checkbox placed in the page that JQuery window.location seems that doesn't work properly and it's still an open question for me that I've asked in [stackoverflow with full details](https://stackoverflow.com/questions/52059642/jquery-window-location-doesnt-work/52064263?noredirect=1#comment91080759_52064263). 

- Here is some other questions that I've asked:
    - [Can't get value of dynamic remove/edit HTML table using javascript](https://stackoverflow.com/questions/52022267/cant-get-value-of-dynamic-remove-edit-html-table-using-javascript/52022326?noredirect=1#comment90995429_52022326)
    - [Loading .ejs file failed using Node.JS](https://stackoverflow.com/questions/52047795/loading-ejs-file-failed-using-node-js)
    - etc.
