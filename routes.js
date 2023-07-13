import { Router } from "express";
import db from "./db.js";
import Elections from "./controllers/Elections.js";
let Election = new Elections()
 let appRouter = Router();
appRouter.get("/", (req, res) => {
  res.render("index", {
    title: "Election Results",
    message: "Election Results",
    subtitle: "Please pick any of the links below to see the results",
    links: [
      {
        title: "View Results by polling units",
        link: "/units",
      },
      {
        title: "View Results by LGAs",
        link: "/lgas",
      },
      {
        title: "View Results by polling units",
        link: "/units",
      },
    ],
  });
});

appRouter.get("/units",Election.aggregateByPollingUnits)
appRouter.get("/lgas", Election.aggregateByLgas)

export default appRouter;
