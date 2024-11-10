package main

import (
	"fmt"
	"math"
	"math/rand/v2"
	"slices"
	"sort"
	"time"
)

func weightedRandomChoiceFloat(arr []float64) int {
	// Calculate the total sum of all weights.
    sum := 0.0
    for _, val := range arr {
        sum += val
    }

	// Generate a random number in the range [0, sum).
	r := rand.Float64() * sum
   
    cumulative := 0.0

    for i, val := range arr {
        cumulative += val
        if r <= cumulative {
            return i
        }
    }

    return len(arr) - 1
}

// basic math
func isEven(num int) bool {
	return num % 2 == 0
}

// Primitives
// Floor Division
func fd(a, b int) int {
	return int(math.Floor(float64(a) / float64(b)))
}
type Shufflable interface {
	Len() int
	Swap(i, j int)
}
func Shuffle(s Shufflable) {
	for n := s.Len(); n > 0; n-- {
		s.Swap(rand.IntN(n), n-1)
	}
}
func randRange(min, max int) int {
    return rand.IntN(max-min) + min
}

// Cube Identity
// Cube Order
const n int = 5
// Magic Cube Constant
var magic_constant int = int((n * (n * n * n + 1)) / 2)

// Cube Generator
type Cube [][][]int
type Face [][]int
// var perfect_numbers := []int{25,16,80,104,90,115,98,4,1,97,42,111,85,2,75,66,72,27,102,48,67,18,119,106,5,91,77,71,6,70,52,64,117,69,13,30,118,21,123,23,26,39,92,44,114,116,17,14,73,95,47,61,45,76,86,107,43,38,33,94,89,68,63,58,37,32,93,88,83,19,40,50,81,65,79,31,53,112,109,10,12,82,34,87,100,103,3,105,8,96,113,57,9,62,74,56,120,55,49,35,121,108,7,20,59,29,28,122,125,11,51,15,41,124,84,78,54,99,24,60,36,110,46,22,101}
var number_list = []int{1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125}
func generate_cube_from_numbers(numbers []int) Cube {
	cube := Cube{}
	for i := range n {
		face := Face{}
		for j := range n {
			edge := []int{}
			for k := range n {
				edge = append(edge, numbers[i * n * n + j * n + k])	
			}
			face = append(face, edge)
		}
		cube = append(cube, face)
	}
	return cube
}
func generate_numbers_from_cube(cube Cube) []int {
	numbers := []int{}
	for i := range n { for j := range n { for k := range n {
				numbers = append(numbers, cube[i][j][k])	
		}}}
	return numbers
}
func cube_shift_x(cube Cube) Cube {
	shifted_cube := Cube{}
	for k := range n {
		face := Face{}
		for j := range n {
			edge := []int{}
			for i := n-1; i >= 0; i-- {
				edge = append(edge, cube[i][j][k])
			}
			face = append(face, edge)
		}
		shifted_cube = append(shifted_cube, face)
	}
	return shifted_cube
}
func cube_shift_y(cube Cube) Cube {
	shifted_cube := Cube{}
	for j := range n {
		face := Face{}
		for i := n-1; i >= 0; i-- {
			face = append(face, cube[i][j])
		}
		shifted_cube = append(shifted_cube, face)
	}
	return shifted_cube
}
func copy_numbers(numbers []int) []int {
	new_numbers := []int{}
	for i := range len(numbers) { new_numbers = append(new_numbers, numbers[i])}
	return new_numbers
}
func copy_cube(cube Cube) Cube {
	new_cube := Cube{}
	for i := range n {
		face := Face{}
		for j := range n {
			edge := []int{}
			for k := range n {
				edge = append(edge, cube[i][j][k])	
			}
			face = append(face, edge)
		}
		new_cube = append(new_cube, face)
	}
	return new_cube
}
func generate_random_numbers() []int { 
	random_numbers := copy_numbers(number_list)
	Shuffle(sort.IntSlice(random_numbers))
	return random_numbers
}
func generate_random_cube() Cube {
	return generate_cube_from_numbers(generate_random_numbers())
}
func randomize_cube(cube Cube) Cube {
	random_numbers := generate_numbers_from_cube(cube)
	Shuffle(sort.IntSlice(random_numbers))
	return generate_cube_from_numbers(random_numbers)
}

