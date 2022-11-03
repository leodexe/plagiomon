//Plagiomon Class and Movesets

import express from "express";
const server = express();
import cors from "cors";
server.use(cors());
server.use(express.static('burrito'));
server.use(express.json());
const playerIDs = [];
let playerDB = [];
let newID;
let playercount = 0;

class Jugador {
    constructor(id, online = "idle") {
        this.id = id;
        this.data1 = [];
        this.data2 = [];
        this.online = online;
    }
    setPlagiomon(plagiomon, plagioname, plagioid) {
        this.plagiomon = plagiomon;
        this.plagioname = plagioname;
        this.plagioid = plagioid;
    }
    setCoords(monid, moved, w, x, y) {
        this.monid = monid;
        this.moved = moved;
        this.w = w;
        this.x = x;
        this.y = y;
    }
    setMoveID(moveid, turn) {
        this.moveid = moveid;
        this.turn = turn;
    }
}

class Plagiomon {
    constructor(name) {
        this.name = name;
    }
}

const port = 8080;
// process.env.PORT || 4000;
// module.exports = port;


server.listen(port, () => {
    console.log("Servidor encendido:", port);
});

server.get("/", (req, res) => {
    res.send({port});
})

server.get("/join", (req, res) => {
    let loop = true;
    newID = `${Math.ceil(Math.random() * 1000)}`;
    while (loop == true) {
        loop = false;
        for (playerID of playerIDs) {
            if (playerID == newID) {
                console.log("COINCIDENCIA ENCONTRADA: " + newID);
                newID = `${Math.ceil(Math.random() * 1000)}`;
                loop = true;
            }
        }
    }
    playerIDs.push(newID);
    const newPlayer = new Jugador(newID);
    playerDB.push(newPlayer);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(newID);
    playercount = playerDB.length;
});

server.post("/plagiomon/:clientID", (req, res) => {
    const player_id = req.params.clientID || "";
    const plagiomon = req.body.plagiomon || "NULLMON";
    const plagioname = plagiomon.name || "NULLNAME";
    const plagio_id = plagiomon.id || "NULLID";
    const playerIndex = playerDB.findIndex((player) => player.id == player_id)
    if (playerIndex >= 0) {
        playerDB[playerIndex].setPlagiomon(plagiomon, plagioname, plagio_id);
        console.log("true");
    }
    res.end();
})

server.get("/plagiomon/delete/:clientID", (req, res) => {
    const player_id = req.params.clientID || "";
    const playerIndex = playerDB.findIndex((player) => player.id == player_id);
    if (playerIndex >= 0) {
        playerDB.splice(playerIndex, 1);
    }
    res.end();
})

server.post("/plagiomon/:clientID/getplayerCoords", (req, res) => {
    const player_id = req.params.clientID || "";
    const player_monid = req.body.monid || "";
    const player_moved = req.body.moved || "";
    const player_w = req.body.w || "";
    const player_x = req.body.x || "";
    const player_y = req.body.y || "";
    const playerIndex = playerDB.findIndex((player) => player.id == player_id);
    if (playerIndex >= 0) {
        playerDB[playerIndex].setCoords(player_monid, player_moved, player_w, player_x, player_y);
    }
    const enemyDB = playerDB.filter((player) => player.id != player_id);
    res.send({enemyDB});
})

server.post("/plagiomon/:clientID/setMovedtoclientID", (req, res) => {
    const player_id = req.params.clientID || "";
    const mon_moved = req.body.moved || "";
    const playerIndex = playerDB.findIndex((player) => player.id == player_id);
    if (playerIndex >= 0) {
        playerDB[playerIndex].moved = mon_moved;
    }
    res.send(mon_moved);
})

server.get("/plagiomon/:rivalID", (req, res) => {
    const rival_id = req.params.rivalID || "-2";
    const rivalIndex = playerDB.findIndex((player) => player.id == rival_id);
    let rivalmon = "NULLMON";
    if (rivalIndex >= 0) {
        rivalmon = playerDB[rivalIndex].plagioid;
    }
    res.send({rivalmon});
})

