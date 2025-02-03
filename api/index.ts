import { app } from "./app";

app.then((instance) => {
 instance.listen({ host: "0.0.0.0", port: 3002 }, async (error) => {
  if (error) {
   process.exit(1);
  }
 });
});
