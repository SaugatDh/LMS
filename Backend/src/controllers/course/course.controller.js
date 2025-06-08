import asyncHandler from "../../helpers/asyncHandler.js";
import ResponseConfig from "../../helpers/responseConfig.js";
import ErrorConfig from "../../helpers/errorConfig.js";
import prisma from "../../lib/dbConnection.js";

//create courses
const createCourse=asyncHandler(async (req,res,next)=>{
    const courseData=req.body;
    if(courseData.values.some(data=>(data===" " || data===undefined || data===null))){
            return next(new ErrorConfig(400,"All fields are required !"));
    }
    const registerCourse=await prisma.course.create({
        data:{
            ...courseData
        }
    });
    if(registerCourse) return res.status(201).json(new ResponseConfig(201,"course created successfully",registerCourse));
    return next(new ErrorConfig(500,"Failed to create course !"));
});

// remove courses
const removeCourse=(async (req,res,next)=>{
    const {course_id}=req.param;
    const course=await prisma.course.findUnique({where:{id:course_id}});
    if (!course) return next(new ErrorConfig(404, "course not found"));
    const removeCourse=await prisma.course.delete({where:{id:course_id}});
    if(removeCourse) return res.status(200).json(new ResponseConfig(200,"course deleted successfully"));
     return next(new ErrorConfig(500,"failed to delete course !"));
});

const updateCourse=asyncHandler(async (req,res,next)=>{
    const {course_id}=req.params;
    const updateData=req.body;
    //find courses
    const course=await prisma.course.findUnique({where:{id:course_id}});
    if(!course) return next(new ErrorConfig(404,"Course not found !"));
    const updateCourse=await prisma.course.update({
        where:{id:course_id},
        data:{...courseData}
    });
    if(updateCourse) return res.status(200).json(new ResponseConfig(200,"Course updated successfully",updateCourse));
    return next(new ErrorConfig(500,"Failed to update course !"));
});

export {createCourse,removeCourse,updateCourse};