server.post("/plagiomon/:clientID/vs/:rivalID/sendStatus", (req, res) => {
    const client_id = req.params.clientID || "offline";
    const host_id = req.params.rivalID || "offline";
    const clientIndex = playerDB.findIndex((player) => player.id == client_id);
    const hostIndex = playerDB.findIndex((player) => player.id == host_id);
    const connection = req.body.connected || false;
    if (clientIndex >= 0 && hostIndex >= 0) {
        const clientPlayer = playerDB[clientIndex];
        clientPlayer.online = connection;
    } else {
        console.log("sendStatusERROR");
    }res.end();
})

server.get("/plagiomon/:clientID/vs/:rivalID/getStatus", (req, res) => {
    const client_id = req.params.clientID || "offline";
    const host_id = req.params.rivalID || "offline";
    const clientIndex = playerDB.findIndex((player) => player.id == client_id);
    const hostIndex = playerDB.findIndex((player) => player.id == host_id);
    let hostPlayer;
    let connection;
    if (clientIndex >= 0 && hostIndex >= 0) {
        hostPlayer = playerDB[hostIndex];
        connection = hostPlayer.online;
    } else {
        console.log("getStatusERROR");
    }res.send(connection);
    hostPlayer.online = false;
})

server.post("/plagiomon/:clientID/sendMove", (req, res) => {
    const player_id = req.params.clientID || "";
    console.log("p1moveid: " + req.body.p1moveid);
    const pmove_id = req.body.p1moveid || "-20";
    const pturn = req.body.turn || "-1";
    const playerIndex = playerDB.findIndex((player) => player.id == player_id);
    if (playerIndex >= 0) {
        playerDB[playerIndex].setMoveID(pmove_id, pturn);
    }
    console.log("sendMove: " + pmove_id);
    console.log("pturn: " + pturn);
    res.send({pmove_id});
})

server.get("/plagiomon/:clientID/vs/:rivalID/getMove", (req, res) => {
    const attacker_id = req.params.clientID || "";
    const defender_id = req.params.rivalID || "";
    const attackerIndex = playerDB.findIndex((player) => player.id == attacker_id);
    const defenderIndex = playerDB.findIndex((player) => player.id == defender_id);
    const attacker = playerDB.find((player) => player.id == attacker_id) || "-2";
    const defender = playerDB.find((player) => player.id == defender_id) || "-2";
    let attacker_moveid = attacker.moveid || "-30";
    let defender_moveid = defender.moveid || "-30";
    const attacker_turn = attacker.turn || "-2";
    const defender_turn = defender.turn || "-2";
    console.log(req.originalUrl);
    console.log("attacker turn: " + attacker_turn);
    console.log("defender turn: " + defender_turn);
    res.send({defender_moveid});
    if (attacker_moveid > 0 && defender_moveid > 0) {
        console.log("+attacker getMove: +" + attacker_moveid);
        console.log("+defender getMove: +" + defender_moveid);
        if (attackerIndex < defenderIndex) {
            plagiomon1 = attacker.plagiomon;
            plagiomon2 = defender.plagiomon;
        } else if (attackerIndex > defenderIndex) {
            plagiomon1 = defender.plagiomon;
            plagiomon2 = attacker.plagiomon;
        } else {
            plagiomon1 = "ERRORMON1";
            plagiomon2 = "ERRORMON2";
        }
    }
    if (attacker_turn > 0 && defender_turn > 0) {
        if (attacker_turn == defender_turn) {
            playerDB[defenderIndex].setMoveID("-40", defender.turn);
            console.log("==attacker getMove: " + attacker.moveid);
            console.log("==defender getMove: " + defender.moveid);
            console.log(attacker.plagiomon);
        }
    }
})

server.post("/plagiomon/:clientID/vs/:rivalID/sendPlayerData", (req, res) => {
    console.log("POST petition sPD1");
    const netgamedata1 = req.body.gamedata || "-1";
    let turndata = req.body.turndata || "-1";
    if (turndata == "first") {
        turndata = 1;
    } else if (turndata == "second") {
        turndata = 2;
    } else {
        console.log("Illegal turndata: " + turndata);
    }
    const host_id = req.params.clientID || "-1";
    const client_id = req.params.rivalID || "-1";
    const clientIndex = playerDB.findIndex((player) => player.id == client_id);
    const hostIndex = playerDB.findIndex((player) => player.id == host_id);
    if (clientIndex >= 0 && hostIndex >= 0) {
        const clientPlayer = playerDB[clientIndex];
        clientPlayer.data1[turndata - 1] = netgamedata1;
        console.log(clientPlayer.data1[turndata - 1]);
        console.log("turndata: " + turndata);
        console.log(turndata -1);
        console.log("netgamedata1 length: " + clientPlayer.data1.length);
        console.log("send1 OK");
    }
    res.end();
})

