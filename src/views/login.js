import { login } from "../apiData/data.js";
import { loading, loginTempl } from "./allTemplates.js";


export function loginPage(ctx) {
    ctx.render(loginTempl(onCan, onLog));

    function onCan() {
        ctx.page.redirect('/')
    }

    async function onLog() {
        let [username, password] = document.getElementsByTagName('input');
        username = username.value;
        password = password.value;
        
        if (username.trim() == '' || password.trim() == '') {
            return alert("Fill all fields!");
        }

        ctx.render(loading());
        try {
            await login(username, password);
            ctx.page.redirect('/choice');

        } catch(err){
            ctx.page.redirect('/');
        }
    }
}
