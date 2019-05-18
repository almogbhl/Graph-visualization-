const CalcAverage = (students) => {
  students.map(student => {
    let total;
    let average;
    let scores = [];

    student.scores.map(score => {
      scores.push(score.score);
    });

    total = scores.reduce(function(acc, val) {
      return acc + val;
    }, 0);

    average = parseInt(total / student.scores.length);

    student["average"] = average;
  });

  return students
};

export default CalcAverage;
