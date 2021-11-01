import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { myCvData } from '../data/data';
import theme from './getTheme';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const age = new Date(new Date() - new Date(myCvData.user.birthDay)).getFullYear() -
    1970;

var column1 = [
    {
        image: 'profil',
        fit: [100, 100],
        alignment: 'center',
    },
    { text: `${myCvData.user.postName}`, alignment: 'center', margin: [0, 5, 0, 5], },
    { text: `${myCvData.user.firstName} ${myCvData.user.lastName}`, alignment: 'center', margin: [0, 5, 0, 5], },
    { text: `${age} Ans - ${myCvData.user.city}`, alignment: 'center' },
    getCoding(),
    getLangues(),
    getContact(),
];
var column2 = [
    getDiplomas(),
    getExperiences(),
];

function getCoding() {
    const _width = 150;
    const stack = [];
    stack.push({ text: 'Mes Compétences', style: 'title' });
    myCvData.coding.forEach(c => {
        stack.push(c.key);
        const widths = [c.value / 100 * _width, (100 - c.value) / 100 * _width];
        stack.push(
            {
                margin: [0, 0, 0, 10],
                table: {
                    widths,
                    heights: 6,
                    body: [
                        [
                            '', ''
                        ],
                    ],
                },
                layout: {
                    fillColor: function (rowIndex, node, columnIndex) {
                        return (columnIndex === 0) ? theme.green : null;
                    },
                    hLineColor: theme.green,
                    vLineColor: theme.green,
                },
            }
        );
    });
    return { stack };
}

function getContact() {
    const stack = [];
    stack.push({ text: 'Contact', style: 'title' });
    stack.push({ text: `${myCvData.user.email}` });
    stack.push({ text: `${myCvData.user.phoneNumber}` });
    stack.push({ text: `${myCvData.user.linkedin}`, style: 'link' });
    stack.push({ text: `${myCvData.user.github}`, style: 'link' });
    stack.push({ text: `${myCvData.user.website}`, style: 'link' });
    return { stack };
}

function getLangues() {
    const stack = [];
    stack.push({ text: 'Langues', style: 'title' });
    stack.push({ ul: myCvData.languages.map(l => l.key) })
    return { stack };
}

function getDiplomas() {
    const stack = [{ text: 'Mes diplômes', style: 'title' },];

    myCvData.diplomas.forEach(d => {
        stack.push({
            table: {
                widths: [100, '*'],
                body: [
                    [
                        { text: getFormatedDateForDiplomas(d) },
                        [{ text: d.title }, { text: d.description }]
                    ],
                ]
            },
            margin: [0, 15, 0, 0],
            layout: {
                defaultBorder: false,
            },
        });
    });
    return { stack };
}

function getExperiences() {
    const stack = [{ text: 'Mes Experiences', style: 'title' },];
    myCvData.experiences.forEach(d => {
        stack.push({
            table: {
                widths: [100, '*'],
                body: [
                    [
                        { text: getFormatedDateForDiplomas(d) },
                        [
                            { text: `${d.job} - ${d.business}` },
                            { ul: d.descriptions.map(l => l), style: 'desc' }
                        ]
                    ],
                ]
            },
            margin: [0, 15, 0, 0],
            layout: {
                defaultBorder: false,
            },
        });
    });
    return { stack };
}

function getFormatedDateForDiplomas(item) {
    if (item.startDate && item.endDate) {
        return (
            "De " +
            new Date(item.startDate).getFullYear() +
            " à " +
            new Date(item.endDate).getFullYear()
        );
    } else {
        return new Date(item.startDate).getFullYear().toString();
    }
}

/*function getKnowledge() {
    const stack = myCvData.knowledge.map(k => {
        return { image: k }
    });
    return { stack };
}*/