// Objective Function
func cube_diagonal_sum(face Face) (int, int) { // Count 2 diagonals sum of cube face.
	first_diagonal_sum, second_diagonal_sum := 0, 0
	for i := range n { 
		first_diagonal_sum += face[i][i]
		second_diagonal_sum += face[i][4-i]
	}
	return first_diagonal_sum, second_diagonal_sum
}
func get_all_cube_sum(cube Cube) []int {
	total_sum := []int{} // row, col, depth, row, col, depth, 30 diagonals, 4 triagonals

	// Row, Column, Depth
	for i := range n { 
		for j := range n {
			row_sum := 0
			column_sum := 0
			depth_sum := 0
			for k := range n { 
				row_sum += cube[i][j][k]
				column_sum += cube[i][k][j]
				depth_sum += cube[k][i][j]
			}
			total_sum = append(total_sum, row_sum)
			total_sum = append(total_sum, column_sum)
			total_sum = append(total_sum, depth_sum)
		}
	}

	// Face Diagonal
	shift_x_cube := cube_shift_x(cube)
	shift_y_cube := cube_shift_y(cube)
	cube_orientation := [][][][]int{cube, shift_x_cube, shift_y_cube}
	for i, orientation := range cube_orientation {
		for j, face := range orientation {
			face_diagonal_sum_1, face_diagonal_sum_2 := cube_diagonal_sum(face)
			total_sum = append(total_sum, face_diagonal_sum_1)
			total_sum = append(total_sum, face_diagonal_sum_2)

			_, _ = i, j
		}
	}

	// Space Diagonal
	space_diagonal_sum_1, space_diagonal_sum_2, space_diagonal_sum_3, space_diagonal_sum_4 := 0, 0, 0, 0
	for i := range n {
		space_diagonal_sum_1 += cube[i][i][i]
		space_diagonal_sum_2 += cube[i][4-i][4-i]
		space_diagonal_sum_3 += cube[i][i][4-i]
		space_diagonal_sum_4 += cube[i][4-i][i]
	}
	total_sum = append(total_sum, space_diagonal_sum_1)
	total_sum = append(total_sum, space_diagonal_sum_2)
	total_sum = append(total_sum, space_diagonal_sum_3)
	total_sum = append(total_sum, space_diagonal_sum_4)

	return total_sum
}
/*
func generate_all_cube_shifts(cube Cube) []Cube {
	shifts := []Cube{}
	current_cube := copy_cube(cube)
	for i := range 3 {
		for j := range 3 {
			shifts = append(shifts, current_cube)
			current_cube = cube_shift_y(current_cube)
			_ = j
		}
		current_cube = copy_cube(cube)
		for k:= in range i+1 {
			current_cube = cube_shift_x(cube)
			_ = k
		}
		_ = i
	}
	return shifts
}
	*/
type ObjectiveFunction func(Cube) int
func violated_magic_sum_count(cube Cube) int {
	count := 0
	all_cube_sum := get_all_cube_sum(cube)
	max_sum := len(all_cube_sum)
	for i := range max_sum {
		if all_cube_sum[i] == magic_constant {
			count += 1
		}
	}
	return max_sum - count
}
func sum_of_magic_sum_differences(cube Cube) int {
	sum := 0
	all_cube_sum := get_all_cube_sum(cube)
	max_sum := len(all_cube_sum)
	for i := range max_sum {
		sum += int(math.Abs(float64(magic_constant - all_cube_sum[i])))
	}
	return sum
}

// Neighbor Generator
type NeighborState struct {
    objective_function_value int
    initial_coordinate []int
	target_coordinate []int
	swapped_cube_state Cube
}
type AllNeighbors struct {
	min_objective_value int
	min_neighbor_index int
	neighbor_states []NeighborState
}

