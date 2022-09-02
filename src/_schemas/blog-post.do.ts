import { Types } from 'mongoose';


export class BlogPostDo {
    _id: Types.ObjectId;
    blogPostId: string;
    title: string;
    description: string;
    userId:string;
    likes:string;
    blogPostStyles:string;

    constructor(props: Partial<BlogPostDo>) {
    this._id=props._id;
    this.blogPostId=props.blogPostId || null;
    this.description=props.description || null;
    this.likes=props.likes || null;
    this.title=props.title || null;
    this.userId=props.userId || null;
    this.blogPostStyles=props.blogPostStyles || null;

    }
}