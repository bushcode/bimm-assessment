const line = [
  { weight: 100, floor: 6 },
  { weight: 300, floor: 2 },
  { weight: 80, floor: 2 },
  { weight: 100, floor: 5 },
  { weight: 120, floor: 3 },
  { weight: 160, floor: 4 },
  { weight: 120, floor: 6 },
  { weight: 250, floor: 2 },
  { weight: 180, floor: 5 },
  { weight: 120, floor: 4 },
]

//variables to store array of weights and floors values
var weights, floors

// utility function to remove duplicate entries from given array
function SantizeQueue(arr) {
  return arr.reduce((prev, curr) => {
    if (prev.indexOf(curr) === -1) {
      prev = prev.concat(curr)
    }
    return prev
  }, [])
}

//utility function to get list of passenger weights in the current queue
function CreateWeightsArray(arr) {
  return (weights = arr.map((person) => person.weight))
}

//utility function to get list of passenger destination  floor in the current queue
function CreateFloorArray(arr) {
  return (floors = arr.map((person) => person.floor))
}

/**
 * @param {Array.<Number>}  weights Array of passengers weights
 * @param {Array.<Number>}  floor Array of passenger destination floors
 * @param {Number}          maxBuildingFloors Number of floors in the building
 * @param {Number}          maxPassengers Elevator max passenger capacity
 * @param {Number}          maxWeight Elevator max weight capacity
 * @returns {Number}        Number of total stops
 */

function Elevator(weights, floors, maxBuildingFloors, maxPassengers, maxWeight) {
  let currentTrip = 0
  let totalWeight = 0
  let totalStops = []

  for (let i = 0; i < weights.length; i += 1) {
    // check to see if elevator has reached max weight or passenger capacity
    if (typeof totalStops[currentTrip] !== 'undefined') {
      if (
        totalStops[currentTrip].length === maxPassengers ||
        totalWeight + weights[i] > maxWeight
      ) {
        // increament current trip
        currentTrip++
        // reset the current weight
        totalWeight = 0
      }
    }

    // array to track stops of the current trip
    totalStops[currentTrip] = totalStops[currentTrip] || []

    totalStops[currentTrip].push(floors[i])
    totalWeight += weights[i]
  }

  //case for passengers on the same trip might stop on the same floor. Duplicate must be eliminated since that will be a single trip. 1 is added to to totalStops (return to ground floor)
  totalStops = totalStops.map((round) => SantizeQueue(round).length + 1)

  //return number of total stops.
  return totalStops.reduce((prev, curr) => prev + curr, 0)
}

CreateWeightsArray(line)
CreateFloorArray(line)
console.log(Elevator(weights, floors, 6, 2, 400))
