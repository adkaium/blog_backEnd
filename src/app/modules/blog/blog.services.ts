// import { Tblog } from "./blog.interface"
import { Tblog } from "./blog.interface";
import { Blog } from "./blog.model"


const createBlogIntoDB = async (blogData: Partial<Tblog>): Promise<Tblog> => {
  const blog = new Blog(blogData);
  return await blog.save();
};


// // update a blog
// const updateBlogIntoDB = async(_id: string, doc:{})=>{

//  const { }=doc;
//  const result =await Blog.findByIdAndUpdate(_id, doc, {
//     new:true,
//     runValidators:true
//  })
// }


export const blogService={
    createBlogIntoDB,
   //  updateBlogIntoDB
}