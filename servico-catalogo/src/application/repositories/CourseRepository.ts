import { prismaClient } from '../libs/prismaClient';

export interface CreateCourseData {
    name: string;
    description: string;
    value: number;
    teacherId: string;
    category: string;
    level: string;
    duration: number;
    modules: Array<{
        title: string;
        description?: string;
        order: number;
        content: string;
    }>;
}

export interface UpdateCourseData {
    name?: string;
    description?: string;
    value?: number;
    category?: string;
    level?: string;
    duration?: number;
    modules?: Array<{
        title: string;
        description?: string;
        order: number;
        content: string;
    }>;
}

export interface ListCoursesFilters {
    page?: number;
    limit?: number;
    category?: string;
    level?: string;
    teacherId?: string;
}

export class CourseRepository {
    async create(data: CreateCourseData) {
        return await prismaClient.course.create({
            data: {
                name: data.name,
                description: data.description,
                value: data.value,
                teacherId: data.teacherId,
                category: data.category,
                level: data.level,
                duration: data.duration,
                modules: {
                    create: data.modules.map((module) => ({
                        title: module.title,
                        description: module.description,
                        order: module.order,
                        content: module.content,
                    })),
                },
            },
            include: {
                modules: {
                    orderBy: {
                        order: 'asc',
                    },
                },
            },
        });
    }

    async findById(id: string) {
        return await prismaClient.course.findUnique({
            where: { id },
            include: {
                modules: {
                    orderBy: {
                        order: 'asc',
                    },
                },
            },
        });
    }

    async list(filters: ListCoursesFilters) {
        const skip = filters.page && filters.limit
            ? (filters.page - 1) * filters.limit
            : undefined;
        const take = filters.limit;

        const where: any = {};
        if (filters.category) where.category = filters.category;
        if (filters.level) where.level = filters.level;
        if (filters.teacherId) where.teacherId = filters.teacherId;

        const [courses, total] = await Promise.all([
            prismaClient.course.findMany({
                where,
                skip,
                take,
                orderBy: {
                    createdAt: 'desc',
                },
            }),
            prismaClient.course.count({ where }),
        ]);

        return { courses, total };
    }

    async update(id: string, data: UpdateCourseData) {
        const updateData: any = {};
        if (data.name !== undefined) updateData.name = data.name;
        if (data.description !== undefined) updateData.description = data.description;
        if (data.value !== undefined) updateData.value = data.value;
        if (data.category !== undefined) updateData.category = data.category;
        if (data.level !== undefined) updateData.level = data.level;
        if (data.duration !== undefined) updateData.duration = data.duration;

        if (data.modules !== undefined) {
            await prismaClient.module.deleteMany({
                where: { courseId: id },
            });

            if (data.modules.length > 0) {
                await prismaClient.module.createMany({
                    data: data.modules.map((module) => ({
                        courseId: id,
                        title: module.title,
                        description: module.description,
                        order: module.order,
                        content: module.content,
                    })),
                });
            }
        }

        return await prismaClient.course.update({
            where: { id },
            data: updateData,
            include: {
                modules: {
                    orderBy: {
                        order: 'asc',
                    },
                },
            },
        });
    }

    async delete(id: string) {
        return await prismaClient.course.delete({
            where: { id },
        });
    }
}

