export class PaginatedObjectModel<T> {
    constructor(
        public totalResults: number,
        public totalPages: number,
        public data: T[]
    ) {}
}