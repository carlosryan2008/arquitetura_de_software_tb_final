export class CourseNotFound extends Error {
    constructor() {
        super('Course not found.');
        this.name = 'CourseNotFound';
    }
}

