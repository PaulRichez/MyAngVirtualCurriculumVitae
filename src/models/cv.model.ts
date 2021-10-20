import * as dayjs from 'dayjs'

interface IUser {
    firstName: string;
    lastname: string;
    birthDay: dayjs.Dayjs;
    city: string;
    phoneNumber: string;
    email: string;
    postName: string;
    linkedin: string;
}

interface keyValue {
    key: string;
    value: number;
}

interface IDiplomas {
    startDate: dayjs.Dayjs;
    endDate?: dayjs.Dayjs;
    title: string;
    description: string;
}

interface IExperience {
    startDate: dayjs.Dayjs;
    endDate: dayjs.Dayjs;
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