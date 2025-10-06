export interface AuthorRegister {
  fullName: string;
  email: string;
  password: string;
  comfirmPassword: string;
}
export interface AuthorLogin{
    email: string;
    password: string;
}
export interface notification{
    message: string;
    type: "email" | "password" | "fullName" | "comfirmPassword" | "" | "categoryName" |"emoji";}
export interface PropsHome{
    home: boolean;
}
export interface category{
    id?:number,
    categoryName:string
    categoryImg: string
}
export interface Answer {
  answer: string;
  isCorrected?: boolean; // optional vì không phải answer nào cũng có
}

export interface Question {
  content: string;
  answers: Answer[];
}

export interface Test {
  id: number;
  testName: string;
  categoryId: number;
  image: string;
  playTime: number;
  playAmount: number;
  Total:number
  questions: Question[];
}