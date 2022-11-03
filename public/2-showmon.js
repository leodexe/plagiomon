const h2subtitle = document.getElementById("h2-monselect");
let monNameLv = [];
let monStats = [];
let monMoves = [];

function removezerosandshowstats(mon, stats) {
    let showmaxhp, showmaxspeed, showmaxpyatk, showmaxpydef, showmaxspatk, showmaxspdef;
    if (parseInt(mon.maxhp) == mon.maxhp) {
        showmaxhp = mon.maxhp;
    } else {
        showmaxhp = mon.maxhp.toFixed(1);
    }
    if (parseInt(mon.maxspeed) == mon.maxspeed) {
        showmaxspeed = mon.maxspeed;
    } else {
        showmaxspeed = mon.maxspeed.toFixed(1);
        if (parseInt(showmaxspeed) == showmaxspeed) {
            showmaxspeed = parseInt(showmaxspeed);
        }
    }
    if (parseInt(mon.maxpyatk) == mon.maxpyatk) {
        showmaxpyatk = mon.maxpyatk;
    } else {
        showmaxpyatk = mon.maxpyatk.toFixed(1);
        if (parseInt(showmaxpyatk) == showmaxpyatk) {
            showmaxpyatk = parseInt(showmaxpyatk);
        }
    }
    if (parseInt(mon.maxpydef) == mon.maxpydef) {
        showmaxpydef = mon.maxpydef;
    } else {
        showmaxpydef = mon.maxpydef.toFixed(1);
        if (parseInt(showmaxpydef) == showmaxpydef) {
            showmaxpydef = parseInt(showmaxpydef);
        }
    }
    if (parseInt(mon.maxspatk) == mon.maxspatk) {
        showmaxspatk = mon.maxspatk;
    } else {
        showmaxspatk = mon.maxspatk.toFixed(1);
        if (parseInt(showmaxspatk) == showmaxspatk) {
            showmaxspatk = parseInt(showmaxspatk);
        }
    }
    if (parseInt(mon.maxspdef) == mon.maxspdef) {
        showmaxspdef = mon.maxspdef;
    } else {
        showmaxspdef = mon.maxspdef.toFixed(1);
        if (parseInt(showmaxspdef) == showmaxspdef) {
            showmaxspdef = parseInt(showmaxspdef);
        }
    }
    stats.innerHTML = "<br>MaxHP: " + showmaxhp + " | Speed: " + showmaxspeed + "<br>PyAtk:  " + showmaxpyatk + " | PyDef: " + showmaxpydef + "<br>SpAtk: " + showmaxspatk + " | SpDef: " + showmaxspdef + "<br><br>";
}

plagiodex.forEach((plagiomon) => {
    htmlmontemplate = `
    <div class="${plagiomon._idname}-inputholder mon-card">
        <input type="radio" name="typemon" title="${plagiomon.name}" class="plagiomon-radio ${plagiomon._idname}" id="${plagiomon.id}" hidden>
        <label for="${plagiomon.id}" class="label-plagiomon label-${plagiomon._idname}">
            <figure class="mon-imgcontainer">
                <img src="${plagiomon.img.src}" alt="${plagiomon.name}" class="plagiomon-img">
            </figure>
            <span id="${plagiomon._idname}-nameLv">${plagiomon.name}</span>
            <p id="${plagiomon._idname}-stats"></p>
            <p id="${plagiomon._idname}-moves"></p>
        </label>
    </div>`
    moncontainer.innerHTML += htmlmontemplate;
    monNameLv.push(document.getElementById(`${plagiomon._idname}-nameLv`));
    monStats.push(document.getElementById(`${plagiomon._idname}-stats`));
    monMoves.push(document.getElementById(`${plagiomon._idname}-moves`));
    let i = monNameLv.length - 1;
    monNameLv[i].innerHTML += " Lv" + `${plagiomon.level}` + "<br>Ability: " + `${plagiomon.ability}`;
    removezerosandshowstats(plagiomon, monStats[i]);
    monMoves[i].innerHTML = `${plagiomon.moveset[0].name}` + " | " + `${plagiomon.moveset[1].name}` + "<br>" + `${plagiomon.moveset[2].name}` + " | " + `${plagiomon.moveset[3].name}`;
});

let radiomons = document.getElementsByClassName("plagiomon-radio");

for (tacos of radiomons) {
    tacos.addEventListener("click", fnamemon);
}

function fnamemon() {
    for (index in radiomons) {
        if (radiomons[index].checked == true) {
            h2subtitle.innerHTML = "Select " + radiomons[index].title;
        }
    }
}