server.get("/plagiomon/:clientID/vs/:rivalID/getPlayerData", (req, res) => {
    console.log("GET petition gPD1");
    let netgamedata1 = "-2";
    const host_id = req.params.clientID || "-2";
    const client_id = req.params.rivalID || "-2";
    const clientIndex = playerDB.findIndex((player) => player.id == client_id);
    const hostIndex = playerDB.findIndex((player) => player.id == host_id);
    if (clientIndex >= 0 && hostIndex >= 0) {
        netgamedata1 = playerDB[hostIndex].data1;
        console.log(netgamedata1);
        console.log("get OK");
        console.log("getLength: " + netgamedata1.length);
    }
    res.send({netgamedata1});
    if (netgamedata1.length > 1) {
        console.log("getLength exceeded >1:" + netgamedata1.length);
        console.log(netgamedata1);
        playerDB[hostIndex].data1 = [];
    }
})

server.post("/plagiomon/:clientID/vs/:rivalID/sendPlayerData2", (req, res) => {
    // P1 and P2 values are sent from the perspective of the host player so they are inverted for the receiving player to get the correct data.
    const p1_hp = req.body.p2hp || "999";
    const p2_hp = req.body.p1hp || "999";
    const p1_savebox = req.body.p2savebox || "-1";
    const p2_savebox = req.body.p1savebox || "-1";
    const p1_recurrentDamage = req.body.p2recurrentDamage || "-1";
    const p2_recurrentDamage = req.body.p1recurrentDamage || "-1";
    const xweather = req.body.weather || "-1";
    const xweatherLevel = req.body.weatherLevel || "-10";
    const xweatherHTML = req.body.weatherHTML || "-1";
    const host_id = req.params.clientID || "-1";
    const hostIndex = playerDB.findIndex((player) => player.id == host_id);
    const client_id = req.params.rivalID || "-1";
    const clientIndex = playerDB.findIndex((player) => player.id == client_id);
    if (clientIndex >= 0 && hostIndex >= 0) {
        console.log("send2 OK");
        const hostPlayer = playerDB[hostIndex];
        hostPlayer.data2[hostPlayer.data2.length] = p1_hp;
        hostPlayer.data2[hostPlayer.data2.length] = p2_hp;
        hostPlayer.data2[hostPlayer.data2.length] = p1_savebox;
        hostPlayer.data2[hostPlayer.data2.length] = p2_savebox;
        hostPlayer.data2[hostPlayer.data2.length] = p1_recurrentDamage;
        hostPlayer.data2[hostPlayer.data2.length] = p2_recurrentDamage;
        hostPlayer.data2[hostPlayer.data2.length] = xweather;
        hostPlayer.data2[hostPlayer.data2.length] = xweatherLevel;
        hostPlayer.data2[hostPlayer.data2.length] = xweatherHTML;
        console.log(playerDB[hostIndex].data2);
    } else {
        console.log("send2 ERROR");
    }
    res.end();
})

server.get("/plagiomon/:clientID/vs/:rivalID/getPlayerData2", (req, res) => {
    let netgamedata2;
    const client_id = req.params.clientID || "-2";
    const host_id = req.params.rivalID || "-2";
    const clientIndex = playerDB.findIndex((player) => player.id == client_id);
    const hostIndex = playerDB.findIndex((player) => player.id == host_id);
    let hostPlayer;
    if (clientIndex >= 0 && hostIndex >= 0) {
        hostPlayer = playerDB[hostIndex];
        netgamedata2 = hostPlayer.data2;
        console.log("get2 OK");
        console.log(netgamedata2);
    } else {
        console.log("get2 ERROR");
    }
    if (netgamedata2 == undefined) {
        console.log("NETGAMEDATA2 IS UNDEFINED @@@@@");
    }
    res.send({netgamedata2});
    hostPlayer.data2 = [];
})
