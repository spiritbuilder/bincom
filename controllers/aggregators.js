import db from "../db.js";
console.log(Object.keys(db["polling_unit"][0]));
console.log(Object.keys(db["lga"][0]));
let uniqueIds = new Set();
let unit = new Set();
let lga = new Set();
const aggregator = {};
db.polling_unit.map((m) => {
  uniqueIds.add(m.uniqueid);

  unit.add(m.polling_unit_id);
  lga.add(m.lga_id);
  // console.log(m.polling_unit_name)
  if (m.polling_unit_id !== 0) {
    if (aggregator[m.polling_unit_name]) {
      aggregator[m.polling_unit_name].uniqueIds.push(m.uniqueid);
    } else {
      aggregator[m.polling_unit_name] = { uniqueIds: [m.uniqueid] };
    }
  }
});

db["announced_pu_results"].map((m) => {
  let units = Object.keys(aggregator);
  for (let i = 0; i < units.length; i++) {
    if (
      aggregator[units[i]].uniqueIds.includes(parseInt(m.polling_unit_uniqueid))
    ) {
      aggregator[units[i]].results
        ? aggregator[units[i]].results.push(m)
        : (aggregator[units[i]].results = [m]);
    }
  }
});

let actualAggregate = {};
Object.keys(aggregator).map((m) => {
  if (aggregator[m].results) {
    actualAggregate[m] = aggregator[m];
  }
});


let lgaCummulated = {};

console.log(db["lga"]);
db["lga"].map((m) => {
  if (!lgaCummulated[m.lga_name]) {
    lgaCummulated[m.lga_name] = { id: m.lga_id };
  }
});
db["polling_unit"].map((m) => {
  let lgs = Object.keys(lgaCummulated);
  for (let i = 0; i < lgs.length; i++) {
    if (lgaCummulated[lgs[i]].id === m.lga_id) {
      lgaCummulated[lgs[i]].polls
        ? lgaCummulated[lgs[i]].polls.push(m.polling_unit_name)
        : (lgaCummulated[lgs[i]].polls = [m.polling_unit_name]);
      break;
    }
  }
});

Object.keys(actualAggregate).map((m) => {
  let lgs = Object.keys(lgaCummulated);
  for (let i = 0; i < lgs.length; i++) {
    if (lgaCummulated[lgs[i]]?.polls?.includes(m)) {
      lgaCummulated[lgs[i]].results
        ? (lgaCummulated[lgs[i]].results = [
            ...lgaCummulated[lgs[i]].results,
            ...actualAggregate[m].results,
          ])
        : (lgaCummulated[lgs[i]].results = [...actualAggregate[m].results]);
      break;
    }
  }
});
let count = 0;
let lgAccumulated = {};
Object.keys(lgaCummulated).map((m) => {
  let counter = {};
  if (lgaCummulated[m].results) {
    count++;
    let results = lgaCummulated[m].results;
    for (let i = 0; i < results.length; i++) {
      if (counter[results[i]["party_abbreviation"]]) {
        counter[results[i]["party_abbreviation"]] += results[i].party_score;
      } else {
        counter[results[i]["party_abbreviation"]] = results[i].party_score;
      }
    }

    lgaCummulated[m].results = counter;
    lgAccumulated[m] = lgaCummulated[m];
  }
});



export { actualAggregate,lgAccumulated };
