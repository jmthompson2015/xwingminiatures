import Logger from "../utility/Logger.js";

import Button from "./Button.js";

window.LOGGER = new Logger();
LOGGER.setTraceEnabled(false);
LOGGER.setDebugEnabled(false);

const rows = [];
let cells = [];

let button0 = ReactDOMFactories.button(
{
   onClick: myOk,
}, "OK");
let button1 = ReactDOMFactories.button(
{
   disabled: true,
}, "Disabled");
let button2 = ReactDOMFactories.button(
{
   onClick: myCancel,
}, "Cancel");

let i = 0;
cells.push(ReactDOMFactories.td(
{
   key: "title" + i,
   className: "f6",
}, "Standard"));
cells.push(ReactDOMFactories.td(
{
   key: "ok" + i,
   className: "f6",
}, button0));
cells.push(ReactDOMFactories.td(
{
   key: "disabled" + i,
   className: "f6",
}, button1));
cells.push(ReactDOMFactories.td(
{
   key: "cancel" + i,
   className: "f6",
}, button2));

rows.push(ReactDOMFactories.tr(
{
   key: rows.length,
}, cells));

i++;
cells = [];
button0 = React.createElement(Button,
{
   name: "OK",
   onClick: myOk,
});
button1 = React.createElement(Button,
{
   disabled: true,
   name: "Disabled",
});
button2 = React.createElement(Button,
{
   name: "Cancel",
   onClick: myCancel,
});
cells.push(ReactDOMFactories.td(
{
   key: "title" + i,
}, "Custom"));
cells.push(ReactDOMFactories.td(
{
   key: "ok" + i,
}, button0));
cells.push(ReactDOMFactories.td(
{
   key: "disabled" + i,
}, button1));
cells.push(ReactDOMFactories.td(
{
   key: "cancel" + i,
}, button2));

rows.push(ReactDOMFactories.tr(
{
   key: rows.length,
}, cells));

ReactDOM.render(ReactDOMFactories.table(
{
   className: "bg-light-gray center pa4 mv4",
}, ReactDOMFactories.tbody(
{}, rows)), document.getElementById("panel"));

function myOk( /* event */ )
{
   LOGGER.info("myOk()");
}

function myCancel( /* event */ )
{
   LOGGER.info("myCancel()");
}