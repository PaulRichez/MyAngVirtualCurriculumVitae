const loader = document.getElementById('loader');

window.addEventListener('load', () => {
    setTimeout(async () => { loader.remove(); await setVariableInHtml(); }, 1000);
});

async function setVariableInHtml() {
    const age = calculate_age(new Date(myCvData.user.birthDay)) + " Ans";
    myCvData.user.birthDay = age;
    for (var key in myCvData.user) {
        if (myCvData.user.hasOwnProperty(key)) {
            document.body.innerHTML = document.body.innerHTML.replaceAll(`{{${key}}}`, `${myCvData.user[key]}`);
        }
    }

    const condingHTML = await readTextFile("/assets/html/coding.html").then((text) => text);
    myCvData.coding.forEach(t => {
        document.getElementById('coding').appendChild(htmlToElement(replaceCoding(condingHTML, t.key, t.value)));
    });
}

function calculate_age(dob) {
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms);

    return Math.abs(age_dt.getUTCFullYear() - 1970);
}

function readTextFile(file) {
    return fetch('/assets/html/coding.html')
        .then(function (response) {
            return response.text();
        })
        .catch(function (err) {
            return null;
        });
}

function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}

function replaceCoding(html, key, value) {
    return html.replaceAll("{{key}}", key).replaceAll("{{value}}", value)
}