func generate_neighbor_states(cube Cube, objective_function ObjectiveFunction, count int, random_range bool) AllNeighbors {
	var all_neighbors AllNeighbors
	
	min_objective_value := 32767 // max int16
	min_neighbor_index := -1
	neighbor_states := []NeighborState{}
	
	index := 0
	var neighbor_state NeighborState

	if !random_range { // Undefined random range -> 7750 successors
		innerLoop:
		for i := range n * n * n {
			outerLoop:
			for j := i + 1; j < n * n * n; j++ {
				if index >= count { break }

				swapped_cube_state := copy_cube(cube)

				initial_coordinate := []int{fd(fd(i, n), n), fd(i, n) % n, i % n}
				target_coordinate := []int{fd(fd(j, n), n), fd(j, n) % n, j % n}
				swapped_cube_state[initial_coordinate[0]][initial_coordinate[1]][initial_coordinate[2]], swapped_cube_state[target_coordinate[0]][target_coordinate[1]][target_coordinate[2]] = swapped_cube_state[target_coordinate[0]][target_coordinate[1]][target_coordinate[2]], swapped_cube_state[initial_coordinate[0]][initial_coordinate[1]][initial_coordinate[2]]

				neighbor_state.initial_coordinate = initial_coordinate
				neighbor_state.target_coordinate = target_coordinate
				neighbor_state.swapped_cube_state = swapped_cube_state
				neighbor_state.objective_function_value = objective_function(swapped_cube_state)

				if neighbor_state.objective_function_value < min_objective_value {
					min_objective_value = neighbor_state.objective_function_value
					min_neighbor_index = index
				}
				neighbor_states = append(neighbor_states, neighbor_state)

				index += 1
				if index >= count {
					break outerLoop
					break innerLoop
				}  
			}
		}
	} else { // Defined random range -> n successors
		for index < count {
			swapped_cube_state := copy_cube(cube)

			i := randRange(0, 124)
			j := randRange(i+1, 125)
			
			initial_coordinate := []int{fd(fd(i, n), n), fd(i, n) % n, i % n}
			target_coordinate := []int{fd(fd(j, n), n), fd(j, n) % n, j % n}
			swapped_cube_state[initial_coordinate[0]][initial_coordinate[1]][initial_coordinate[2]], swapped_cube_state[target_coordinate[0]][target_coordinate[1]][target_coordinate[2]] = swapped_cube_state[target_coordinate[0]][target_coordinate[1]][target_coordinate[2]], swapped_cube_state[initial_coordinate[0]][initial_coordinate[1]][initial_coordinate[2]]

			neighbor_state.initial_coordinate = initial_coordinate
			neighbor_state.target_coordinate = target_coordinate
			neighbor_state.swapped_cube_state = swapped_cube_state
			neighbor_state.objective_function_value = objective_function(swapped_cube_state)

			if neighbor_state.objective_function_value < min_objective_value {
				min_objective_value = neighbor_state.objective_function_value
				min_neighbor_index = index
			}
			neighbor_states = append(neighbor_states, neighbor_state)
			
			index += 1
		}
	}

	all_neighbors.min_objective_value = min_objective_value
	all_neighbors.min_neighbor_index = min_neighbor_index
	all_neighbors.neighbor_states = neighbor_states
	return all_neighbors
}

// ======== Hill Climbing Algorithms ========
type SwapPair struct {
	initial_coordinate []int
	target_coordinate []int
}

type LocalSearchResultSteepestAscent struct {
	objective_function_logs []int
	swap_logs []SwapPair
	final_state Cube
	time int
	iteration int
}

type LocalSearchResultSidewaysMove struct {
	objective_function_logs []int
	swap_logs []SwapPair
	final_state Cube
	max_sideways int
	time int
	iteration int
}

type LocalSearchResultRestart struct {
	objective_function_logs []int
	swap_logs []SwapPair
	final_state Cube
	max_restart int
	time int
	iteration_per_restart int
	restart_iteration int
}

