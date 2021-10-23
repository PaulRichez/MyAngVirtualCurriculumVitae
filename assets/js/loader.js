const loader = document.getElementById('loader');

window.addEventListener('load', () => {
    setTimeout(() => { loader.remove(); setVariableInHtml(); }, 1000);
});

function setVariableInHtml() {
    const age = calculate_age(new Date(myCvData.user.birthDay)) + " Ans";
    myCvData.user.birthDay = age;
    for (var key in myCvData.user) {
        if (myCvData.user.hasOwnProperty(key)) {         
            document.body.innerHTML = document.body.innerHTML.replaceAll(`{{${key}}}`, `${myCvData.user[key]}`);
        }
    }
   }

function calculate_age(dob) { 
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms); 
  
    return Math.abs(age_dt.getUTCFullYear() - 1970);
}
