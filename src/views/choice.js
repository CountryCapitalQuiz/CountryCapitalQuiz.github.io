import { logout } from "../apiData/data.js";
import { choiceTempl } from "./allTemplates.js";


export function choicePage(ctx) {

    ctx.render(choiceTempl(onChoice, onExit));

    function onChoice(e) {
        ctx.page.redirect('/game/' + e.target.id);
    }
    
    function onExit() {
        logout();
        ctx.page.redirect('/');
    }

}