type LocalSearchResultStochastic struct {
	objective_function_logs []int
	swap_logs []SwapPair
	final_state Cube
	time int
	iteration int
}

// Steepest Ascent Hill-climbing
func steepest_ascent_hill_climbing(cube Cube, objective_function ObjectiveFunction) LocalSearchResultSteepestAscent {
	current_state := copy_cube(cube)
	var local_search_result LocalSearchResultSteepestAscent
	objective_function_logs := []int{}
	var swap_pair SwapPair
	swap_logs := []SwapPair{}

	current_objective_function := objective_function(current_state)
	objective_function_logs = append(objective_function_logs, current_objective_function)
	fmt.Println("Objective Function Value:", current_objective_function)

	improved := true
	for improved && current_objective_function > 0 {
		neighbor_states := generate_neighbor_states(current_state, objective_function, 7750, false)
		best_neighbor_value := neighbor_states.min_objective_value
		best_neighbor_index := neighbor_states.min_neighbor_index
		if best_neighbor_value >= current_objective_function {
			improved = false
		} else {
			current_state = neighbor_states.neighbor_states[best_neighbor_index].swapped_cube_state
			current_objective_function = best_neighbor_value
			objective_function_logs = append(objective_function_logs, current_objective_function)

			swap_pair.initial_coordinate = neighbor_states.neighbor_states[best_neighbor_index].initial_coordinate
			swap_pair.target_coordinate = neighbor_states.neighbor_states[best_neighbor_index].target_coordinate
			swap_logs = append(swap_logs, swap_pair)

			fmt.Println("Objective Function Value:", current_objective_function)
		}
	}

	local_search_result.objective_function_logs = objective_function_logs
	local_search_result.swap_logs = swap_logs
	local_search_result.final_state = current_state
	return local_search_result
}

// Hill-climbing with Sideways Move
func hill_climbing_with_sideways_move(cube Cube, objective_function ObjectiveFunction) LocalSearchResultSidewaysMove {
	current_state := copy_cube(cube)
	var local_search_result LocalSearchResultSidewaysMove
	objective_function_logs := []int{}
	var swap_pair SwapPair
	swap_logs := []SwapPair{}

	current_objective_function := objective_function(current_state)
	objective_function_logs = append(objective_function_logs, current_objective_function)
	fmt.Println("Objective Function Value:", current_objective_function)

	improved := true
	for improved && current_objective_function > 0 {
		neighbor_states := generate_neighbor_states(current_state, objective_function, 7750, false)
		best_neighbor_value := neighbor_states.min_objective_value
		best_neighbor_index := neighbor_states.min_neighbor_index
		if best_neighbor_value > current_objective_function {
			improved = false
		} else {
			current_state = neighbor_states.neighbor_states[best_neighbor_index].swapped_cube_state
			current_objective_function = best_neighbor_value
			objective_function_logs = append(objective_function_logs, current_objective_function)

			swap_pair.initial_coordinate = neighbor_states.neighbor_states[best_neighbor_index].initial_coordinate
			swap_pair.target_coordinate = neighbor_states.neighbor_states[best_neighbor_index].target_coordinate
			swap_logs = append(swap_logs, swap_pair)

			fmt.Println("Objective Function Value:", current_objective_function)
		}
	}

	local_search_result.objective_function_logs = objective_function_logs
	local_search_result.swap_logs = swap_logs
	local_search_result.final_state = current_state
	return local_search_result
}

