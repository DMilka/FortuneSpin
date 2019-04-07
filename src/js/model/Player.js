export default class Player {
  constructor(id, name, type) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.points = 0;
  }

  addPoints(points) {
    this.points += points;
  }


}