var docDefinition = {
    pageSize: 'A4',
    pageOrientation: 'portrait',
    pageMargins: [0, 0, 0, 0],
    defaultStyle: {
        fontSize: 13,
        lineHeight: 1.2
    },
    images: {
        profil: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gIoSUNDX1BST0ZJTEUAAQEAAAIYAAAAAAIQAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAAHRyWFlaAAABZAAAABRnWFlaAAABeAAAABRiWFlaAAABjAAAABRyVFJDAAABoAAAAChnVFJDAAABoAAAAChiVFJDAAABoAAAACh3dHB0AAAByAAAABRjcHJ0AAAB3AAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAFgAAAAcAHMAUgBHAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z3BhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABYWVogAAAAAAAA9tYAAQAAAADTLW1sdWMAAAAAAAAAAQAAAAxlblVTAAAAIAAAABwARwBvAG8AZwBsAGUAIABJAG4AYwAuACAAMgAwADEANv/bAEMAAwICAgICAwICAgMDAwMEBgQEBAQECAYGBQYJCAoKCQgJCQoMDwwKCw4LCQkNEQ0ODxAQERAKDBITEhATDxAQEP/bAEMBAwMDBAMECAQECBALCQsQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEP/AABEIAPcAyAMBIgACEQEDEQH/xAAcAAAABwEBAAAAAAAAAAAAAAAAAgMEBQYHCAH/xAA+EAABAwMDAQYEAwUHBAMAAAABAgMEAAURBhIhMQcTIkFRYRQycYEjkaEIFUJSsRYzQ2JywfAk0eHxgsLS/8QAGwEAAgMBAQEAAAAAAAAAAAAAAAIBAwQFBgf/xAArEQACAgEEAgIBBAEFAAAAAAAAAQIDEQQSITEFQRMiYRQyUXEjQoGRobH/2gAMAwEAAhEDEQA/AO320pwaldOpzcUVHNIT4k1M6YRmfu64Fcw0F1bPBFLtgYNII4G7NLNmrYFDDpGaG1PpXieOK9wfWr0QECQc7k0ktoE+GnQGRRSio2gNRGyKKY+EqzT4JGKKpKaiUOCcsii11oimlCny0BOdtN3DjNU5HTyMlJ258VN1bTnxUu8rOaaKON3hzml3MfAVRRg02UtIyfKlV7QKbHzpQwFVIxu8NImQo/KK8cPWkvM8UBgMpYIpAL3bhRjwk0gsYzQGBJ3qqkFClicppFQzQCEsc5rwhOKPjrRMfMmoySJnqqhQAwSKFRuIwSDK/m3dan9LBPxKlJ8qhG0bgantMo2LWqmD0WkLx4aVbX6GmYXmlW10646EwPgc+I0am7bnXnilN43fLV0JiYFUnFAnyogVkfNQG76inyQKJ3UQ8Zo27ik1nwlVEugG6zmmrvO7FLqOM02Wr5qzSLEMnDTdQJyqnLhApBSsA0g+Rqvdk7qQPnThZ4/1U3XQSNVjG5NJpJG6lTwDRCBigBJXPNIFJVn0p2E4T70ipQGU0EZGykYFIrGRTpW07qSPnQKNilWD4q8AzSxxikz50AIqGOaFer6UKjJGSTbOAU1P2NOxkn3qvIPU1YbMrEcVJZEmG18mlEudaaIXg0q04ACnzoEHzS+tLJUk0xQvG7xUqHc06ZGB2FUO8x0pslz5ua8S7lXzVOSNo8Q5RHFqP0pIO0m67gE7sVOQwFddS2Cs8VEP3uCUrU3LbXs6gHkUw1PqqHaYD7xXvKEElI68VyHqftZ1lrrVEmN2V2eWtDai26+tva0fIK3dB61mtvVfZpo08rniJ0vrHtItdktypiJjWEHBJPT7Unp/tLsl/tTV0jTGik+BwBWdrnmK5WuPZB2qXiK8/ftZtoW+Q4phpC1gL++BSVh7Lu03SZed0/quO53gyUPslIz6g5NUfqXnrg2rxz298nZsC5MzmVPIWCn1FKlaFbk5FceWTth7S+ziW1E7QIc0xHXwA+0Atkj0BA4PTrzXT2kNW2vVVrauVvkBbbg9efvV9dqs6MVtEqn9iecI5SKST83ir0nBpMq8VWFYsT15pmR4j4qcpVkGklAHNAq4ECSMpohPWjk0Q9KBhMnO6k/X0o5PWiHpQIJr6mhQX1NCgCR6YqwWzamOn6VXWjyan4isND6UDj/d716ldNgv+KjhefagB0h0k9aWQvjrTLeNteh2gMEgleUnxV53mD81NWneSKMVYOaBByHsBXipldJncxXV+QBJoxcxWf641iz8U7piA4C8hsKmrH+Gg9Gx7nr7D60s5qCyy2qp2T2ozV1m8doF+mTLrKdi6cQ6W2WEKwqbjIJP8iAfMcny9au1ssNtt0ZECBEjxI7YwhtpISkVW0y3lOBLScbOAB0Ap0H7qhtbq3dyR5Vji1Nts7tdXwxwiQu6GmUlIUD5VVpMhsKX4+R5CiXG5TFLIceJ9qq0uTLO9bSFkDiq7GvSNFUG+ybmy4Ulh2FcYjUmO6NjjTqdwUPQiqI7qKf2LzGrvZSX9NS5KG3e8JUqESfkPqg+R+x93apktJKlgg58/OnSFQ7xDkWq5R0PxJbZaebV0UD/AM61FU2LqNOpLDOgNK6mtmrbJHvdplIkRpCAtC0nI+lSRPWuZ+wvVs/s812exm6yBItM1C5FlklI3+vduEdTwRn2HrXTCCkg10K57lk89bW6pNMMg4SaIVigTgUmRwqnKwh5JopOaNRCfmoEEyfKiKOBRyfKkHlcUAJrdSBQpus9fOhUcgTLKsq21PtcIT9Kr0UZdCj61YUKBTxxUjigXtpRDgAVSCVpBV4q9BSc0BkXCuvORQ7xPRNIHbXuf+GgMjlhxO40qHOtMm1YJVmjBzOd1AgspaSPauZbFc5MpF1v854qeulxkyFqP8gcKUD7BNdIrWMHxVwz2l6mm2bSsKy254svPglxafQrJOPzrHq+kdTxcd9jNQX2g6XtiyqfqGHGVno44B/WkldsumHkuMwL5ElJzyppwKFcQanttmvbCmbhfHA4g78h/GDVZtdxGm3gzGuReTv+cL5NYla4rg9JXTCb+x3ZO1rGdCpffp2FXTPlSCNeW5TSmviG0pUfmJArNNP6F1HcuzqPqd4r7qYN7Z38hGOuKwzWJnIlPWVd1WAhWQUuEUm6b5LFVXykdb/2jt0xe1qZGUPTvBzT+EUKUC0QUnoQa4s0po+eH0z16wkKXnKAl3p+tb/2bTb9Z5TLFwnrmQ3OASeavqw5YMtqaXJYe1ST/ZvVGjtWMubTb7o0XFD+QrGf0rsZp3KNyTkHofauMO3gPzLHZGYCdz8u5sR2gR1K1ACuyI47lpLPmgBP5cV0K8ZZ5zW/uQ73Z8VJlXWk+9VRC7watMOBQnNJk0TvCaKV4oDAY9KbvGjF1VIuLyKM8ECJ86FFX0oUoE3B5eqcSU4PpUFB2h7xVLocwPmpgFEr5VRweN27H1puF4z70CskfMTQOOSrjrXqVY3U0CyfDSvecZoAWSsY3CvN+f4qbpXgEda8KqBA8mQhppS1rASBkkniuR9f9js/XcBhlmSYKUN9266gblJHngV0R2rw7rcuzjUkOxyXGLgYDjkVxs4UlxHiGPyrLWdVPRVhhs7scEnzrFqeWos7Xi63tc4vno427Qv2FNUXENqt2qAtttzcFOKKVnPlgjFN+zr9jLUtqu6WdSSXWYLSdrrjqgSsZ6oT13eWeAPeu4Be48hvvpJbBQMg4qj3PWsBdwnrVIQIlva72S8T09B9TWeyx7FXng69FOZubXJbTFi2/RMSzw4yG48ZvumkDoEBIAH5CuMe27sUuU2cLpZHXiwXS44lHXBPQ+ePpW6o/aLtV7abssaB3bTBIJ2YUsE9SfOnNxvVsEeA8vCmppIZcPn6g+9EMYyn0alBx+sl2cWaQ7Bu0GJqASlallKgELA2OqynPTPJ6H25xXS2g9Fai0/bm0Xa9/vEF3c2vu+7OPdOTj7VZp9jajq+OtwGDyUpHWpXTLrD7gRLyjFOrpWTxIz/AKZVRbj0L6ihvS792bxEtd4hzU0YOhXkAN3/ANa6q39a5f11J/dFpjaljJK3tPvfvRkJxklttRwM9K6L0zdXb3p62Xl+OWHJ8JiUto/4ZW2FEfrWup8uPs4OvokkrvT4JTP+b9K8zii7jRSrNXnNDb00Qr614TikyetKACpPNEUrivD0ohOKCMBCc0KKTihUEk5DOFqPpUilzioyHyTTsrzxTgOUOJJNDvPFt3U2C8CgFcFVBGB3vH81DeCPmpoF5owWQdtAYF9/tXhV70ju9qBVQKeSlZjPJ6/hL4P0NclXG7Ox5b/PnxXWD4U40tlC9pWCgK9CeM1yFqhhcCRNjyP7yO4ts49QSDj8qyalcI7fhp4lJf0IyL/OdjrjRlqUtfA+tYp+0PprtDs2lI9vgvSI6L4+vL7WchYxkHHTjofrWr2K7WuC78fMdRtQeAo1L3zW2j9R2hce8y4fwDS8lbywAkjzB9a5kJc59nqW/SXDOT9MaW1KzbBYpl8nCQ+x3SZrbm19O7zB+bIqd0FO1xZ9OL0VqK4yLhJg3APRn3MnwDOTvV1yDj/1V0lXnQaLuHLJqGO/DzsCleFST7g+XvU4/b428SWVNrbcAWFJOQad2TlFpjRgqmnJesFmtGolvRktrPkBU5CPII/SqGzGcjz2XUcNEDNXK3P+IqSdwz5Vdpunkov64LLJtszVXc6Tipyq4n4Zz2bWCFH7DJrpKIy1FjNxWE4bYbQ02PRAGB+grD+yhyQnVzS0RFuJLTgU5s4a46k+XpW3IVwa21JJtnlfI2ttVelz/wAiyFAZrwkYpPdgUXd7Vfk5off5V54f5qTKutFqCMByE+KklHFehWM0mpVAoTPNCik5oUbQJuErwqp1nNM4Rw0acBf8tNEcUr3CcUluFehfrQIHBxRguk93tXm/3oHFd2AqvN/v+tE3Z6UXdzQLgMVddvFcs9vEU2fV1ySQUtzAJTZH+cc/rmuo8msF/ari2xFmtF1LiP3iX1xWmAcLkNlBUQn1KcZ+5qu2G6Ju8fb8dyX8nHmp58xwuREOLSCTzVPd0/p9Vuc/fsy83KQVZQ2ZIQy39EjHP1q43VCLlukwlqKc4UlYwps/yKHkagnbO67u3kp+tcSUvjfB7zT4eMlIj220tSFxEfGiOTy2ZBrQrDbLnHhBGnNRvsMA5+ElguoP+kk5R/SmsTRMB1RWZpC/Y0Zp5dnf+DiOuSnDwltpsqUfsKn5nI1WRTWMGoWG5zZENMeZjvkdTmrdZ3vxEx0rBzjgVQNK2HVt1bC1d1bkLGMr/Ed/LoPzNaJp/TMKwNTJl4uju+E0ZKnXF8FAQSfYDirqW3wjj37YJ8nQ/ZLavgLA5OWjC5ruRn+RHA/XNXYK96qPZbqu1aw0DY9Q2dITGlxEEIBztI4I/OrUlWa6kE1wzxN03ZY5MV3e1eE+ZogNebvamKw+U0Umi7h7V4VUAAnmiE4r0nzNEJqUhDwnyoURRxQqAJyMfwxSm72pBk4SKPvpoji2TXiTgmk0OUZKqCOg9GHIpLf70dKutTHkkOOAqvKMBvHhppMuDEJtRdWCQOmen1q5UTm8RK96XI4JVk1zb+1LpOdrG7WxNimITe7AtiZEjuObUvtlwFxAPQLwkgZ65xWyt6sFwdeSlS0IQglKUfxCuee2e8SUXOPqSMy+ypsrZwtf96AeR+tbqfHZi1MSOpcJqUChdsHZqqy2petdMRCVNNj4yOP8RA88eorBnNafHtJeho8Kh1xwfb6+Vd8P2lMnS7iFRu+ccj47vGd5I6Vk/Yx+zXaOzG6XLWeqC1PuMuYuVa4BG5m2IPQnPC3ffonyyea8g6czZ9Bo1ajWm+yidmX7NeudZRW79r+4OaYs7oCm4jaAZ8hHkcHhlB/zZX7DrWoyeyHRmk4RY03GcaGPEp9zepz3KjyTV+l326zpCmmm1BPmcdTTC56U1jd8mGzD2Y+d2TjH/wAcZNEK45wkRZqbZ8ykZo/Ituk2g/PnNthw7GmyfE6fRI6n7Vk/aE3rztgCtN2pz9wafddbE2Y+r8V9pCsltLSTnBx/ERnz4rWtY9nEu0R7hqKaoP3FhkI7xRztRkcN+g88CqXZpz0iV8NDQN0twFG3kJR6n616jxfjaLofK3/seV8p5G6uTqS79nUvYXZYGnezm22q3LUtloueI+ZzyfuefvWgDnpXJSe0C92G9i1aaccWLU6iLLQl3AyUhQJSeCDkjPqK2nS3av8AEqMO8MoRJQkFaUngj1SfP/xT6jQSjJuvo48L8r7GngZoUztV5t12a7yE+F+qTwRTwHPiByPUVz5VShwXKaYDxRDmlaKdpSqiMCciJPWiE4oyvmNEJzSBk8oUQ8HFCjaQTAXgUbvKb7uKG4UDjhDnWjb8CmwV71D3K+oSp2GyvBABK/I/SrtPRO6W2Ik5qCyyUm3dMVhxcZn4haB8oOM1DwNVu3KM48oOMKRwUdCKil3NlTTv43LZxjPnmkwhLa5Yb4DmDj7V36tFVWussxu2THDNxu6lF5d6IQskBK+QPvS71rkT2nC/LcdSR0SR3Z98Dr96jGUvJti1R8FeckLTRLNqBqYswZa/hpPQlHBV9K1bMLKKsjB+JNtMnvVKWfxPmVxkVSNXyGb7dFWrVqGlQBLaEUBG1KSeNilDzUenvgVp97ta3Ye6O4QG8Lyo5z61lcP4+5dqMqKtCDAhRm5Sscgr/hBH1OftS3WxqqlN+kWUVuyxQXtmlsuohxkxkJG5AA+lM3VIVuUtIV7U3eedKjTCfMLKDzivAb1uye4hCW0Vk3GNGVu2gfSmqu0JEBIQnnPHNVS63MqUsBeSr0NRTTYP/USie7Rzg1BdCCSzIuV9jvaytaoC2j8JIBEhSHClQRnPBrmHROtYkbtDc7ObbEflXaI+41JdUnDcNpskKLivNfGAB5nyArpjTWrLO82q1JRsUvoc1imiLNE/e2ru0d2zuRrtcJsht5lf94wjvCMY8iQBXovC2y+0V0ec8vUliTI6KhbmqZF+Q0pbsh1wnKOqM8An6Yq4RRJuERxC1FPdHDamM94kemfrzUfBS8zCeuD6FqbI7xCVHpzyMUxfv6gpbTK1kgYG0dK7uxy5OAvqW8agmW6Ah5CH3XG/AS65yD6nHrTjs4nX9eo0phXyXGakq3Odw4ogHzB8vzBqgxW5cxZXJWvaOg9frWo9jLWyTLMxCUFfgZWBgUkoKXAyZu8C9qbQETlrcT0L4QOP9QH9RUwh1C0b0LCknoQciqzDZYiIWVuALHjx1/Sk1XwIy4hO1Q4GDjcax3aNWc18FsbMdllKsk0TcKj4ly7zY09/erHUDinm7iuNbROp4kaoNT6B1V4qFeZFCqsgPt/tQC/WkN2BRHpLcdl19xWENjcTTQ54RKfGRlqO6vQ4bkeCQZS0bwnPOB/zFVeTPaubCZLK9hcbzzwcHg8exxSsqWifLclre3JJ8PGC36VXrq9LtUlT8dBeZd8aSkZGf40H0J6j34r1Gj06qrx7MFljmzxuTKkraY2DMiUAcZ6Dr9eatgkArdX6naMeeOKg7BFjK7ue3sKQFuIyfNZJzXkq5Opf+GjLxjqcf71r7K1wS0N1QfeQ7nugM8nAH0xUTqC1AK/ecQul9sZAz5V4u5LiOJOzeSMZScCpWIkKby+kF50fKDkJH/ehcB2hGyXuPcoOVytpCdhGec/SmNrtUWJNuF2Qj8Wb3bZWfNDYIH6k1XNTW1em7iq+R3ltMEHvEDknHJwkdeOastuvlnudvTMs9yjT43yh6M6HGyfMZHn7V57zupUYfDB99nZ8Pp3KbtmuuiPua5qZKVsrCWx1BqGucwlKy76VK3WalKF4H2NU+5ze8BQec9K8mnlnq88DFKu/dK1JxTS6zEHEZK+ByrFCfdW4bHdtYU6rpjyqvNyytS1rPU5q6CEbJu3vCI4l6OnKsiq3qG+ybdq65yoBWgr2d7t6OHYM5FSBv8O2oMiSttAbIAKzgFZ4Az7moKFGZeeckzHkB19ZcWoq6knrXofDww3Y+ujg+Ys3RUF2PWdRfHW9Y24Vu2FJH609VpmSwwzJTHcaD4BQFN8K+lPbHZ7O28hEtxDWSCVrFas+qAURkM7Xm2mhsUMY+1d3Lk/wedxtKdpfs8kz2kSLqnuwedoGD1q1nTyoyCxa0ISGxgbeMVNMuMxUqWyxvWACBnrSzc+PcAtLTqGnh1aKeftTL69E9jRjUq2LbIE6MtMqM3yfNQ9R60hCkuvy4SFpCso70kjn1oklS1urafZBQsFA3Cm9mntOsi5L4DkdBbAIIGc+lMljoCyx7o87Kcio24+daj5CpOFqCMpDf425Dh2pz1NUC53d6BaJJipT8bNPw0YE9XDkAn2Ayo+yTSliQ8t5peSY0BtDLOf4iPP/AJ61RdTCxYkgjNwfBqiXApIKeQaFQdsuaSAytWQehFCuBborYyxDo1xtUlksYc48VUrtK1zG0qzGgyIUyQq4JX3ZjMl3aUEfMBzirdvwKz6/XC/f2klhVqhz4LeENbHSl9IwM+x5zV3jq/ktWfRF08RISNqOyzHg/aprkJ1Y8USW0toKX7b/APvT03lDyXG0d5HfA/EacRwr6eRHuKnWnobrIBZXjoUPpBxUbcocPullpHdD+VK/D+VelRiQ2sl0SYZhpdQ2EZOOhxSMaQgy35C9+xsZGehqvxZ6IsmWz3JIBBA3ckH39KMdSWxhv4eRDlqdkKCUbVjrmpS7IRb7ZPiTlKdQAtbRwNw4B9amPiUxocie8lwNsNrfcUeSQgEnH2FVXT1mVcHVxocl1hDAy675Jzzz7+1WO/3GHDgfAsqLrSG9rnq4MYOT9M1TOf1xHsetHHn7Q37QtzmymbPpF4uXee1/0KGzkRGF9HT/AJz5e/sKznTZ1nZdPw7a/wBoVwtbkRkxW2rc6WkoQdxV3nOFrJUSVY6+fFRcrs6n9nnaxqaHdXX5KUMok22WtRdVIjOLIbdBPmANpGeCDS6FS7xI4ZU/IXl0jHzYOAOPsPqa8lKlxskpvMn2zuW6z5FGMFiK6RLW/ta7VuzC1RrVDu8W+Wp2WlYm3cvLdjtFwBYUrKiW/QjOz710rIvUaRAakxZLb3eNhaXUfKQfSuc7VoXTFzTCLz14Dl0hOSlNmX+A0CPEAjHQ8ce1Pf2cdQw39Hy9Nx5Lq1Wue7uDi8jDmFAp/wAvJ++aq1Wj2xUo9mnQaybfxzfHo1lyWtxZWeT5kmmNyu9utkOTcblPYixI6C4886ralsDzzVd7Qu0vTmhIoZec+Luj6CpiI2fER/Oo/wACPc/bNcza+1lqnWrhN4lFMYHezDZyllv3I/jPuf0ptH4+dqzLhF+q8hGnMVyzR7h2hSe0/UTC4PfsWC3u4itr4Ly/N5wep6AeQ9ya0i2tyY6UhT2QBjGT09qyTspgIhxYqHuGXOFcdD5GtphNoYZ2PIzjjIPWvS0VwpioxR5u2yVrcpGnWGO3c0R5jiSpLbaMg+Zx/wCKv0JHxwYXHGEnKSEeVZ9oJ74y3PIaaUFNq9cDnpVk09d5lslrQpPd5+UdQSPatsFmJn/s0EwwhpKXHSFAYz0Kh6VGTWWHjvjuBh1HRzOFCl4V+bnr2PO+MeeKJcpPwLC5anEIBGSMdT7VEc+yRgLjJCe6uWC6g+B9Pyuj3HkagtPSe+VMgjCEw5TjRCARnxFSePXBHSnrr7spsPOu/iYyct5yj6VRHNQy7fcr9boYJlyXI6YjYO7c44Cnj6EA06QpZDdP3xe1LRvUhhZjRkN/X8Vz8wE59Av1q0ImsW5KY7i97vQMN+JR+tQ8Bi1aUhsx5Ly5UspDTcWKMuKwPM/qfIZpnLmX67d5GgQFthfC2YKto+jkj/8AJH1qtck4Lxb7qzuUuU82whr507suJPpjy+9Cs6iR5UZIiXK5R4rLZyIVv/GUOecnpk+ZJJoVVJckHQT0pLDDjx6IGapTkbvHFvOJcJJyTg4yaldRTgUpgpQTnCiQfyqDIZBPzg7epUTWHxdPxw3v2X3Pc8Cpc7lOVIcx7Iyah7tNKIzjzTgU2OCCCFCnEx9tPhV0HQ5NU3UEl4t97EvEhhYPCVHe2fqDXZgtzM7GsWXIfdlp3uJaQ5uceRjckY44NS2mdKKvd1Q8Jk91pj8RTjpSUo9AMDk1XezW26gv8i+tqVEacbdaHeIyW3EYO448vKtRMiDpy3i22pG1CBztPKj5k0s202kRDlD2TMh2yGq221vYhvO/nlR8yfeqTfb3ICSe8CR0KUjOaJcry4EOP5z5nmqDN1QlqeVcrCzxg+VVpKJYmRms7NA1nDdt63W2ZccL/d80ju+5WRlTTivJtWB64IBxwc88S4c+3T7hbWEvRno6xGlRy4C624ggqB/k8YB/LFdK3K+2lyP3rbzYWAQSfL3Hv71i/af2U2TtUkIuSXHGNSMNd0l5pRQLiwjgJcOf7xPRB9MIPGwjnazSq3/JHv8A9L6LOdpmWre2yRBiu2yMwld6LRiRyyv5cjYp1QHAJGcDyJrOYOr7nohldyt92lx7yuN3DC2yFISgnlBSeMdOeoIq/QOwGBZ0u3IapysoKG4rkYF/fnnkHoOcnFVdXZ9ZrwxLlTrkuPLjNuLA3cKQjoMep/UmsDUrMP0jetlEGn+5/wDQysNwmajkxLvc33JMp11z4l1xRUXVgAZJq0XO2oDSU87nDjPrzQt+mYdiMCMw0sIV+IoKJJJO3qan5jCJF1jx20+ELHHvXVrhiKyc5z9l10NDQhPwq847kDCRnNaXbYLkltptpOXeEEEdKrGgrE7dZ7CWQvJwFZ6JHma3m2aRgQsuqWEqx5HB+uavrWStvIw07ZnrVGCJMnK3VoXtSMD70+nSAxJ3ho8Hkq86UVAKXQ4lbmzORzn6UrcWu8bQlUde3+fzz71oQrIl66yWJC1RkuNpQcnaeP8A3TyJqB64NASHlhGOfGcA+gprIc3tobmKC228go+UH3yPaoS5RX7afjIL25lZHRHI+tV8olclxTcgp0/DJ74HoScD6eorLJsq63LtiXaYEgxEOWUSPiP4mculKtvov+HPuat0Cdc5CU/EBsJA42HA/Koazx93a+5MzvIsAbCdnQmScn9P1qyHIjNWsNgjQGkqIKyWw2pR+ZSB0Az0Ht59Tk0+XbvjgGp8pEeKOER217c+59aTh47tQky9mMZA6kU6TIgNpPcsBajgAqG5R/OokMhWCvTdrHdRGmwtHBUOpNCjR5szKu7abTn1jgihSS7I3DqTKekulxagoLOSScU3fkISfAeKSU6EI2IS0hQOThFMJM0JSdywcDOcdKiuGFhE/kRuE3wuFKwB/WldP6C/tA78dfpDjMQYKGmzh1zPufkH607sumly0i5XROyOPG02RgunPGfRFXNhkJirabI70nvHCev1p3ZtX1JUckb+7bZYLd8BZLe3DZZXuw3ypw9CVK6rP1qkXF9ffPMqBARkhR4FSmtu1zs90KtlnVWp2mpDq/w4rDS333SOuEo549azqz9oaO0wXSZaLDIgQbc6Go5lH8aRwTuUkcIR08OSemaWP8kMNfrgpxhbTSwFkcIqg3a1XhMdcpJWrA5Cuo+gqwPuTpstU5EZcfuiQtbnt14pnetZsRUKaiRxJcxhRV0FQ+exVgzb96utOlnKw5yDu4x/4ose4uPXEw1rwAgLCh1B9aUvLxuEhb6o4bcWeSUcfYZp/etDrsMKJfm56JHfkIcCeiSeOPPrxWSeorqmq5PljxrlJZRWddX5tqzSHUIDFwuoXHkKQMFwg4U4T16YFUeHakvuMo2Ajwbzs5NTGrXV3G+NxkYKYaA34jwXCSpX9U/lUnao4ZB8IJznkZxWlxSXAql/JW7hG3XmNDwcHK1nrxyaXisFy+soP8qzz0zS0dvv9VTF9URmdgxyB0q3dmmn0XrWyZLrO6JEypz/AGH50sFngnJtnZnpwWO1JlLQDKkJDi0k4UlGOBVwcMxSFojvApz8p/pTdpaW0HYv5MdMUoy7scWUtBxR6Hpj61p6RODxiRenJSIxghSOgVnrUm/FnZCA0hCQMDefDnnrTQFaH1rQtW4o6io+TdriyAncteDk5HTGeagUjru5O71Hew2mi0rDo7zIUPLFIRVyXmylbISU/wCGTwPTFRN3u1+vSltWS2yAppeXJCx+GEfWnQYnsLaWlfCAN48vfilAdfGy2yqM/DQrI8DiQCfv6VB2+UlOvioL2OG1AEk9B339eR+VTjyHHG1LbePHQgdOaza96kRYu0W3rUlC1yYbsVpgdH3e8bKRnyHU08OyJ9G+WsMrO0NF0YyVZx9yalET4zLe1Ey3x1Ac73gpX5Cs3tjDMkbdSXWTOdByuLEWUR2vbI+errbI1gTHSuLYWkDGM4BPtRgIslTcHAA6i5Quf5ncZ/ShQYiQ8BTNqYaIR8x5/ShUEYYlIvKgtS0Ri8cYCAggn8qsNk0+hATcrvHw6cLTHUQQ36Z9TTfSmn3NOxVpud5kXeasnMh9KWwB6JSgYA9+TT6ZdvE5tJ49POqW8cItXPYpdbuxHbL0uQhDbfJPXoPIeZrDdb9r2qrnOcat8GbAskdJ8KWzvkOZ4KiP6D9a0C8X5lqdDtbie8MtbhHTCcJzg/XmlbbCEdT01Lrb8n/E2EFLSPMD/c01ceMsVt9IxvSPYuq5vo1V2guSV3u4eL4Ukf8ASME5S2fMLPVfufartebJp7QUBtyPeYlmW0VvIQ44S28cDIcGemAOT9qJcu0dpm4SbbptkzpKMmRcXMBlhAznHqR69KwbtF1W7qG6u2yNPdlR2lAuyHB4n3Pf2FNnHIiWSduHap/aWQ9cmoabWwt/4aMnJ/EAHJPpuOcegwD607sFtN4dckvAE7vGkIyU+vJrN5CGxKgxAsBpgAuAcfatPtFpuMS1x0IkLSXE94zuXlog87dw6fQ/YiqlJyZP5FrppMSG/ibc7346EpRggeYIqi9omrZNtZt2nFyy9cp69jLZAHctjhbqsdfQZ8/pV/uXaRA0raZ981ZENvRaGisNqPL56JA/nJXjFc36cuV411qmfrnUODJlAuIQB4WUfwtp9gP9zSzrrnJNrlDqTSa9FktsBL9wDmN2HFkAjk4wnr9qsqIyEhfgC9/gIJwQc00s8NZaaXs2HuwQsDjnk5/OpggtNOurSBgeXtz/ALVY2QlwVPTcfMq73JSv7+StCP8AQK1zsdjtxLNKmrhrQZkpeHeu4A4x+dZnaGlxrSjbyrBWVeeTz0rUexxyQqzyob6wWm3A42ongE9amrvJBqLakIBdQ1kcEEH/AGpJLjyy4pgbCfP1oqHgy0prqOuT0x7V45NI3IZ4UBjNPkb0SEQFK0tSFnJON3kafSpGnY6FJfWt0jySOpqtJK1BSpD5weev9aIp1tpaGWQFFeffNCF/J7cdQSZbC4Nksy2o4yMqwAT5Emo99Mx1hKFy+5ITyUc8/SpdyY41G7lpltGDyRUUl9A3K3l04K9oHP6VOMonogphkWwOokXKR3Lg5UE5rDe0rXEDTGubHqu5RjJi26dlzjKm0LQpsuD1Kd2ftWtau1s3FLkRmzyHl9Ffh4B+lcx9tt4lrUmWtgNltxDqGnU5HgOQCPtVWXFMO3g680jq/RsiKhcCc46haQ42T/EDyPrWhWa8xJgUhpot8Z8XGRWD9j+u+y7XNihSYtubs10IHfRUjakL8ynyKM9K15iMhgh1E1DgbxgJ6Yq6D3LJWuC3okJeTs77afNWeo9hQqIYfQUd6nhIAzjy/wCcUKgnKLfc7mENee1A5PnVbk3N90JJKktvfKQeffNChVa6LCmavuybX8HPjoW4Y7pO1JxkbD61EXrVmprlaWUwO5jWl5ASpptZClg9So9T9OlChUoqKZrDUrFg0+bFaWfxJuxRWonKnPIk+g9KzmDHEYIcWd38YPmo+eaFCksCvpnrDa1uqU5hROVL9wM1cdGaumRYz1suDinosk+EHkpNChVKfJav2nPHbl2iXfWut3dLMXaU7Y7RLMNhtfhDziFrC3Vp9c5A9h71oOkLb8DZ3iMJU4O7yOaFCiqT3MJ9F3iR0soUEqJCuqT0wOK9k7lW6S2MYLZ4+xoUKuY4ykM7Ixaa2+JKGsEdPetV7O2fgtOoSlI3LX19fShQqayouLZaSwsPKUSR5UZpSFqEZobSCMk0KFWL2N6ETuScLKSfYeVR8hbXe7lqIHygAefNChTLsUUDoQhCMq2mox/V9ltTi0OJWV7c5DflQoUIb/QU3WHbxAiRnmrdbN6kfhjcnAJHGa5T7TNR3HWN2enXJYJJ8aU8BIHkKFCqLZPaRDs2ewdmNjsVttl105MlvWyUlBUH8d4w4tKVjHTIIJ+hFbPpRSoMdDKpTiwccq53j/ahQq2vpFUuy6wZAKe7U3v3dQTxQoUKboU//9k=',
    },
    info: {
        title: 'Paul Richez CV',
        author: 'Paul Richez',
        subject: 'CV de Paul Richez',
        keywords: 'CV',
        creator: 'Paul Richez',
    },
    styles: {
        title: {
            bold: true,
            margin: [0, 20, 0, 5],
            fontSize: 14,
            decoration: 'underline'
        },
        link: {
            fontSize: 9
        },
        desc: {
            fontSize: 11,
            color: theme.gray,
        }
    },
    content: [
        {
            table: {
                widths: [200, '*',],
                heights: 10000,
                body: [
                    [
                        { stack: column1, color: 'white', margin: [15, 15, 15, 15] },
                        column2
                    ],
                ],
            },
            layout: {
                fillColor: function (rowIndex, node, columnIndex) {
                    return (columnIndex === 0) ? 'black' : null;
                },
                defaultBorder: false,
            },
        }
    ]
}

/*window.onload = () => {
    myCvData.knowledge.forEach(k => {
        docDefinition.images[k] = elementToData64(k);
    })
}*/

/*
function elementToData64(element) {
    var SVGDomElement = document.getElementById(element);
    var serializedSVG = new XMLSerializer().serializeToString(SVGDomElement);
    return "data:image/svg+xml;base64," + window.btoa(serializedSVG);
}
*/

/*function getProfilImage() {
    var image = new Image();
    image.src = require('../images/profil.jpg');
    console.log(convertImageToBase64(image));
    return convertImageToBase64(image);
}*/

/* function convertImageToBase64(image) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);
    return canvas.toDataURL('image/jpeg');
}
*/

function test() {
    console.log('test')
}

export const myCsPdfMake = {
    pdfMake,
    t: docDefinition,
    test
};