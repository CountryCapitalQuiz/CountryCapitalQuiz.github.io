import { register } from "../apiData/data.js";
import { loading, registerTempl } from "./allTemplates.js";


export function registerPage(ctx) {
    ctx.render(registerTempl(onCan, onReg));

    function onCan() {
        ctx.page.redirect('/')
    }

    async function onReg() {
        let [username, password, repass] = document.getElementsByTagName('input');
        username = username.value;
        password = password.value;
        repass = repass.value;

        if (username.trim() == '' || password.trim() == '') {
            return alert("Fill all fields!");
        }
        if (password.trim() != repass.trim()) {
            return alert("Passwords don't match!");
        }
        ctx.render(loading());
        try {
            await register(username, password);
            ctx.page.redirect('/choice');
        } catch {
            ctx.page.redirect('/')
        }
    }
}
