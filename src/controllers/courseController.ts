import { Request, Response } from "express";
import Course from "../models/courseModel";

export const listCourses = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { category } = req.query;

  try {
    const courses =
      category && category !== "all"
        ? await Course.scan("category").eq(category).exec()
        : await Course.scan().exec();

    res.json({ message: "Cursos recuperados com sucesso", data: courses });
  } catch (err) {
    res.status(500).json({ message: "Erro ao recuperar cursos", error: err });
  }
};

export const getCourse = async (req: Request, res: Response): Promise<void> => {
  const { courseId } = req.params;

  try {
    const course = await Course.get(courseId);

    if (!course) {
      res.status(404).json({ message: "Course not found" });
      return;
    }

    res.json({ message: "Curso recuperado com sucesso", data: course });
  } catch (err) {
    res.status(500).json({ message: "Erro ao recuperar curso", error: err });
  }
};
