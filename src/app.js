import { page, render } from "./lib.js";
import { choicePage } from "./views/choice.js";
import { gamePage } from "./views/game.js";
import { homePage } from "./views/home.js";
import { loginPage } from "./views/login.js";
import { registerPage } from "./views/register.js";

const root = document.querySelector('main');

page(decorateContext);
page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);
page('/choice', choicePage);
page('/game/:id', gamePage);

page.start();

function decorateContext(ctx, next) {
    ctx.render = (content => render(content, root));
    next();
}