// Random Restart Hill-climbing
func random_restart_hill_climbing(cube Cube, objective_function ObjectiveFunction) LocalSearchResultRestart {
	current_state := copy_cube(cube)
	var local_search_result LocalSearchResultRestart
	objective_function_logs := []int{}
	var swap_pair SwapPair
	swap_logs := []SwapPair{}

	current_objective_function := objective_function(current_state)
	objective_function_logs = append(objective_function_logs, current_objective_function)
	fmt.Println("Objective Function Value:", current_objective_function)

	for current_objective_function > 0 {
		neighbor_states := generate_neighbor_states(current_state, objective_function, 7750, false)
		best_neighbor_value := neighbor_states.min_objective_value
		best_neighbor_index := neighbor_states.min_neighbor_index
		if best_neighbor_value >= current_objective_function {
			current_state = randomize_cube(current_state)
			current_objective_function = objective_function(current_state)
		} else {
			current_state = neighbor_states.neighbor_states[best_neighbor_index].swapped_cube_state
			current_objective_function = best_neighbor_value

			swap_pair.initial_coordinate = neighbor_states.neighbor_states[best_neighbor_index].initial_coordinate
			swap_pair.target_coordinate = neighbor_states.neighbor_states[best_neighbor_index].target_coordinate
			swap_logs = append(swap_logs, swap_pair)
		}
		objective_function_logs = append(objective_function_logs, current_objective_function)
		fmt.Println("Objective Function Value:", current_objective_function)
	}

	local_search_result.objective_function_logs = objective_function_logs
	local_search_result.swap_logs = swap_logs
	local_search_result.final_state = current_state
	return local_search_result
}

// Stochastic Hill-climbing
func stochastic_hill_climbing(cube Cube, objective_function ObjectiveFunction, max_iteration int) LocalSearchResultStochastic {
	current_state := copy_cube(cube)
	current_iteration := 0
	var local_search_result LocalSearchResultStochastic
	objective_function_logs := []int{}
	var swap_pair SwapPair
	swap_logs := []SwapPair{}

	current_objective_function := objective_function(current_state)
	objective_function_logs = append(objective_function_logs, current_objective_function)
	fmt.Printf("Objective Function Value: %d, Current Iteration: %d\n", current_objective_function, current_iteration)
	current_iteration += 1

	for current_iteration <= max_iteration && current_objective_function > 0 {
		neighbor_states := generate_neighbor_states(current_state, objective_function, 1, true)
		random_neighbor_index := neighbor_states.min_neighbor_index
		random_neighbor := neighbor_states.neighbor_states[random_neighbor_index]
		random_neighbor_value := random_neighbor.objective_function_value
		
		if random_neighbor_value < current_objective_function {
			current_state = random_neighbor.swapped_cube_state
			current_objective_function = random_neighbor_value
			objective_function_logs = append(objective_function_logs, current_objective_function)

			swap_pair.initial_coordinate = random_neighbor.initial_coordinate
			swap_pair.target_coordinate = random_neighbor.target_coordinate
			swap_logs = append(swap_logs, swap_pair)
		}
		fmt.Printf("Objective Function Value: %d, Current Iteration: %d\n", current_objective_function, current_iteration)

		current_iteration += 1
	}

	local_search_result.objective_function_logs = objective_function_logs
	local_search_result.swap_logs = swap_logs
	local_search_result.final_state = current_state
	return local_search_result
}

