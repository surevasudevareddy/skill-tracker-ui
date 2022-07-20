export class UserProfile {
    id!:number
    name!: string;
    associateId!:string;
    email!:string;
    mobile!:number;
    createTs!:Date;
    updateTs!:Date;
    skill: Skill[] =[]
}
export class Skill{
    constructor (skillName: string,level: number,type: string){
       
       this.skillName = skillName;
       this.expertiseLevel = level;
       this.skillType = type;
    }
    id!:number;
    skillName!:string;
    skillType!:string;
    expertiseLevel!:number;
    userId!:number;
}