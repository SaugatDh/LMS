import asyncHandler from "../../helpers/asyncHandler.js";
import ResponseConfig from "../../helpers/responseConfig.js";
import ErrorConfig from "../../helpers/errorConfig.js";
import prisma from "../../lib/dbConnection.js";

//Fetch all courses

const fetchAllCourses=asyncHandler(async (req,res,next)=>{
    const courses=await prisma.course.findMany({});
    if(courses.length===0) return next(new ErrorConfig(404,"No courses found !"));
    return res.status(200).json(new ResponseConfig(200,"All courses fetched successfully",courses));
});

// fetch all of the courses by teacher
const fetchCoursesByTeacher=asyncHandler(async (req,res,next)=>{
    const {id}=req.loggedInfo; // loggedInfo contains the id of the teacher
    const courses=await prisma.course.findMany({where:{teacherId:id}});
    if(courses.length===0) return res.status(404).json(new ResponseConfig(404,"No courses found for this teacher !",[]));
    return res.status(200).json(new ResponseConfig(200,"Courses fetched successfully",courses));
});

// fetch all courses in which the user is enrolled
const fetchEnrolledCourses=asyncHandler(async (req,res,next)=>{ 
    const {id}=req.loggedInfo; // loggedInfo contains the id of the user
    const enrolledCourses=await prisma.enrollment.findMany({
        where:{userId:id},
        include:{course:true} // include course details
    });
    if(enrolledCourses.length===0) return res.status(404).json(new ResponseConfig(404,"No enrolled courses found !",[]));
    return res.status(200).json(new ResponseConfig(200,"Enrolled courses fetched successfully",enrolledCourses));
});

//create courses
const createCourse=asyncHandler(async (req,res,next)=>{
    const courseData=req.body;
    console.log({courseData})
    if(Object.values(courseData).some(data=>(data===" " || data===undefined || data===null))){
            return next(new ErrorConfig(400,"All fields are required !"));
    }
    const registerCourse=await prisma.course.create({
        data:{
            ...courseData,
            teacherId:req.loggedInfo.id //  loggedInfo contains the id of the teacher
        }
    });
    if(registerCourse) return res.status(201).json(new ResponseConfig(201,"course created successfully",registerCourse));
    return next(new ErrorConfig(500,"Failed to create course !"));
});

// remove courses
const removeCourse=(async (req,res,next)=>{
    const {course_id}=req.params;
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
        data:courseData
    });
    if(updateCourse) return res.status(200).json(new ResponseConfig(200,"Course updated successfully",updateCourse));
    return next(new ErrorConfig(500,"Failed to update course !"));
});

export {fetchAllCourses,createCourse,removeCourse,updateCourse};