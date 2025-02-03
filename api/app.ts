/* eslint-disable @typescript-eslint/no-explicit-any */
import Fastify, { FastifyRequest, type FastifyInstance } from "fastify";
import { jsonContentParser } from "./jsonContentParser";
import { addVehicle, getVehicles, Veh } from "./db";

const apiKey = `abc123`;
export async function build(): Promise<FastifyInstance> {
 const app = Fastify();

 app.addContentTypeParser(
  "text/plain",
  { parseAs: "string" },
  (req, body, done) => jsonContentParser(req, body, done)
 );

 app.addHook("preHandler", (req, res, done) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "*");
  const isPreflight = /options/i.test(req.method);
  if (isPreflight) {
   return res.send();
  }
  done();
 });

 app.get("/vehicles", (req, res) => {
  console.log({ route: "/vehicles", message: "get request to /vehicles" });

  try {
   // gets vehicles
   const data = getVehicles();
   const authHeader = req.headers.authorization;

   if (authHeader !== `Bearer ${apiKey}`) {
    return res.status(401).send({ message: "unauthorised" });
   }

   return res
    .status(200)
    .send({ message: "vehicles fetched successfully", data });
  } catch {
   return res.status(500).send({ message: "error fetching vehicles" });
  }
 });

 app.get(
  "/vehicles/:id",
  (req: FastifyRequest<{ Params: { id: any } }>, res) => {
   console.log({
    route: "/vehicles/:id",
    message: "get request to /vehicles/:id",
   });

   try {
    // gets one vehicle from the provided id
    const id = req.params.id;
    const vehicle = getVehicles().find((v) => v.id == (id as number)) as Veh;
    const authHeader = req.headers.authorization;

    if (authHeader !== `Bearer ${apiKey}`) {
     return res.status(401).send({ message: "bad auth" });
    }

    if (!vehicle) {
     return res.status(404).send({ message: "vehicle not found" });
    }

    return res
     .status(200)
     .send({ info: "vehicle fetched successfully", vehicle });
   } catch {
    return res.status(500).send({ message: "error fetching vehicle" });
   }
  }
 );

 app.post("/add-vehicle", (req, res) => {
  console.log({
   route: "/add-vehicle",
   message: "post request to /add-vehicle",
  });

  try {
   // lets the user add a vehicle
   const authHeader = req.headers.authorization;

   if (authHeader !== `Bearer ${apiKey}`) {
    return res.status(401).send({ message: "unauthorised" });
   }

   const vehicle = req.body as Veh;

   const highestId = getVehicles().reduce((acc, v) => {
    return v.id > acc ? v.id : acc;
   }, 0);

   addVehicle({ ...vehicle, id: highestId + 1 });

   return res.status(201).send({ message: "vehicle added successfully" });
  } catch {
   return res.status(500).send({ message: "error adding vehicle" });
  }
 });

 return app;
}

export const app = build();
