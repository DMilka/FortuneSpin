export default class Player {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.points = 0;
  }

  addPoints(points) {
    this.points += points;
  }


}