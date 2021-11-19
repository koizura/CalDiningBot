const jsdom = require("jsdom");
const { getDocumentTypeNodePublicId } = require("parse5/lib/tree-adapters/default");
const { JSDOM } = jsdom;
// const fetch = import('node-fetch');
const url = "https://caldining.berkeley.edu/menus/";

let lastUpdated = Date.now();

let menu = {
    crossroads: {},
    foothill: {},
    cafe3: {},
    clarkkerr: {},
};
const Q_NAME = {
    crossroads: ".location-name.Crossroads",
    foothill: "location-name.Foothill",
    cafe3: ".location-name.Cafe_3",
    clarkkerr: "location-name.Clark_Kerr_Campus",
};
const Q_TIME = {
    breakfast: ".preiod-name.Breakfast",
    lunch: ".preiod-name.Lunch",
    dinner: ".preiod-name.Dinner",
    brunch:  ".preiod-name.Brunch",
};

module.exports = {
	async execute() {
        let timeSinceLastCall = "it's been " + (Date.now()-lastUpdated)/1000 + " seconds since last call";
        lastUpdated = Date.now();


        await JSDOM.fromURL(url).then(dom => {
            // console.log(dom.serialize());
            parseHTML(dom.serialize());
        });
    },
    getMenu() {
        return menu;
    },
    async test() {
        
    },
};

function parseHTML(html) {
    const names = Object.keys(menu);
    const times = Object.keys(Q_TIME);
    const dom = new JSDOM(html);

    names.forEach(name => {
        times.forEach(time => {
            console.log(name + ", " +  time);
            let data = []
            try {
                data = dom.window.document.querySelector(Q_NAME[name] + ' ' + Q_TIME[time]).querySelectorAll(".recip > span") 
            } catch (err) { 
                // error! couldn't find menu for this specific time/name
            };

            
                
            let menuItems = [];
            data.forEach(element => {
                if(element.className == "") {
                    menuItems += [element.innerHTML];
                }
            });
            menu[name][time] = menuItems;
        });
        
    });
    //console.log(menu);
    
    //const data = dom.window.document.querySelector('.location-name.Crossroads .preiod-name.Lunch')
    //  .querySelectorAll(".recip > span");
    // data.forEach(element => {
    //     console.log("> " + element.innerHTML);
    // });
    
    // const data = dom.window.document.querySelectorAll('.recip > span');
    // data.forEach(element => {
    //     if(element.className == "") {
    //         console.log(element.innerHTML);
    //         output += element.innerHTML + "\n";
    //     }
    // });

    // //output = data.textContent;
    // if(output.length > 300) {
    //     output = output.substring(0,300);
    // }
}