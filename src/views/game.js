import { endGameTempl, gameTempl, loading, startTempl } from "./allTemplates.js";
import { allCountriesOf } from "../../continentData/allCountries.js";
import { getTopTen, getUserData, saveNewScore, logout } from "../apiData/data.js";


export async function gamePage(ctx) {
    ctx.render(loading());
    
    const continent = ctx.params.id;
    const countries = [...allCountriesOf[continent]];
    const capitals = countries.map(obj => obj.capital);
    let trueAnsws = 0;
    let startTime = undefined;
    
    const data = await getTopTen(continent);
    ctx.render(startTempl(showQuestion, continent, data.results, onContinue));

    async function showQuestion(){
        startTime = startTime ? startTime : new Date;
        if (countries.length > 0) {
            const ind = Math.floor(Math.random()*countries.length);
            const question = countries[ind];
            const answers = [question.capital];

            // Get capitals for answers.
            while (answers.length < 4) {
                const capital = capitals[Math.floor(Math.random()*capitals.length)];
                if (!answers.includes(capital)) {
                    answers.push(capital);
                }
            }

            // Shuffle answers.
            for (let i = answers.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [answers[i], answers[j]] = [answers[j], answers[i]];
            }

            ctx.render(gameTempl(question, answers, onChoice, onContinue));

            // Remove that question.
            countries.splice(ind, 1);

            function onChoice(e) {
                if (question.capital == e.target.id) {
                    trueAnsws ++;
                }
                showQuestion();
            }
        } else {
            const endTime = new Date;
            const time = (endTime - startTime)/1000;
            const points = trueAnsws / capitals.length * 1000 + 1 / time;

            ctx.render(loading());
            const data = {
                name: getUserData().username,
                rating: points
            }
            await saveNewScore(continent, data);

            ctx.render(endGameTempl(continent, trueAnsws, capitals.length, time, points, onContinue));
            
        }
        
    }

    function onContinue(e) {
        if (e.target.id == 'new') {
            ctx.page.redirect('/choice');
        } else {
            logout();
            ctx.page.redirect('/');
        }
    }

}