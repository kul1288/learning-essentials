// 1. find overlapping in range 
function countOverlap(time_stamps) {
    // Sort the time stamps based on the starting time
    time_stamps.sort((a, b) => a[0] - b[0]);

    let overlapCount = 0;
    let prevEndTime = time_stamps[0][1];

    for (let i = 1; i < time_stamps.length; i++) {
        const startTime = time_stamps[i][0];
        const endTime = time_stamps[i][1];

        // Check for overlap with previous end time
        if (startTime < prevEndTime) {
            overlapCount++;
            // Update previous end time if necessary
            prevEndTime = Math.min(prevEndTime, endTime);
        } else {
            // No overlap, update previous end time
            prevEndTime = endTime;
        }
    }
    return overlapCount;
}

const time_stamps = [[900, 1230], [1000, 1200], [1400, 1800], [2000, 2100]];
const overlapCount = countOverlap(time_stamps);

//2. Typescript Create a TypeScript class representing a geometric shape. Include properties for the shape's name and a method to calculate its area. Implement subclasses for a circle and a rectangle, and demonstrate their usage.
class Shape {
    protected name: string;

    constructor(name: string) {
        this.name = name;
    }

    getName(): string {
        return this.name;
    }

    calculateArea(): number {
        throw new Error("Method 'calculateArea' must be implemented.");
    }
}

class Circle extends Shape {
    private radius: number;

    constructor(name: string, radius: number) {
        super(name);
        this.radius = radius;
    }

    calculateArea(): number {
        return Math.PI * this.radius ** 2;
    }
}

class Rectangle extends Shape {
    private width: number;
    private height: number;

    constructor(name: string, width: number, height: number) {
        super(name);
        this.width = width;
        this.height = height;
    }

    calculateArea(): number {
        return this.width * this.height;
    }
}

// Demonstration
const circle = new Circle("Circle", 5);
console.log(`Area of ${circle.getName()}: ${circle.calculateArea()}`);

const rectangle = new Rectangle("Rectangle", 4, 6);
console.log(`Area of ${rectangle.getName()}: ${rectangle.calculateArea()}`);