// Simulated Annealing
func schedule_temperature(current_iteration float64, current_temperature float64, cooling_rate float64) float64  {

	tempValue := current_temperature * math.Pow(cooling_rate, current_iteration)
	if tempValue < 0.00005 {
		return 0.0
	}
	return tempValue
}
type SimulatedAnnealingResult struct {
	objective_function_logs []int
	swap_logs []SwapPair
	final_state Cube
	stuck_iteration int
	time int
	temperatures []float64
	not_changed int // delta_E <= 0 tetapi tidak berubah
	probability_plot []float64 // for visualization purpose
}
func simulated_annealing(cube Cube, objective_function ObjectiveFunction, initial_temperature float64, cooling_rate float64) SimulatedAnnealingResult {
	timeStart := time.Now() // for time elapsed purpose
	temperature := []float64{} // for visualization purpose
	probability_plot := []float64{} // for visualization purpose
	current_state := copy_cube(cube)
	stuck_iteration := 0
	var simulated_local_result SimulatedAnnealingResult
	objective_function_logs := []int{}
	var swap_pair SwapPair
	swap_logs := []SwapPair{}
	var current_iteration float64 = 1
	current_temperature := initial_temperature
	temperature = append(temperature, current_temperature) // for visualization purpose
	current_objective_function := objective_function(current_state)
	objective_function_logs = append(objective_function_logs, current_objective_function)
	// fmt.Printf("Objective Function Value: %d, Current Iteration: %d, Current Temperature: %f\n", current_objective_function, int(current_iteration), current_temperature)

	tidakBerubah := 0 // cek deltaE < 0 tetapi tidak berpindah
	// for current_iteration < max_iteration && current_objective_function > 0 {
	for current_temperature > 0.0 && current_objective_function > 0 {
		current_temperature = schedule_temperature(current_iteration, current_temperature, cooling_rate)
		temperature = append(temperature, math.Round(current_temperature * 100) / 100) // for visualization purpose
		// fmt.Printf("Current Temperature: %f\n", current_temperature)
		// fmt.Println(temperature)
		if current_temperature == 0.0 {
			break
		}
		neighbor_states := generate_neighbor_states(current_state, objective_function, 1, true)
		random_neighbor_index := neighbor_states.min_neighbor_index
		random_neighbor := neighbor_states.neighbor_states[random_neighbor_index]
		random_neighbor_value := random_neighbor.objective_function_value
		
		delta_E := float64(current_objective_function - random_neighbor_value)
		if delta_E > 0 {
			probability_plot = append(probability_plot, 1)
			current_state = random_neighbor.swapped_cube_state
			current_objective_function = random_neighbor_value
			objective_function_logs = append(objective_function_logs, current_objective_function)

			swap_pair.initial_coordinate = random_neighbor.initial_coordinate
			swap_pair.target_coordinate = random_neighbor.target_coordinate
			swap_logs = append(swap_logs, swap_pair)
		} else {
			probability := math.Exp(delta_E / current_temperature)
			probability_plot = append(probability_plot, probability)
			if probability > rand.Float64() {
				current_state = random_neighbor.swapped_cube_state
				current_objective_function = random_neighbor_value
				objective_function_logs = append(objective_function_logs, current_objective_function)

				swap_pair.initial_coordinate = random_neighbor.initial_coordinate
				swap_pair.target_coordinate = random_neighbor.target_coordinate
				swap_logs = append(swap_logs, swap_pair)
				stuck_iteration += 1
			} else { tidakBerubah += 1 }
		}
		fmt.Printf("Objective Function Value: %d, Current Iteration: %d, Current Temperature: %f\n", current_objective_function, int(current_iteration), current_temperature)
		current_iteration += 1
	}

	simulated_local_result.objective_function_logs = objective_function_logs
	simulated_local_result.swap_logs = swap_logs
	simulated_local_result.final_state = current_state
	simulated_local_result.stuck_iteration = stuck_iteration
	simulated_local_result.temperatures = temperature
	simulated_local_result.not_changed = tidakBerubah
	simulated_local_result.probability_plot = probability_plot
	timeElapsed := time.Since(timeStart)
	simulated_local_result.time = int(timeElapsed.Milliseconds())
	return simulated_local_result
}

func crossoverTwoSlices(parent1, parent2 Cube) (Cube, Cube) {
	parent1_num := generate_numbers_from_cube(parent1)
	parent2_num := generate_numbers_from_cube(parent2)

	// crossover
	crossover_point := rand.IntN(125)
	child1_num := append(parent1_num[:crossover_point], parent2_num[crossover_point:]...)
	child2_num := append(parent2_num[:crossover_point], parent1_num[crossover_point:]...)

	// generate child cubes
	child1 := generate_cube_from_numbers(child1_num)
	child2 := generate_cube_from_numbers(child2_num)

	return child1, child2
}

func swapCubeOfCubes(cube Cube, x1 int, x2 int, y1 int, y2 int, z1 int, z2 int) {
	cube[x1][y1][z1], cube[x2][y2][z2] = cube[x2][y2][z2], cube[x1][y1][z1]
}

