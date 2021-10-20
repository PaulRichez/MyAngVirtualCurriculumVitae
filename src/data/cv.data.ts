import { myCv } from "src/models/cv.model";

export const myCvData: myCv = {
    user: {
        lastname: "Richez",
        firstName: "Paul",
        city: "Lille",
        birthDay: new Date(08 - 09 - 1992),
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
            startDate: new Date("01-01-2012"),
            endDate: new Date("01-01-2013"),
            title: "Licence Professionnelle Informatique de Gestion",
            description: "Université de Valenciennes"
        },
        {
            startDate: new Date("01-01-2010"),
            endDate: new Date("01-01-2012"),
            title: "BTS Informatique de Gestion Option Développeur d'Applications",
            description: "Lycée Henri Wallon, Valenciennes"
        },
        {
            dateAlone: new Date("01-01-2010"),
            title: "Baccalauréat STI Option Génie Electrotechnique",
            description: "Lycée Paul Duez, Cambrai"
        }
    ],
    experiences: [
        {
            startDate: new Date("07-07-2020"),
            endDate: new Date("05-01-2021"),
            job: "Développeur",
            business: "E-Mothep Consultants",
            descriptions: []
        },
        {
            startDate: new Date("10-01-2019"),
            endDate: new Date("07-07-2020"),
            job: "Ingénieur d'études web ou multimédia",
            business: "JetDev",
            descriptions: []
        },
        {
            startDate: new Date("11-01-2017"),
            endDate: new Date("09-01-2019"),
            job: "Développeur",
            business: "Elosi",
            descriptions: []
        },
        {
            startDate: new Date("07-07-2014"),
            endDate: new Date("10-01-2016"),
            job: "Concepteur - Développeur",
            business: "CIM",
            descriptions: []
        },

    ]
}