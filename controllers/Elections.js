import { actualAggregate, lgAccumulated } from "./aggregators.js";
class Elections {
  aggregateByPollingUnits = async (req, res) => {
    let { unit } = req.query;
    let myunits = unit ?? Object.keys(actualAggregate)[0];
    let total = actualAggregate[myunits].results
      .map((m) => m.party_score)
      .reduce((x, m) => m + x);
    res.render("polls", {
      options: Object.keys(actualAggregate),
      pollingUnit: myunits,
      results: actualAggregate[myunits].results,
      total,
    });
  };

  aggregateByLgas = (req, res) => {
    let { lga } = req.query;
    let mylgas = lga ?? Object.keys(lgAccumulated)[0];
    let total = Object.values(lgAccumulated[mylgas].results).reduce(
      (x, m) => m + x
    );
    console.log(Object.keys(lgAccumulated)[0]);

    res.render("lgas", {
      options: Object.keys(lgAccumulated),
      lgs: mylgas,
      results: lgAccumulated[mylgas].results,
      total,
    });
  };
}

export default Elections;
