let theme = {};

const style = getComputedStyle(document.body);

theme.blue = style.getPropertyValue("--bs-blue");
theme.red = style.getPropertyValue("--bs-red");
theme.orange = style.getPropertyValue("--bs-orange");
theme.green = style.getPropertyValue("--bs-green");
theme.yellow = style.getPropertyValue("--bs-yellow");

export default theme;