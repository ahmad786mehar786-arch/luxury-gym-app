(() => {
  "use strict";

  const exerciseLibrary = [
    {
      id: "ex-1",
      name: "Bench Press",
      bodyPart: "chest",
      level: "intermediate",
      equipment: "barbell",
      for: "men",
      icon: "🏋️"
    },
    {
      id: "ex-2",
      name: "Push Up",
      bodyPart: "chest",
      level: "beginner",
      equipment: "bodyweight",
      for: "all",
      icon: "💪"
    },
    {
      id: "ex-3",
      name: "Incline Dumbbell Press",
      bodyPart: "chest",
      level: "intermediate",
      equipment: "dumbbell",
      for: "men",
      icon: "🔥"
    },
    {
      id: "ex-4",
      name: "Lat Pulldown",
      bodyPart: "back",
      level: "beginner",
      equipment: "machine",
      for: "all",
      icon: "🦾"
    },
    {
      id: "ex-5",
      name: "Barbell Row",
      bodyPart: "back",
      level: "intermediate",
      equipment: "barbell",
      for: "men",
      icon: "🏋️"
    },
    {
      id: "ex-6",
      name: "Deadlift",
      bodyPart: "back",
      level: "advanced",
      equipment: "barbell",
      for: "men",
      icon: "⚡"
    },
    {
      id: "ex-7",
      name: "Shoulder Press",
      bodyPart: "shoulders",
      level: "intermediate",
      equipment: "dumbbell",
      for: "all",
      icon: "🔺"
    },
    {
      id: "ex-8",
      name: "Lateral Raise",
      bodyPart: "shoulders",
      level: "beginner",
      equipment: "dumbbell",
      for: "all",
      icon: "🎯"
    },
    {
      id: "ex-9",
      name: "Rear Delt Fly",
      bodyPart: "shoulders",
      level: "intermediate",
      equipment: "machine",
      for: "all",
      icon: "🪽"
    },
    {
      id: "ex-10",
      name: "Barbell Curl",
      bodyPart: "arms",
      level: "beginner",
      equipment: "barbell",
      for: "men",
      icon: "💥"
    },
    {
      id: "ex-11",
      name: "Hammer Curl",
      bodyPart: "arms",
      level: "beginner",
      equipment: "dumbbell",
      for: "all",
      icon: "🔨"
    },
    {
      id: "ex-12",
      name: "Tricep Pushdown",
      bodyPart: "arms",
      level: "beginner",
      equipment: "cable",
      for: "all",
      icon: "🧵"
    },
    {
      id: "ex-13",
      name: "Skull Crusher",
      bodyPart: "arms",
      level: "intermediate",
      equipment: "barbell",
      for: "men",
      icon: "⚔️"
    },
    {
      id: "ex-14",
      name: "Barbell Squat",
      bodyPart: "legs",
      level: "intermediate",
      equipment: "barbell",
      for: "men",
      icon: "🦵"
    },
    {
      id: "ex-15",
      name: "Leg Press",
      bodyPart: "legs",
      level: "beginner",
      equipment: "machine",
      for: "all",
      icon: "🚀"
    },
    {
      id: "ex-16",
      name: "Walking Lunges",
      bodyPart: "legs",
      level: "beginner",
      equipment: "bodyweight",
      for: "all",
      icon: "👣"
    },
    {
      id: "ex-17",
      name: "Romanian Deadlift",
      bodyPart: "glutes",
      level: "intermediate",
      equipment: "barbell",
      for: "all",
      icon: "🍑"
    },
    {
      id: "ex-18",
      name: "Hip Thrust",
      bodyPart: "glutes",
      level: "intermediate",
      equipment: "barbell",
      for: "all",
      icon: "⬆️"
    },
    {
      id: "ex-19",
      name: "Crunches",
      bodyPart: "abs",
      level: "beginner",
      equipment: "bodyweight",
      for: "all",
      icon: "🧱"
    },
    {
      id: "ex-20",
      name: "Plank",
      bodyPart: "abs",
      level: "beginner",
      equipment: "bodyweight",
      for: "all",
      icon: "⏳"
    },
    {
      id: "ex-21",
      name: "Cable Crunch",
      bodyPart: "abs",
      level: "intermediate",
      equipment: "cable",
      for: "all",
      icon: "🔗"
    },
    {
      id: "ex-22",
      name: "Treadmill Walk",
      bodyPart: "cardio",
      level: "beginner",
      equipment: "machine",
      for: "all",
      icon: "🏃"
    },
    {
      id: "ex-23",
      name: "Cycling",
      bodyPart: "cardio",
      level: "beginner",
      equipment: "bike",
      for: "all",
      icon: "🚴"
    },
    {
      id: "ex-24",
      name: "Burpees",
      bodyPart: "cardio",
      level: "advanced",
      equipment: "bodyweight",
      for: "all",
      icon: "🔥"
    }
  ];

  function delay(ms = 120) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function getExerciseLibrary() {
    await delay();
    return [...exerciseLibrary];
  }

  async function getExercisesByBodyPart(bodyPart) {
    await delay();
    return exerciseLibrary.filter(
      (item) => item.bodyPart.toLowerCase() === String(bodyPart || "").toLowerCase()
    );
  }

  async function getFeaturedExercisesForMen() {
    await delay();
    return exerciseLibrary.filter(
      (item) => item.for === "men" || item.for === "all"
    );
  }

  window.LuxApi = {
    getExerciseLibrary,
    getExercisesByBodyPart,
    getFeaturedExercisesForMen
  };
})();