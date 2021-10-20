import { myCv } from "src/models/cv.model";
import * as dayjs from 'dayjs'
export const myCvData: myCv = {
    user: {
        lastname: "Richez",
        firstName: "Paul",
        city: "Lille",
        birthDay: dayjs("1992-09-08"),
        phoneNumber: "07 77 30 19 65",
        email: "paul.richez59@gmail.com",
        postName: "Développeur Front End",
        linkedin: "https://www.linkedin.com/in/paul-richez-824041107/",
    },
    coding: [
        {
            key: "HTML",
            value: 80
        },
        {
            key: "CSS",
            value: 75
        },
        {
            key: "Javascript",
            value: 75
        },
        {
            key: "Docker",
            value: 60
        },
        {
            key: "Java",
            value: 50
        }
    ],
    knowledge: ["Boostrap", "Material", "PrimeNg", "Purecss", "Git", "jenkins", "Méthodologie Agile", "..."],
    languages: [
        {
            key: "Français",
            value: 100,
        },
        {
            key: "Anglais",
            value: 40
        }
    ],
    diplomas: [
        {
            startDate: dayjs("2012-01-01"),
            endDate: dayjs("2013-01-01"),
            title: "Licence Professionnelle Informatique de Gestion",
            description: "Université de Valenciennes"
        },
        {
            startDate: dayjs("2010-01-01"),
            endDate: dayjs("2012-01-01"),
            title: "BTS Informatique de Gestion Option Développeur d'Applications",
            description: "Lycée Henri Wallon, Valenciennes"
        },
        {
            startDate: dayjs("2010-01-01"),
            title: "Baccalauréat STI Option Génie Electrotechnique",
            description: "Lycée Paul Duez, Cambrai"
        }
    ],
    experiences: [
        {
            startDate: dayjs("2020-07-07"),
            endDate: dayjs("2021-05-01"),
            job: "Développeur",
            business: "E-Mothep Consultants",
            descriptions: []
        },
        {
            startDate: dayjs("2019-10-01"),
            endDate: dayjs("2020-07-01"),
            job: "Ingénieur d'études web ou multimédia",
            business: "JetDev",
            descriptions: []
        },
        {
            startDate: dayjs("2017-11-01"),
            endDate: dayjs("2019-09-01"),
            job: "Développeur",
            business: "Elosi",
            descriptions: []
        },
        {
            startDate: dayjs("2014-07-01"),
            endDate: dayjs("2016-10-01"),
            job: "Concepteur - Développeur",
            business: "CIM",
            descriptions: []
        },

    ]
}