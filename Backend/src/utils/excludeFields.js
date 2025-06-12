// This utility file is used to exclude specific fields from an object specially for Prisma models.
const excludeFields=(allFields,excludeFields)=>{
    let filterFields={};
    allFields.forEach(ele=>{
        if(!excludeFields.includes(ele)){
            filterFields[ele]=true;
        }

    })
    return filterFields;
}
export default excludeFields;