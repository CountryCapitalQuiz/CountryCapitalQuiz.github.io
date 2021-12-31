import { homeTempl } from "./allTemplates.js";


export function homePage(ctx) {
    ctx.render(homeTempl(onLog, onReg));

    function onLog() {
        ctx.page.redirect('/login');
    }

    function onReg() {
        ctx.page.redirect('/register');
    }
}
