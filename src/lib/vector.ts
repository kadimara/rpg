class Vector {
	x: number = 0;
	y: number = 0;
	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	add(vector: Vector): Vector {
		return new Vector(this.x + vector.x, this.y + vector.y);
		// this.x += vector.x;
		// this.y += vector.y;
	}

	min(vector: Vector): Vector {
		return new Vector(this.x - vector.x, this.y - vector.y);
		// this.x -= vector.x;
		// this.y -= vector.y;
	}

	equals(vector: Vector): boolean {
		return this.x == vector.x && this.y == vector.y;
	}
}
export default Vector;