type GeneticAlgorithmResult struct {

	// initial state
	initial_cube []Cube
	initial_best_cube Cube // for visualization: initial state of cube (best cube)
	initial_best_value int // initial value of the best cube (best value) 

	// final state
	final_cube []Cube // 
	final_best_cube Cube // for visualization: final state of cube (best cube)
	final_best_value int // final value of the best cube (best value)

	// iteration visualization purpose
	objective_value_plot []int // for visualization: plot of the best value of every iteration
	avg_objective_value int // for visualization: average of the best valie (accumulative of all iterations)
	// essential constants
	population int
	iteration int
	time int
}

func genetic_algorithm(objective_function ObjectiveFunction, n_population int, n_iteration int) GeneticAlgorithmResult {
	
	// Essential constants
	var genetic_algorithm_result GeneticAlgorithmResult
	timeStart := time.Now()
	population := n_population
	iteration := n_iteration
	
	// initial state (constant) -> consists of n_population cubes
	initial_cube := []Cube{}
	initial_best_cube := Cube{}
	initial_best_value := 999

	// final state (always treat the last) -> consists of n_population cubes
	final_cube := []Cube{}
	final_best_cube := Cube{}
	final_best_value := 999

	objective_value_plot := []int{} // for visualization: plot of the best value of every iteration
	avg_objective_value := 0

	// Used for iterations
	current_cube := []Cube{}
	_ = current_cube
	
	// ===== generate n random cubes to initial_cube, copy to current_cube =====

	// get initial_best_cube, initial_best_value
	// generate random n_population initial cubes
	// NOT yet iteration

	for i := range population { 
		_ = i
		initial_cube = append(initial_cube, generate_random_cube()) // generate n random cubes
		obj_value_check := objective_function(initial_cube[i]) // check objective value

		if obj_value_check < initial_best_value { //get the best initial value
			initial_best_value = obj_value_check
			initial_best_cube = initial_cube[i]
		}
	}

	// deep copy initial_cube into current_cube
	current_cube = slices.Clone(initial_cube)

	// ===== initial max objective value plot ======
	objective_value_plot = append(objective_value_plot, initial_best_value)

	// ===== Start of Iterations ======
	for i := range iteration {
		_ = i
		// initial preparation for iterations
		current_best_value := 999
		fitness_sum := 0.0
		// best_objective_value = 999
		n_objective_value := []int{}

		// ===== Count all fitness value =====
		fitness_value := []float64{}
		for j := range population { // check fitness value
			_ = j
			n_objective_value = append(n_objective_value, objective_function(current_cube[j]))
			fitness_value = append(fitness_value, 1.0 / float64(n_objective_value[j] + 1))
		}

		// Normalize fitness values
		for _, value := range fitness_value {
			fitness_sum += value
		}
		for j := range fitness_value {
			fitness_value[j] /= fitness_sum
		}

		final_cube = []Cube{}
		// ===== Selection using weightedRandomChoiceFloat =====
		for j := range population { // spin wheel (weighted probs)
			_ = j
			x := weightedRandomChoiceFloat(fitness_value)
			// fmt.Printf("x: %d\n", x)
			final_cube = append(final_cube, current_cube[x]) // from chosen x index using weighted func
		}

		current_cube = []Cube{}

		// ===== Crossover =====
		if isEven(population) {
			for j := 0; j < population; j += 2 {
				_ = j
				child1, child2 := crossoverTwoSlices(final_cube[j], final_cube[j+1])
				current_cube = append(current_cube, child1)
				current_cube = append(current_cube, child2)
			}
		} else {
			for j := 0; j < population-1; j += 2 {
				_ = j
				child1, child2 := crossoverTwoSlices(final_cube[j], final_cube[j+1])
				current_cube = append(current_cube, child1)
				current_cube = append(current_cube, child2)
			}
			current_cube = append(current_cube, final_cube[population-1])

			child1, child2 := crossoverTwoSlices(final_cube[population-1], final_cube[0])
			_ = child2
			current_cube = append(current_cube, child1)
		}

		// ===== Mutation =====
		// mutation used: swap between 2 cube of 5*5*5 cubes
		for j := range population {
			_ = j
			x1 := rand.IntN(5)
			y1 := rand.IntN(5)
			z1 := rand.IntN(5)

			x2 := rand.IntN(5)
			y2 := rand.IntN(5)
			z2 := rand.IntN(5)
			swapCubeOfCubes(current_cube[j], x1, x2, y1, y2, z1, z2)
		}
		
		// Find the best value of final state before moving to the next iteration
		for j := range population {
			_ = j
			obj_value_check := objective_function(current_cube[j])
			if obj_value_check < current_best_value {
				current_best_value = obj_value_check
			}
		}

		objective_value_plot = append(objective_value_plot, current_best_value)

		// Preparation to next iteration
		// Copy final into current
		// Free up final state
		final_cube = []Cube{}
		_ = final_cube
		final_cube = slices.Clone(current_cube)
	}

	// Put final best cube after all iterations finished
	for i := range population {
		_ = i

		obj_value_check := objective_function(final_cube[i])
		if obj_value_check < final_best_value {
			final_best_value = obj_value_check
			final_best_cube = final_cube[i]
		}
	}
	
	genetic_algorithm_result.initial_cube = initial_cube
	genetic_algorithm_result.initial_best_cube = initial_best_cube
	genetic_algorithm_result.initial_best_value = initial_best_value
	genetic_algorithm_result.final_cube = final_cube
	genetic_algorithm_result.final_best_cube = final_best_cube
	genetic_algorithm_result.final_best_value = final_best_value
	genetic_algorithm_result.objective_value_plot = objective_value_plot
	genetic_algorithm_result.avg_objective_value = avg_objective_value
	genetic_algorithm_result.population = population
	genetic_algorithm_result.iteration = iteration
	timeElapsed := time.Since(timeStart)
	genetic_algorithm_result.time = int(timeElapsed.Milliseconds())
	return genetic_algorithm_result
}

