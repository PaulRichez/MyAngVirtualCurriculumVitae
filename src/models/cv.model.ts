interface IUser {
    firstName: string;
    lastname: string;
    birthDay: Date;
    city: string;
    postName: string;
    linkedin: string;
}

interface keyValue {
    key: string;
    value: number;
}

interface IDiplomas {
    startDate?: Date;
    endDate?: Date;
    dateAlone?: Date,
    title: string;
    description: string;
}

interface IExperience {
    startDate: Date;
    endDate: Date;
    job: string;
    descriptions: string[];
    business: string;
}

export interface myCv {
    user: IUser;
    languages: keyValue[];
    coding: keyValue[];
    knowledge: string[];
    diplomas: IDiplomas[];
    experiences: IExperience[];
}