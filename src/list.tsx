/* eslint-disable @typescript-eslint/no-explicit-any */
import classes from "./styles/andys.module.css";
export const ListView = (props: { vehicles: any }) => {
 if (!props.vehicles?.data) {
  return <div>Loading...</div>;
 }
 return (
  <>
   <h1>Vehicle List</h1>
   <div className={classes.container}>
    {props.vehicles.data.map((vehicle: Record<string, any>) => (
     <div key={vehicle.id} className={classes.block}>
      <h2>{vehicle.name}</h2>
      <p>Make: {vehicle.make}</p>
      <p>Color: {vehicle.color}</p>
      <p>Mileage: {vehicle.mileage}</p>
      <p>Category: {vehicle.category}</p>
      <p>In Stock: {vehicle.inStock ? "Yes" : "No"}</p>
     </div>
    ))}
   </div>
  </>
 );
};
