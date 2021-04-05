export interface State{
    isLogin:boolean;
    personalBlogs:Blog[];
    user:string;
    blogs:Blog[];
    vblogs:Blog[];
}
export interface Blog{
    title:string;
    content:any;
    author:string;
    time:Date;
    id:number;
    agree:number;
    disagree:number;
}