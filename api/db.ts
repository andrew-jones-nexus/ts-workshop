// I'm far too lazy to actually make a db for this, pretend this is a nice db client....

import { val } from "./val";

export interface Veh {
 id: number;
 name: string;
 make: string;
 color: string;
 mileage: number;
 category: string;
 inStock?: boolean;
}

const vehicles: Partial<Veh>[] = [
 {
  id: 0,
  name: "Model Y",
  make: "Tesla",
  color: "Blue",
  mileage: 15000,
  category: "car",
  inStock: false,
 },
 {
  id: 1,
  name: "Model S",
  make: "Tesla",
  mileage: 15000,
  category: "car",
  inStock: true,
 },
 {
  id: 2,
  name: "Civic",
  make: "Honda",
  color: "Blue",
  mileage: 30000,
  category: "car",
  inStock: false,
 },
 {
  id: 3,
  name: "Mustang",
  make: "Ford",
  color: "Black",
  mileage: 5000,
  category: "car",
  inStock: true,
 },
 {
  id: 4,
  name: "Corolla",
  make: "Toyota",
  color: "White",
  mileage: 25000,
  category: "car",
  inStock: true,
 },
 {
  id: 5,
  name: "F-150",
  make: "Ford",
  color: "Silver",
  mileage: 40000,
  category: "other",
  inStock: false,
 },
 {
  id: 6,
  name: "Accord",
  make: "Honda",
  color: "Gray",
  mileage: 20000,
  category: "car",
  inStock: true,
 },
 {
  id: 7,
  name: "Camry",
  make: "Toyota",
  color: "Green",
  mileage: 35000,
  category: "car",
  inStock: false,
 },
 {
  id: 8,
  name: "Model X",
  make: "Tesla",
  color: "Blue",
  mileage: 10000,
  category: "car",
  inStock: true,
 },
 {
  id: 9,
  name: "Ranger",
  make: "Ford",
  color: "Red",
  mileage: 45000,
  category: "other",
  inStock: true,
 },
 {
  id: 10,
  name: "Pilot",
  make: "Honda",
  color: "Black",
  mileage: 15000,
  inStock: false,
 },
 {
  id: 11,
  name: "Highlander",
  make: "Toyota",
  color: "White",
  mileage: 30000,
  category: "other",
  inStock: true,
 },
 {
  id: 12,
  name: "Cybertruck",
  make: "Tesla",
  mileage: 5000,
  category: "other",
  inStock: true,
 },
];

// pretend these are actually pushing to / pulling from a db
export const getVehicles = () => vehicles;

export const addVehicle = (vehicle) => {
 if (val(vehicle)) {
  vehicles.push(vehicle);
 } else throw new Error("Invalid vehicle");
};
