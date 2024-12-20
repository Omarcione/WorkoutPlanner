import { Workout } from "@/types";
import React, { useState } from "react";
import Modal from "@/components/Modal";
import Link from "next/link";

interface WorkoutCardProps {
  workout: Workout;
  onUpdateFavorite: (workoutId: number) => void;
  onDeleteWorkout: (workoutId: number) => void;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({
  workout,
  onUpdateFavorite,
  onDeleteWorkout
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    console.log(workout.id);
  };
  const closeModal = () => setIsModalOpen(false);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (workout.id) {
      onUpdateFavorite(workout.id);
    }
  };

  const handleDelete = () => {
    if (workout.id) {
      onDeleteWorkout(workout.id); // Trigger the delete function passed as a prop
      closeModal(); // Close the modal after deletion
    }
  };

  let exercises = workout.exercises;
  return (
    <>
      <div
        onClick={openModal}
        className="relative flex flex-col bg-black text-gray-300 rounded-lg shadow-left-purple p-4 md:p-6 lg:p-8 h-full max-w-full md:max-w-md lg:max-w-lg hover:ring hover:ring-purple hover:ring-2 hover:cursor-pointer transition duration-300"
      >
        <h2 className="text-white text-lg md:text-xl lg:text-2xl font-bold mb-2 md:mb-4">
          {workout.name}
        </h2>
        <button
          className="absolute top-[2rem] right-[2rem]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={toggleFavorite} // Handle click to toggle favorite
          style={{
            border: "none",
            backgroundColor: "transparent",
            cursor: "pointer",
          }}
        >
          {isHovered || workout.favorite ? (
            <svg
              className="text-red-400 w-6 h-auto fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84.02L256 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 .0003 232.4 .0003 190.9L0 190.9z" />
            </svg>
          ) : (
            <svg
              className="text-red-400 w-6 h-auto fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M244 84L255.1 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 0 232.4 0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84C243.1 84 244 84.01 244 84L244 84zM255.1 163.9L210.1 117.1C188.4 96.28 157.6 86.4 127.3 91.44C81.55 99.07 48 138.7 48 185.1V190.9C48 219.1 59.71 246.1 80.34 265.3L256 429.3L431.7 265.3C452.3 246.1 464 219.1 464 190.9V185.1C464 138.7 430.4 99.07 384.7 91.44C354.4 86.4 323.6 96.28 301.9 117.1L255.1 163.9z" />
            </svg>
          )}
        </button>

        <ul className="space-y-1 md:space-y-2 text-gray-400 mb-2 md:mb-4">
          {exercises &&
            exercises.slice(0, 4).map((exercise, index) => (
              <li key={index}>
                {exercise.name}
                {exercises && index === 3 && exercises.length > 4 && "..."}
              </li>
            ))}
        </ul>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} width="w-[400px]">
        <h2 className="text-white text-2xl font-bold mb-4">{workout.name}</h2>
        <ul className="space-y-2 text-gray-400 mb-6">
          {workout &&
            workout.exercises &&
            workout.exercises.map((exercise, index) => (
              <li key={index} className="text-lg">
                {exercise.name}
              </li>
            ))}
        </ul>
        <Link
          className="bg-purple text-white text-lg font-bold px-6 py-2 rounded-full text-l bg-purple border-none transition-transform duration-500 hover:bg-transitionPurple hover:scale-125"
          href={{
            pathname: "/currentWorkout",
            query: { workoutId: workout.id ? workout.id : "NewWorkout" },
          }}
          passHref
        >
          Start
        </Link>
        <button
          onClick={handleDelete}
          className="absolute bottom-4 right-4 bg-red-600 text-white px-4 py-2 rounded-full text-lg hover:bg-red-700 transition duration-300"
        >
          Delete
        </button>
      </Modal>
    </>
  );
};

export default WorkoutCard;