func main() {
	var cube Cube = generate_random_cube()
	// violated_magic_sum_count
	// sum_of_magic_sum_differences

	// steepest_ascent_hill_climbing
	// hill_climbing_with_sideways_move
	// random_restart_hill_climbing
	// stochastic_hill_climbing

	// test := steepest_ascent_hill_climbing(cube, violated_magic_sum_count)
	//test := hill_climbing_with_sideways_move(cube, violated_magic_sum_count)
	//test := random_restart_hill_climbing(cube, violated_magic_sum_count)
	//test := stochastic_hill_climbing(cube, violated_magic_sum_count, 1000000)
	// test_genetic_algorithm := genetic_algorithm(violated_magic_sum_count, 10, 1000)
	
	
	
	// ===== SIMULATED ANNEALING TEST =====
	test_simulated_annealing := simulated_annealing(cube, violated_magic_sum_count, 10, 0.9999)
	fmt.Printf("time exceeded: %d\n", test_simulated_annealing.time)
	fmt.Printf("stuck iteration: %d\n", test_simulated_annealing.stuck_iteration) // masuk ke DeltaE <= 0
	fmt.Printf("not changed: %d\n", test_simulated_annealing.not_changed) // masuk ke DeltaE <= 0 tetapi tidak berpindah ke state baru yang lebih buruk
	fmt.Printf("Initial Obj Value: %d\n", test_simulated_annealing.objective_function_logs[0])
	fmt.Printf("Final Obj Value: %d\n", test_simulated_annealing.objective_function_logs[len(test_simulated_annealing.objective_function_logs)-1])
	// fmt.Printf("probability_plot %f\n", test_simulated_annealing.probability_plot)
	// fmt.Println(len(test_simulated_annealing.swap_logs))
	
	

	// ===== end of program =====
	fmt.Printf("Program finished, no error occurred.")
	//_ = test
}