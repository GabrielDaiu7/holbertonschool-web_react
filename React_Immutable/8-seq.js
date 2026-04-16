import { Seq as seq } from 'immutable';

const capitalize = (value) => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();

export function printBestStudents(object) {
  const bestStudents = seq(object)
    .filter((student) => student.score >= 70)
    .map((student) => ({
      ...student,
      firstName: capitalize(student.firstName),
      lastName: capitalize(student.lastName),
    }));

  console.log(bestStudents.toJS());
}

export default printBestStudents;
